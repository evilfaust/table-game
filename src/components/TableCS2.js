import React, { useState, useEffect } from 'react';
import { Table, Modal, Card, Avatar, Row, Col, Typography, Badge, Tag, Spin, Button } from 'antd';
import { UserOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';
import PocketBase from 'pocketbase';

const { Title, Text } = Typography;

// Initialize PocketBase client
const pb = new PocketBase('https://apigame.emcotech.ru');

const TableCS2 = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playerModalVisible, setPlayerModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playersCache, setPlayersCache] = useState({});

  useEffect(() => {
    // Хранение контроллера отмены для предотвращения утечек памяти
    const controller = new AbortController();

    fetchTeamsData(controller.signal);

    // Очистка: отменяем запросы при размонтировании компонента
    return () => {
      controller.abort();
    };
  }, []);

  const fetchTeamsData = async (signal) => {
    try {
      setLoading(true);

      // 1. Получаем данные всех команд
      const teamsResult = await pb.collection('teams_esl_2025').getFullList({
        sort: '-pts',
        $cancelKey: 'teams-list' // Уникальный ключ для этого запроса
      });

      // Проверяем отмену между критическими операциями
      if (signal?.aborted) return;

      // 2. Получаем данные всех команд из коллекции team
      let teamsList = [];
      try {
        teamsList = await pb.collection('team').getFullList({
          $cancelKey: 'team-names' // Уникальный ключ для этого запроса
        });
      } catch (teamError) {
        // Игнорируем ошибки автоотмены
        if (teamError.isAbort) {
          console.log("Team names request was canceled");
          return;
        }
        console.error("Error fetching teams:", teamError);
      }

      // Проверяем отмену между критическими операциями
      if (signal?.aborted) return;

      // 3. Собираем все ID игроков из всех команд
      const allPlayerIds = new Set();
      teamsResult.forEach(team => {
        if (team.Players && Array.isArray(team.Players)) {
          team.Players.forEach(playerId => allPlayerIds.add(playerId));
        }
      });

      // 4. Загружаем данные всех игроков за один запрос
      let allPlayers = {};
      if (allPlayerIds.size > 0) {
        try {
          const playerIdsArray = Array.from(allPlayerIds);

          // Разбиваем на группы по 100 ID для избежания слишком длинных запросов
          const chunkSize = 100;
          const playerChunks = [];

          for (let i = 0; i < playerIdsArray.length; i += chunkSize) {
            playerChunks.push(playerIdsArray.slice(i, i + chunkSize));
          }

          // Проверяем отмену между критическими операциями
          if (signal?.aborted) return;

          // Загружаем каждую группу игроков с разными ключами отмены
          const playerResponsePromises = playerChunks.map((chunk, index) =>
            pb.collection('Player').getList(1, chunk.length, {
              filter: chunk.map(id => `id="${id}"`).join(' || '),
              $autoCancel: false, // Отключаем автоотмену для этих запросов
              $cancelKey: `players-chunk-${index}` // Уникальный ключ для каждого запроса
            })
          );

          const playerResponses = await Promise.all(playerResponsePromises);

          // Проверяем отмену между критическими операциями
          if (signal?.aborted) return;

          // Объединяем результаты всех запросов
          const allPlayersList = playerResponses.flatMap(response => response.items);

          // Преобразуем список в объект для быстрого доступа по ID
          allPlayersList.forEach(player => {
            allPlayers[player.id] = player;
          });

          // Обновляем кэш игроков
          setPlayersCache(prevCache => ({...prevCache, ...allPlayers}));

        } catch (playersError) {
          // Игнорируем ошибки автоотмены
          if (playersError.isAbort) {
            console.log("Players request was canceled");
            return;
          }
          console.error("Error fetching players:", playersError);
        }
      }

      // Проверяем отмену перед финальным обновлением состояния
      if (signal?.aborted) return;

      // 5. Формируем данные команд с информацией об игроках
      const formattedTeams = teamsResult.map((team, index) => {
        // Находим имя команды
        let teamName = "Unknown Team";
        if (team.TeamName) {
          const foundTeam = teamsList.find(t => t.id === team.TeamName);
          if (foundTeam) {
            teamName = foundTeam.Name ?? foundTeam.name ?? "Unknown Team";
          } else {
            teamName = team.TeamName || "Unknown Team";
          }
        }

        // Формируем URL логотипа
        const logoUrl = team.logo ? pb.files.getURL(team, team.logo, {'thumb': '100x100'}) : null;

        // Формируем список игроков команды
        const playersList = [];
        if (team.Players && Array.isArray(team.Players)) {
          team.Players.forEach(playerId => {
            const player = allPlayers[playerId];
            if (player) {
              playersList.push({
                id: playerId,
                nickname: player.NikName || player.Name || `Unknown (${playerId.substring(0, 5)}...)`,
                photo: player.Photo // Сохраняем объект Photo как есть
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
          playersList: playersList,
          playerIds: team.Players || [],
          logo: logoUrl
        };
      });

      setTeams(formattedTeams);
    } catch (error) {
      // Игнорируем ошибки автоотмены
      if (error.isAbort) {
        console.log("Main request was canceled");
        return;
      }
      console.error('Error in fetchTeamsData:', error);
    } finally {
      // Устанавливаем loading в false только если компонент не размонтирован
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  };

  // Функция для получения URL фотографии игрока
  const getPlayerPhotoUrl = (player) => {
    // Проверяем наличие объекта Photo и свойство name (имя файла)
    if (player && player.Photo) {
      return pb.files.getUrl(player, player.Photo);
    }
    return null;
  };

  const fetchPlayerDetails = async (playerId) => {
    // Проверяем, есть ли уже данные об игроке в кэше
    if (playersCache[playerId]) {
      setSelectedPlayer(playersCache[playerId]);
      setPlayerModalVisible(true);
      return;
    }

    try {
      const player = await pb.collection('Player').getOne(playerId, {
        $cancelKey: `player-details-${playerId}` // Уникальный ключ для запроса
      });
      // Обновляем кэш
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
    render: (logo) => logo ? (
      <Avatar
        src={logo}
        size={50}
        shape="square"
        style={{ backgroundColor: '#001529' }} // Добавленный стиль
      />
    ) : (
      <Avatar
        icon={<TeamOutlined />}
        size={50}
        shape="square"
        style={{ backgroundColor: '#001529' }} // Добавленный стиль
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
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Unknown';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Title level={2} className="text-center">
        <TrophyOutlined /> ESL 2025 Турнирная таблица CS 2
      </Title>

      <Table
        dataSource={teams}
        columns={columns}
        loading={loading}
        pagination={false}
        rowClassName={(record) => record.rank <= 3 ? 'top-team-row' : ''}
        style={{ marginBottom: 32 }}
      />

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
          </Button>
        ]}
        width={700}
      >
        {selectedPlayer ? (
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                {selectedPlayer.Photo ? (
                  <Avatar
                    src={getPlayerPhotoUrl(selectedPlayer)}
                    size={128}
                  />
                ) : (
                  <Avatar icon={<UserOutlined />} size={128} />
                )}
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={12}>
                    <Text type="secondary">Фамилия Имя</Text>
                    <Title level={4}>{selectedPlayer.Name || 'N/A'}</Title>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">Никнейм</Text>
                    <Title level={4}>{selectedPlayer.NikName || 'N/A'}</Title>
                  </Col>
                </Row>

                <Row style={{ marginTop: 16 }}>
                  <Col span={12}>
                    <Text type="secondary">Steam ID</Text>
                    <Title level={5}><a target="_blank" rel="noopener noreferrer" href={`https://steamcommunity.com/profiles/${selectedPlayer.SteamID}`}>{selectedPlayer.SteamID || 'N/A'}</a></Title>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">Бывшие команды</Text>
                    <Title level={5}>{selectedPlayer.former_teams || 'N/A'}</Title>
                  </Col>
                </Row>

                <Row style={{ marginTop: 16 }}>
                  <Col span={12}>
                    <Text type="secondary">Достижения</Text>
                    <Title level={5}>{selectedPlayer.player_achievements || 'N/A'}</Title>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">Возраст</Text>
                    <Title level={5}>{selectedPlayer.age  || 'N/A'}</Title>
                  </Col>
                </Row>
                <Row style={{ marginTop: 16 }}>
                    <Col span={12}>
                    <Text type="secondary">Рейтинг 2.0</Text>
                    <Title level={5}>{selectedPlayer.Rating || 'N/A'}</Title>
                    </Col>
                    <Col span={12}>
                    <Text type="secondary">Дисциплина</Text>
                    <div>{selectedPlayer.Discipline || 'N/A'}</div>
                    </Col>
                </Row>
              </Col>
            </Row>
          </Card>
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