import React, { useState, useEffect } from 'react';
import { Table, Modal, Card, Avatar, Row, Col, Typography, Badge, Tag, Spin, Button } from 'antd';
import { UserOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';
import PocketBase from 'pocketbase';
import { useMediaQuery } from 'react-responsive';

const { Title, Text } = Typography;
const pb = new PocketBase('https://apigame.emcotech.ru');

const TableDOTA2 = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playerModalVisible, setPlayerModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playersCache, setPlayersCache] = useState({});

  // Проверка на мобильное устройство
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const controller = new AbortController();
    fetchTeamsData(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const fetchTeamsData = async (signal) => {
    try {
      setLoading(true);

      // 1. Получаем данные всех команд
      const teamsResult = await pb.collection('teams_esl_2025_dota2').getFullList({
        sort: '-pts',
        $cancelKey: 'teams-list'
      });

      if (signal?.aborted) return;

      // 2. Получаем данные для названий команд (коллекция 'team')
      let teamsList = [];
      try {
        teamsList = await pb.collection('team').getFullList({
          $cancelKey: 'team-names'
        });
      } catch (teamError) {
        if (teamError.isAbort) {
          console.log("Team names request was canceled");
          return;
        }
        console.error("Error fetching teams:", teamError);
      }

      if (signal?.aborted) return;

      // 3. Собираем ID всех игроков
      const allPlayerIds = new Set();
      teamsResult.forEach(team => {
        if (team.Players && Array.isArray(team.Players)) {
          team.Players.forEach(playerId => allPlayerIds.add(playerId));
        }
      });

      // 4. Загружаем данные игроков
      let allPlayers = {};
      if (allPlayerIds.size > 0) {
        try {
          const playerIdsArray = Array.from(allPlayerIds);
          const chunkSize = 100;
          const playerChunks = [];

          for (let i = 0; i < playerIdsArray.length; i += chunkSize) {
            playerChunks.push(playerIdsArray.slice(i, i + chunkSize));
          }

          if (signal?.aborted) return;

          const playerResponsePromises = playerChunks.map((chunk, index) =>
            pb.collection('Player').getList(1, chunk.length, {
              filter: chunk.map(id => `id="${id}"`).join(' || '),
              $autoCancel: false,
              $cancelKey: `players-chunk-${index}`
            })
          );

          const playerResponses = await Promise.all(playerResponsePromises);
          if (signal?.aborted) return;

          const allPlayersList = playerResponses.flatMap(response => response.items);
          allPlayersList.forEach(player => {
            allPlayers[player.id] = player;
          });

          setPlayersCache(prevCache => ({ ...prevCache, ...allPlayers }));
        } catch (playersError) {
          if (playersError.isAbort) {
            console.log("Players request was canceled");
            return;
          }
          console.error("Error fetching players:", playersError);
        }
      }

      if (signal?.aborted) return;

      // 5. Формируем список команд
      const formattedTeams = teamsResult.map((team, index) => {
        let teamName = "Unknown Team";
        if (team.TeamName) {
          const foundTeam = teamsList.find(t => t.id === team.TeamName);
          if (foundTeam) {
            teamName = foundTeam.Name || foundTeam.name || "Unknown Team";
          } else {
            teamName = team.TeamName || "Unknown Team";
          }
        }

        const logoUrl = team.logo ? pb.files.getURL(team, team.logo, { thumb: '100x100' }) : null;

        const playersList = [];
        if (team.Players && Array.isArray(team.Players)) {
          team.Players.forEach(playerId => {
            const player = allPlayers[playerId];
            playersList.push({
              id: playerId,
              nickname: player
                ? (player.NikName || player.Name || `Unknown (${playerId.substring(0, 5)}...)`)
                : `Unknown (${playerId.substring(0, 5)}...)`,
              photo: player ? player.Photo : null
            });
          });
        }

        return {
          key: team.id,
          rank: index + 1,
          points: team.pts || 0,
          team_name: teamName,
          playersList: playersList,
          logo: logoUrl
        };
      });

      setTeams(formattedTeams);
    } catch (error) {
      if (error.isAbort) {
        console.log("Main request was canceled");
        return;
      }
      console.error('Error in fetchTeamsData:', error);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  };

  // Получаем URL фотографии игрока
  const getPlayerPhotoUrl = (player) => {
    if (player && player.Photo) {
      return pb.files.getUrl(player, player.Photo);
    }
    return null;
  };

  // Загружаем подробные данные игрока при клике
  const fetchPlayerDetails = async (playerId) => {
    if (playersCache[playerId]) {
      setSelectedPlayer(playersCache[playerId]);
      setPlayerModalVisible(true);
      return;
    }

    try {
      const player = await pb.collection('Player').getOne(playerId, {
        $cancelKey: `player-details-${playerId}`
      });
      setPlayersCache(prevCache => ({
        ...prevCache,
        [playerId]: player
      }));
      setSelectedPlayer(player);
      setPlayerModalVisible(true);
    } catch (error) {
      if (error.isAbort) {
        console.log(`Player details request was canceled for ${playerId}`);
        return;
      }
      console.error('Error fetching player details:', error);
    }
  };

  // Отображаем игроков команды (список тегов)
  const renderPlayerNames = (playersList) => {
    if (!playersList || playersList.length === 0) {
      return <Text type="secondary">No players</Text>;
    }
    return (
      <div>
        {playersList.map((player, index) => (
          <Tag
            key={index}
            color="blue"
            style={{ margin: '4px', cursor: 'pointer' }}
            onClick={() => fetchPlayerDetails(player.id)}
          >
            {player.nickname}
          </Tag>
        ))}
      </div>
    );
  };

  // Колонки для десктопной версии (Antd Table)
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank) => (
        <Badge
          count={rank}
          style={{ backgroundColor: rank <= 3 ? '#52c41a' : '#1890ff' }}
        />
      ),
      width: 80,
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      render: (points) => `${points} pts`,
      width: 100,
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (logo) =>
        logo ? (
          <Avatar
            src={logo}
            size={50}
            shape="square"
            style={{ backgroundColor: '#001529' }}
          />
        ) : (
          <Avatar
            icon={<TeamOutlined />}
            size={50}
            shape="square"
            style={{ backgroundColor: '#001529' }}
          />
        ),
      width: 80,
    },
    {
      title: 'Team',
      dataIndex: 'team_name',
      key: 'team_name',
      render: (name) => <Text strong>{name}</Text>,
    },
    {
      title: 'Players',
      dataIndex: 'playersList',
      key: 'players',
      render: renderPlayerNames,
    },
  ];

  // Шаблон карточки игрока в мобильной версии (одна колонка)
  const renderPlayerCardMobile = () => {
    return (
      <Card>
        <Row gutter={[16, 16]}>
          {/* Аватар игрока по центру */}
          <Col span={24} style={{ textAlign: 'center' }}>
            {selectedPlayer?.Photo ? (
              <Avatar
                shape="square"
                src={getPlayerPhotoUrl(selectedPlayer)}
                size={128}
              />
            ) : (
              <Avatar icon={<UserOutlined />} shape="square" size={128} />
            )}
          </Col>

          {/* Фамилия Имя */}
          <Col span={24}>
            <Text type="secondary">Фамилия Имя</Text>
            <Title level={4}>{selectedPlayer?.Name || 'N/A'}</Title>
          </Col>

          {/* Никнейм */}
          <Col span={24}>
            <Text type="secondary">Никнейм</Text>
            <Title level={4}>{selectedPlayer?.NikName || 'N/A'}</Title>
          </Col>

          {/* Steam ID */}
          <Col span={24}>
            <Text type="secondary">Steam ID</Text>
            <Title level={5} style={{ wordBreak: 'break-all' }}>
              {selectedPlayer?.SteamID ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://steamcommunity.com/profiles/${selectedPlayer.SteamID}`}
                  style={{ wordBreak: 'break-all' }}
                >
                  {selectedPlayer.SteamID}
                </a>
              ) : (
                'N/A'
              )}
            </Title>
          </Col>

          {/* Бывшие команды */}
          <Col span={24}>
            <Text type="secondary">Бывшие команды</Text>
            <Title level={5}>{selectedPlayer?.former_teams || 'N/A'}</Title>
          </Col>

          {/* Достижения / Возраст */}
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Text type="secondary">Достижения</Text>
                <Title level={5}>
                  {selectedPlayer?.player_achievements || 'N/A'}
                </Title>
              </Col>
              <Col span={12}>
                <Text type="secondary">Возраст</Text>
                <Title level={5}>{selectedPlayer?.age || 'N/A'}</Title>
              </Col>
            </Row>
          </Col>

          {/* Рейтинг 2.0 / Дисциплина */}
          <Col span={24}>
            <Row>
              <Col span={12}>
                <Text type="secondary">Рейтинг 2.0</Text>
                <Title level={5}>{selectedPlayer?.Rating || 'N/A'}</Title>
              </Col>
              <Col span={12}>
                <Text type="secondary">Дисциплина</Text>
                <Title level={5}>{selectedPlayer?.Discipline || 'N/A'}</Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  };

  // Шаблон карточки игрока в десктопной версии (две колонки)
  const renderPlayerCardDesktop = () => {
    return (
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            {selectedPlayer?.Photo ? (
              <Avatar
                shape="square"
                src={getPlayerPhotoUrl(selectedPlayer)}
                size={128}
              />
            ) : (
              <Avatar icon={<UserOutlined />} shape="square" size={128} />
            )}
          </Col>
          <Col span={16}>
            <Row>
              <Col span={12}>
                <Text type="secondary">Фамилия Имя</Text>
                <Title level={4}>{selectedPlayer?.Name || 'N/A'}</Title>
              </Col>
              <Col span={12}>
                <Text type="secondary">Никнейм</Text>
                <Title level={4}>{selectedPlayer?.NikName || 'N/A'}</Title>
              </Col>
            </Row>

            <Row style={{ marginTop: 16 }}>
              <Col span={12}>
                <Text type="secondary">Steam ID</Text>
                <Title level={5} style={{ wordBreak: 'break-all' }}>
                  {selectedPlayer?.SteamID ? (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://steamcommunity.com/profiles/${selectedPlayer.SteamID}`}
                      style={{ wordBreak: 'break-all' }}
                    >
                      {selectedPlayer.SteamID}
                    </a>
                  ) : (
                    'N/A'
                  )}
                </Title>
              </Col>
              <Col span={12}>
                <Text type="secondary">Бывшие команды</Text>
                <Title level={5}>{selectedPlayer?.former_teams || 'N/A'}</Title>
              </Col>
            </Row>

            <Row style={{ marginTop: 16 }}>
              <Col span={12}>
                <Text type="secondary">Достижения</Text>
                <Title level={5}>
                  {selectedPlayer?.player_achievements || 'N/A'}
                </Title>
              </Col>
              <Col span={12}>
                <Text type="secondary">Возраст</Text>
                <Title level={5}>{selectedPlayer?.age || 'N/A'}</Title>
              </Col>
            </Row>
            <Row style={{ marginTop: 16 }}>
              <Col span={12}>
                <Text type="secondary">Рейтинг 2.0</Text>
                <Title level={5}>{selectedPlayer?.Rating || 'N/A'}</Title>
              </Col>
              <Col span={12}>
                <Text type="secondary">Дисциплина</Text>
                <Title level={5}>{selectedPlayer?.Discipline || 'N/A'}</Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <Title level={2} className="text-center">
        <TrophyOutlined /> ESL 2025 Рейтинговая таблица DOTA 2
      </Title>

      {/* Мобильная версия: карточки, десктоп: таблица */}
      {isMobile ? (
        teams.map((team) => (
          <Card key={team.key} style={{ marginBottom: 16 }}>
            {/* 1-я строка: Ранг + Очки */}
            <Row>
              <Col span={24}>
                <Title level={5} style={{textAlign: 'center'}}>
                  <Badge
                    count={team.rank}
                    style={{
                      backgroundColor: team.rank <= 3 ? '#52c41a' : '#1890ff',
                    }}
                  />
                  <span style={{ marginLeft: 8 }}>{team.points} pts</span>
                </Title>
              </Col>
            </Row>

            {/* 2-я строка: Логотип + Название команды */}
            <Row style={{ marginTop: 8, alignItems: 'center' }}>
              <Col>
                {team.logo ? (
                  <Avatar
                    src={team.logo}
                    size={50}
                    shape="square"
                    style={{ backgroundColor: '#001529' }}
                  />
                ) : (
                  <Avatar
                    icon={<TeamOutlined />}
                    size={50}
                    shape="square"
                    style={{ backgroundColor: '#001529' }}
                  />
                )}
              </Col>
              <Col style={{ marginLeft: 16 }}>
                <Text strong>{team.team_name}</Text>
              </Col>
            </Row>

            {/* 3-я строка: Игроки */}
            <Row style={{ marginTop: 8 }}>
              <Col span={24}>{renderPlayerNames(team.playersList)}</Col>
            </Row>
          </Card>
        ))
      ) : (
        <Table
          dataSource={teams}
          columns={columns}
          loading={loading}
          pagination={false}
          rowClassName={(record) =>
            record.rank <= 3 ? 'top-team-row' : ''
          }
          style={{ marginBottom: 32 }}
        />
      )}

      {/* Модальное окно с данными игрока */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UserOutlined style={{ marginRight: 8 }} />
            {selectedPlayer?.NikName || 'Player Profile'}
          </div>
        }
        open={playerModalVisible}
        onCancel={() => setPlayerModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPlayerModalVisible(false)}>
            Close
          </Button>,
        ]}
        // Ширина: 90% на мобильных, 700px на десктопе
        width={isMobile ? '90%' : 700}
        // Смещаем окно вниз на мобильном, чтобы не прилегало к верхушке
        style={isMobile ? { top: 20 } : {}}
        // Ограничиваем высоту, скрываем горизонтальный скролл
        bodyStyle={{
          maxHeight: '70vh',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        centered
      >
        {selectedPlayer ? (
          // Разная верстка для мобильных и десктопных устройств
          isMobile ? renderPlayerCardMobile() : renderPlayerCardDesktop()
        ) : (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>Loading player data...</div>
          </div>
        )}
      </Modal>

      {/* Стили для таблицы */}
      <style jsx="true">{`
        .top-team-row {
          background-color: rgba(82, 196, 26, 0.1);
        }
        .ant-table-thead > tr > th {
          background-color: #001529;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default TableDOTA2;






// import React, { useState, useEffect } from 'react';
// import { Table, Modal, Card, Avatar, Row, Col, Typography, Badge, Tag, Spin, Button } from 'antd';
// import { UserOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';
// import PocketBase from 'pocketbase';

// const { Title, Text } = Typography;

// // Initialize PocketBase client
// const pb = new PocketBase('https://apigame.emcotech.ru');

// const TableDOTA2 = () => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [playerModalVisible, setPlayerModalVisible] = useState(false);
//   const [selectedPlayer, setSelectedPlayer] = useState(null);
//   const [playersCache, setPlayersCache] = useState({});

//   useEffect(() => {
//     // Хранение контроллера отмены для предотвращения утечек памяти
//     const controller = new AbortController();

//     fetchTeamsData(controller.signal);

//     // Очистка: отменяем запросы при размонтировании компонента
//     return () => {
//       controller.abort();
//     };
//   }, []);

//   const fetchTeamsData = async (signal) => {
//     try {
//       setLoading(true);

//       // 1. Получаем данные всех команд
//       const teamsResult = await pb.collection('teams_esl_2025_dota2').getFullList({
//         sort: '-pts',
//         $cancelKey: 'teams-list' // Уникальный ключ для этого запроса
//       });

//       // Проверяем отмену между критическими операциями
//       if (signal?.aborted) return;

//       // 2. Получаем данные всех команд из коллекции team
//       let teamsList = [];
//       try {
//         teamsList = await pb.collection('team').getFullList({
//           $cancelKey: 'team-names' // Уникальный ключ для этого запроса
//         });
//       } catch (teamError) {
//         // Игнорируем ошибки автоотмены
//         if (teamError.isAbort) {
//           console.log("Team names request was canceled");
//           return;
//         }
//         console.error("Error fetching teams:", teamError);
//       }

//       // Проверяем отмену между критическими операциями
//       if (signal?.aborted) return;

//       // 3. Собираем все ID игроков из всех команд
//       const allPlayerIds = new Set();
//       teamsResult.forEach(team => {
//         if (team.Players && Array.isArray(team.Players)) {
//           team.Players.forEach(playerId => allPlayerIds.add(playerId));
//         }
//       });

//       // 4. Загружаем данные всех игроков за один запрос
//       let allPlayers = {};
//       if (allPlayerIds.size > 0) {
//         try {
//           const playerIdsArray = Array.from(allPlayerIds);

//           // Разбиваем на группы по 100 ID для избежания слишком длинных запросов
//           const chunkSize = 100;
//           const playerChunks = [];

//           for (let i = 0; i < playerIdsArray.length; i += chunkSize) {
//             playerChunks.push(playerIdsArray.slice(i, i + chunkSize));
//           }

//           // Проверяем отмену между критическими операциями
//           if (signal?.aborted) return;

//           // Загружаем каждую группу игроков с разными ключами отмены
//           const playerResponsePromises = playerChunks.map((chunk, index) =>
//             pb.collection('Player').getList(1, chunk.length, {
//               filter: chunk.map(id => `id="${id}"`).join(' || '),
//               $autoCancel: false, // Отключаем автоотмену для этих запросов
//               $cancelKey: `players-chunk-${index}` // Уникальный ключ для каждого запроса
//             })
//           );

//           const playerResponses = await Promise.all(playerResponsePromises);

//           // Проверяем отмену между критическими операциями
//           if (signal?.aborted) return;

//           // Объединяем результаты всех запросов
//           const allPlayersList = playerResponses.flatMap(response => response.items);

//           // Преобразуем список в объект для быстрого доступа по ID
//           allPlayersList.forEach(player => {
//             allPlayers[player.id] = player;
//           });

//           // Обновляем кэш игроков
//           setPlayersCache(prevCache => ({...prevCache, ...allPlayers}));

//         } catch (playersError) {
//           // Игнорируем ошибки автоотмены
//           if (playersError.isAbort) {
//             console.log("Players request was canceled");
//             return;
//           }
//           console.error("Error fetching players:", playersError);
//         }
//       }

//       // Проверяем отмену перед финальным обновлением состояния
//       if (signal?.aborted) return;

//       // 5. Формируем данные команд с информацией об игроках
//       const formattedTeams = teamsResult.map((team, index) => {
//         // Находим имя команды
//         let teamName = "Unknown Team";
//         if (team.TeamName) {
//           const foundTeam = teamsList.find(t => t.id === team.TeamName);
//           if (foundTeam) {
//             teamName = foundTeam.Name ?? foundTeam.name ?? "Unknown Team";
//           } else {
//             teamName = team.TeamName || "Unknown Team";
//           }
//         }

//         // Формируем URL логотипа
//         const logoUrl = team.logo ? pb.files.getURL(team, team.logo, {'thumb': '100x100'}) : null;

//         // Формируем список игроков команды
//         const playersList = [];
//         if (team.Players && Array.isArray(team.Players)) {
//           team.Players.forEach(playerId => {
//             const player = allPlayers[playerId];
//             if (player) {
//               playersList.push({
//                 id: playerId,
//                 nickname: player.NikName || player.Name || `Unknown (${playerId.substring(0, 5)}...)`,
//                 photo: player.Photo // Сохраняем объект Photo как есть
//               });
//             } else {
//               playersList.push({
//                 id: playerId,
//                 nickname: `Unknown (${playerId.substring(0, 5)}...)`,
//                 photo: null
//               });
//             }
//           });
//         }

//         return {
//           key: team.id,
//           rank: index + 1,
//           points: team.pts || 0,
//           team_name: teamName,
//           playersList: playersList,
//           playerIds: team.Players || [],
//           logo: logoUrl
//         };
//       });

//       setTeams(formattedTeams);
//     } catch (error) {
//       // Игнорируем ошибки автоотмены
//       if (error.isAbort) {
//         console.log("Main request was canceled");
//         return;
//       }
//       console.error('Error in fetchTeamsData:', error);
//     } finally {
//       // Устанавливаем loading в false только если компонент не размонтирован
//       if (!signal?.aborted) {
//         setLoading(false);
//       }
//     }
//   };

//   // Функция для получения URL фотографии игрока
//   const getPlayerPhotoUrl = (player) => {
//     // Проверяем наличие объекта Photo и свойство name (имя файла)
//     if (player && player.Photo) {
//       return pb.files.getUrl(player, player.Photo);
//     }
//     return null;
//   };

//   const fetchPlayerDetails = async (playerId) => {
//     // Проверяем, есть ли уже данные об игроке в кэше
//     if (playersCache[playerId]) {
//       setSelectedPlayer(playersCache[playerId]);
//       setPlayerModalVisible(true);
//       return;
//     }

//     try {
//       const player = await pb.collection('Player').getOne(playerId, {
//         $cancelKey: `player-details-${playerId}` // Уникальный ключ для запроса
//       });
//       // Обновляем кэш
//       setPlayersCache(prevCache => ({
//         ...prevCache,
//         [playerId]: player
//       }));
//       setSelectedPlayer(player);
//       setPlayerModalVisible(true);
//     } catch (error) {
//       if (error.isAbort) {
//         console.log(`Player details request was canceled for ${playerId}`);
//         return;
//       }
//       console.error('Error fetching player details:', error);
//     }
//   };

//   const renderPlayerNames = (playersList) => {
//     if (!playersList || playersList.length === 0) {
//       return <Text type="secondary">No players</Text>;
//     }

//     return (
//       <div>
//         {playersList.map((player, index) => (
//           <Tag
//             key={index}
//             color="blue"
//             style={{ margin: '4px', cursor: 'pointer' }}
//             onClick={() => fetchPlayerDetails(player.id)}
//           >
//             {player.nickname}
//           </Tag>
//         ))}
//       </div>
//     );
//   };


// const columns = [
//   {
//     title: 'Rank',
//     dataIndex: 'rank',
//     key: 'rank',
//     render: (rank) => (
//       <Badge count={rank} style={{ backgroundColor: rank <= 3 ? '#52c41a' : '#1890ff' }} />
//     ),
//     width: 80,
//   },
//   {
//     title: 'Points',
//     dataIndex: 'points',
//     key: 'points',
//     render: (points) => `${points} pts`,
//     width: 100,
//   },
//   {
//     title: 'Logo',
//     dataIndex: 'logo',
//     key: 'logo',
//     render: (logo) => logo ? (
//       <Avatar
//         src={logo}
//         size={50}
//         shape="square"
//         style={{ backgroundColor: '#001529' }} // Добавленный стиль
//       />
//     ) : (
//       <Avatar
//         icon={<TeamOutlined />}
//         size={50}
//         shape="square"
//         style={{ backgroundColor: '#001529' }} // Добавленный стиль
//       />
//     ),
//     width: 80,
//   },
//   {
//     title: 'Team',
//     dataIndex: 'team_name',
//     key: 'team_name',
//     render: (name) => <Text strong>{name}</Text>,
//   },
//   {
//     title: 'Players',
//     dataIndex: 'playersList',
//     key: 'players',
//     render: renderPlayerNames,
//   },
// ];
//   const formatDate = (dateStr) => {
//     if (!dateStr) return 'Unknown';
//     try {
//       const date = new Date(dateStr);
//       return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
//     } catch (e) {
//       return dateStr;
//     }
//   };

//   return (
//     <div style={{ width: '100%' }}>
//       <Title level={2} className="text-center">
//         <TrophyOutlined /> ESL 2025 Рейтинговая таблица DOTA 2
//       </Title>

//       <Table
//         dataSource={teams}
//         columns={columns}
//         loading={loading}
//         pagination={false}
//         rowClassName={(record) => record.rank <= 3 ? 'top-team-row' : ''}
//         style={{ marginBottom: 32 }}
//       />

//       <Modal
//         title={
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//             <UserOutlined style={{ marginRight: 8 }} />
//             {selectedPlayer?.NikName || 'Player Profile'}
//           </div>
//         }
//         open={playerModalVisible}
//         onCancel={() => setPlayerModalVisible(false)}
//         footer={[
//           <Button key="close" onClick={() => setPlayerModalVisible(false)}>
//             Close
//           </Button>
//         ]}
//         width={700}
//       >
//         {selectedPlayer ? (
//           <Card>
//             <Row gutter={[16, 16]}>
//               <Col span={8}>
//                 {selectedPlayer.Photo ? (
//                   <Avatar
//                     shape="square"
//                     src={getPlayerPhotoUrl(selectedPlayer)}
//                     size={128}
//                   />
//                 ) : (
//                   <Avatar icon={<UserOutlined />} shape="square" size={128} />
//                 )}
//               </Col>
//               <Col span={16}>
//                 <Row>
//                   <Col span={12}>
//                     <Text type="secondary">Фамилия Имя</Text>
//                     <Title level={4}>{selectedPlayer.Name || 'N/A'}</Title>
//                   </Col>
//                   <Col span={12}>
//                     <Text type="secondary">Никнейм</Text>
//                     <Title level={4}>{selectedPlayer.NikName || 'N/A'}</Title>
//                   </Col>
//                 </Row>

//                 <Row style={{ marginTop: 16 }}>
//                   <Col span={12}>
//                     <Text type="secondary">Steam ID</Text>
//                     <Title level={5}><a target="_blank" rel="noopener noreferrer" href={`https://steamcommunity.com/profiles/${selectedPlayer.SteamID}`}>{selectedPlayer.SteamID || 'N/A'}</a></Title>
//                   </Col>
//                   <Col span={12}>
//                     <Text type="secondary">Бывшие команды</Text>
//                     <Title level={5}>{selectedPlayer.former_teams || 'N/A'}</Title>
//                   </Col>
//                 </Row>

//                 <Row style={{ marginTop: 16 }}>
//                   <Col span={12}>
//                     <Text type="secondary">Достижения</Text>
//                     <Title level={5}>{selectedPlayer.player_achievements || 'N/A'}</Title>
//                   </Col>
//                   <Col span={12}>
//                     <Text type="secondary">Возраст</Text>
//                     <Title level={5}>{selectedPlayer.age || 'N/A'}</Title>
//                   </Col>
//                 </Row>
//                 <Row style={{ marginTop: 16 }}>
//                   <Col span={12}>
//                     <Text type="secondary">Рейтинг 2.0</Text>
//                     <Title level={5}>{selectedPlayer.Rating || 'N/A'}</Title>
//                   </Col>
//                   <Col span={12}>
//                     <Text type="secondary">Дисциплина</Text>
//                     <Title level={5}>{selectedPlayer.Discipline || 'N/A'}</Title>
//                   </Col>
//                 </Row>
//               </Col>
//             </Row>
//           </Card>
//         ) : (
//           <div style={{ textAlign: 'center', padding: 40 }}>
//             <Spin size="large" />
//             <div style={{ marginTop: 16 }}>Loading player data...</div>
//           </div>
//         )}
//       </Modal>

//       <style jsx="true">{`
//         .top-team-row {
//           background-color: rgba(82, 196, 26, 0.1);
//         }
//         .ant-table-thead > tr > th {
//           background-color: #001529;
//           color: white;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default TableDOTA2;