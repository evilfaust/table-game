import React, { useState, useEffect } from 'react';
import { Table, Modal, Card, Avatar, Row, Col, Typography, Badge, Tag, Spin, Button } from 'antd';
import { UserOutlined, TrophyOutlined, TeamOutlined, ProfileFilled } from '@ant-design/icons';
import PocketBase from 'pocketbase';
import { useMediaQuery } from 'react-responsive';

const { Title, Text } = Typography;
const pb = new PocketBase('https://apigame.emcotech.ru');

const TableCS2 = () => {
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

      // 1. Получаем данные всех команд из коллекции teams_esl_2025
      const teamsResult = await pb.collection('teams_esl_2025').getFullList({
        sort: '-pts',
        $cancelKey: 'teams-list'
      });

      if (signal?.aborted) return;

      // 2. Получаем данные для названий команд (коллекция team)
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

      // 3. Собираем все ID игроков
      const allPlayerIds = new Set();
      teamsResult.forEach(team => {
        if (team.Players && Array.isArray(team.Players)) {
          team.Players.forEach(playerId => allPlayerIds.add(playerId));
        }
      });

      // 4. Загружаем данные всех игроков
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

      // 5. Формируем данные команд с информацией об игроках
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
            if (player) {
              playersList.push({
                id: playerId,
                nickname: player.NikName || player.Name || `Unknown (${playerId.substring(0, 5)}...)`,
                photo: player.Photo
              });
            } else {
              playersList.push({
                id: playerId,
                nickname: `Unknown (${playerId.substring(0, 5)}...)`,
                photo: null
              });
            }
          });
        }
        return {
          key: team.id,
          rank: index + 1,
          points: team.pts || 0,
          team_name: teamName,
          playersList,
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

  const getPlayerPhotoUrl = (player) => {
    if (player && player.Photo) {
      return pb.files.getUrl(player, player.Photo);
    }
    return null;
  };

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
            <ProfileFilled /> {'  '}
            {player.nickname}
          </Tag>
        ))}
      </div>
    );
  };

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank) => (
        <Badge count={rank} style={{ backgroundColor: rank <= 3 ? '#52c41a' : '#1890ff' }} />
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
          <Avatar src={logo} size={50} shape="square" style={{ backgroundColor: '#001529' }} />
        ) : (
          <Avatar icon={<TeamOutlined />} size={50} shape="square" style={{ backgroundColor: '#001529' }} />
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

  // Мобильная версия карточки игрока (одна колонка)
  const renderPlayerCardMobile = () => (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: 'center' }}>
          {selectedPlayer?.Photo ? (
            <Avatar shape="square" src={getPlayerPhotoUrl(selectedPlayer)} size={128} />
          ) : (
            <Avatar icon={<UserOutlined />} shape="square" size={128} />
          )}
        </Col>
        <Col span={24}>
          <Text type="secondary">Фамилия Имя</Text>
          <Title level={4}>{selectedPlayer?.Name || 'N/A'}</Title>
        </Col>
        <Col span={24}>
          <Text type="secondary">Никнейм</Text>
          <Title level={4}>{selectedPlayer?.NikName || 'N/A'}</Title>
        </Col>
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
        <Col span={24}>
          <Text type="secondary">Бывшие команды</Text>
          <Title level={5}>{selectedPlayer?.former_teams || 'N/A'}</Title>
        </Col>
        <Col span={24}>
          <Text type="secondary">Достижения</Text>
          <Title level={5}>{selectedPlayer?.player_achievements || 'N/A'}</Title>
        </Col>
        <Col span={24}>
          <Text type="secondary">Возраст</Text>
          <Title level={5}>{selectedPlayer?.age || 'N/A'}</Title>
        </Col>
        <Col span={24}>
          <Text type="secondary">Рейтинг 2.0</Text>
          <Title level={5}>
            {selectedPlayer?.Rating != null ? Number(selectedPlayer.Rating).toFixed(2) : 'N/A'}
          </Title>
        </Col>
        <Col span={24}>
          <Text type="secondary">Дисциплина</Text>
          <Title level={5}>{selectedPlayer?.Discipline || 'N/A'}</Title>
        </Col>
      </Row>
    </Card>
  );

  // Десктопная версия карточки игрока (две колонки)
  const renderPlayerCardDesktop = () => (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          {selectedPlayer?.Photo ? (
            <Avatar shape="square" src={getPlayerPhotoUrl(selectedPlayer)} size={128} />
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
              <Title level={5}>{selectedPlayer?.player_achievements || 'N/A'}</Title>
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

  return (
    <div style={{ width: '100%' }}>
      <Title level={2} className="text-center">
        <TrophyOutlined /> ESL 2025 Рейтинговая таблица CS 2
      </Title>

      {/* Рендерим карточки для мобильных устройств, таблицу для десктопа */}
      {isMobile ? (
        teams.map((team) => (
          <Card key={team.key} style={{ marginBottom: 16 }}>
            {/* 1-я строка: Ранг + Очки */}
            <Row>
              <Col span={24}>
                <Title level={5} style={{textAlign: 'center'}}>
                  <Badge count={team.rank} style={{ backgroundColor: team.rank <= 3 ? '#52c41a' : '#1890ff' }} />
                  <span style={{ marginLeft: 8 }}>{team.points} pts</span>
                </Title>
              </Col>
            </Row>
            {/* 2-я строка: Логотип + Название команды */}
            <Row style={{ marginTop: 8, alignItems: 'center' }}>
              <Col>
                {team.logo ? (
                  <Avatar src={team.logo} size={50} shape="square" style={{ backgroundColor: '#001529' }} />
                ) : (
                  <Avatar icon={<TeamOutlined />} size={50} shape="square" style={{ backgroundColor: '#001529' }} />
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
          rowClassName={(record) => (record.rank <= 3 ? 'top-team-row' : '')}
          style={{ marginBottom: 32 }}
        />
      )}

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
        width={isMobile ? '90%' : 700}
        style={isMobile ? { top: 20 } : {}}
        bodyStyle={{
          maxHeight: '70vh',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        centered
      >
        {selectedPlayer ? (
          isMobile ? renderPlayerCardMobile() : renderPlayerCardDesktop()
        ) : (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Spin size="large" />
            <div style={{ marginTop: 16 }}>Loading player data...</div>
          </div>
        )}
      </Modal>

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

export default TableCS2;


// import React, { useState, useEffect } from 'react';
// import { Table, Modal, Card, Avatar, Row, Col, Typography, Badge, Tag, Spin, Button } from 'antd';
// import {UserOutlined, TrophyOutlined, TeamOutlined, ProfileFilled} from '@ant-design/icons';
// import PocketBase from 'pocketbase';

// const { Title, Text } = Typography;

// // Initialize PocketBase client
// const pb = new PocketBase('https://apigame.emcotech.ru');

// const TableCS2 = () => {
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
//       const teamsResult = await pb.collection('teams_esl_2025').getFullList({
//         sort: '-pts',
//         $cancelKey: 'teams-list'
//       });

//       if (signal?.aborted) return;

//       // 2. Получаем данные всех команд из коллекции team
//       let teamsList = [];
//       try {
//         teamsList = await pb.collection('team').getFullList({
//           $cancelKey: 'team-names'
//         });
//       } catch (teamError) {
//         if (teamError.isAbort) {
//           console.log("Team names request was canceled");
//           return;
//         }
//         console.error("Error fetching teams:", teamError);
//       }

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
//           const chunkSize = 100;
//           const playerChunks = [];

//           for (let i = 0; i < playerIdsArray.length; i += chunkSize) {
//             playerChunks.push(playerIdsArray.slice(i, i + chunkSize));
//           }

//           if (signal?.aborted) return;

//           const playerResponsePromises = playerChunks.map((chunk, index) =>
//             pb.collection('Player').getList(1, chunk.length, {
//               filter: chunk.map(id => `id="${id}"`).join(' || '),
//               $autoCancel: false,
//               $cancelKey: `players-chunk-${index}`
//             })
//           );

//           const playerResponses = await Promise.all(playerResponsePromises);

//           if (signal?.aborted) return;

//           const allPlayersList = playerResponses.flatMap(response => response.items);

//           allPlayersList.forEach(player => {
//             allPlayers[player.id] = player;
//           });

//           setPlayersCache(prevCache => ({ ...prevCache, ...allPlayers }));

//         } catch (playersError) {
//           if (playersError.isAbort) {
//             console.log("Players request was canceled");
//             return;
//           }
//           console.error("Error fetching players:", playersError);
//         }
//       }

//       if (signal?.aborted) return;

//       // 5. Формируем данные команд с информацией об игроках
//       const formattedTeams = teamsResult.map((team, index) => {
//         let teamName = "Unknown Team";
//         if (team.TeamName) {
//           const foundTeam = teamsList.find(t => t.id === team.TeamName);
//           if (foundTeam) {
//             teamName = foundTeam.Name ?? foundTeam.name ?? "Unknown Team";
//           } else {
//             teamName = team.TeamName || "Unknown Team";
//           }
//         }

//         const logoUrl = team.logo ? pb.files.getURL(team, team.logo, { thumb: '100x100' }) : null;

//         const playersList = [];
//         if (team.Players && Array.isArray(team.Players)) {
//           team.Players.forEach(playerId => {
//             const player = allPlayers[playerId];
//             if (player) {
//               playersList.push({
//                 id: playerId,
//                 nickname: player.NikName || player.Name || `Unknown (${playerId.substring(0, 5)}...)`,
//                 photo: player.Photo
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
//       if (error.isAbort) {
//         console.log("Main request was canceled");
//         return;
//       }
//       console.error('Error in fetchTeamsData:', error);
//     } finally {
//       if (!signal?.aborted) {
//         setLoading(false);
//       }
//     }
//   };

//   const getPlayerPhotoUrl = (player) => {
//     if (player && player.Photo) {
//       return pb.files.getUrl(player, player.Photo);
//     }
//     return null;
//   };

//   const fetchPlayerDetails = async (playerId) => {
//     if (playersCache[playerId]) {
//       setSelectedPlayer(playersCache[playerId]);
//       setPlayerModalVisible(true);
//       return;
//     }

//     try {
//       const player = await pb.collection('Player').getOne(playerId, {
//         $cancelKey: `player-details-${playerId}`
//       });
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
//             <ProfileFilled /> {'  '}
//             {player.nickname}
//           </Tag>
//         ))}
//       </div>
//     );
//   };

//   const columns = [
//     {
//       title: 'Rank',
//       dataIndex: 'rank',
//       key: 'rank',
//       render: (rank) => (
//         <Badge count={rank} style={{ backgroundColor: rank <= 3 ? '#52c41a' : '#1890ff' }} />
//       ),
//       width: 80,
//     },
//     {
//       title: 'Points',
//       dataIndex: 'points',
//       key: 'points',
//       render: (points) => `${points} pts`,
//       width: 100,
//     },
//     {
//       title: 'Logo',
//       dataIndex: 'logo',
//       key: 'logo',
//       render: (logo) => logo ? (
//         <Avatar
//           src={logo}
//           size={50}
//           shape="square"
//           style={{ backgroundColor: '#001529' }}
//         />
//       ) : (
//         <Avatar
//           icon={<TeamOutlined />}
//           size={50}
//           shape="square"
//           style={{ backgroundColor: '#001529' }}
//         />
//       ),
//       width: 80,
//     },
//     {
//       title: 'Team',
//       dataIndex: 'team_name',
//       key: 'team_name',
//       render: (name) => <Text strong>{name}</Text>,
//     },
//     {
//       title: 'Players',
//       dataIndex: 'playersList',
//       key: 'players',
//       render: renderPlayerNames,
//     },
//   ];

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
//         <TrophyOutlined /> ESL 2025 Рейтинговая таблица CS 2
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
//                   <Avatar shape="square" icon={<UserOutlined />} size={128} />
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
//                     <Title level={5}>
//                       <a target="_blank" rel="noopener noreferrer" href={`https://steamcommunity.com/profiles/${selectedPlayer.SteamID}`}>
//                         {selectedPlayer.SteamID || 'N/A'}
//                       </a>
//                     </Title>
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
//                     <Title level={5}>{selectedPlayer.age  || 'N/A'}</Title>
//                   </Col>
//                 </Row>
//                 <Row style={{ marginTop: 16 }}>
//                   <Col span={12}>
//                     <Text type="secondary">Рейтинг 2.0</Text>
//                     <Title level={5}>
//                       {selectedPlayer.Rating != null ? Number(selectedPlayer.Rating).toFixed(2) : 'N/A'}
//                     </Title>
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

// export default TableCS2;
