import React, { useEffect, useState } from 'react';
import { Card, Modal, Row, Col, Avatar, Table, Spin, message } from 'antd';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://apigame.emcotech.ru');

const MatchesListCS2 = () => {
  const [matches, setMatches] = useState([]);
  const [teamsEsl, setTeamsEsl] = useState({});
  const [teamsMapping, setTeamsMapping] = useState({});
  const [playerStats, setPlayerStats] = useState({}); // Группировка по match_id и team_id
  const [players, setPlayers] = useState({}); // Данные игроков, ключ – id
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  // Функция округления значения до 2 знаков после запятой
  const roundValue = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? value : num.toFixed(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Получаем матчи
        const matchesData = await pb.collection('esl1_matches').getFullList(200, {
          sort: '-created',
        });
        // 2. Получаем данные команд из коллекции teams_esl_2025
        const teamsResult = await pb.collection('teams_esl_2025').getFullList(200, {
          sort: '-pts',
        });
        // 3. Получаем данные из коллекции team для подстановки имен
        let teamsList = [];
        try {
          teamsList = await pb.collection('team').getFullList();
        } catch (teamError) {
          console.error("Ошибка получения имен команд:", teamError);
        }
        // Форматируем данные команд из teams_esl_2025: подставляем реальное имя, если найдено в teamsList
        const formattedTeams = {};
        teamsResult.forEach(team => {
          let teamNameDisplay = "Unknown Team";
          if (team.TeamName) {
            const foundTeam = teamsList.find(t => t.id === team.TeamName);
            if (foundTeam) {
              teamNameDisplay = foundTeam.Name || foundTeam.name || team.TeamName;
            } else {
              teamNameDisplay = team.TeamName || "Unknown Team";
            }
          }
          const logoUrl = team.logo ? pb.files.getURL(team, team.logo, { thumb: '100x100' }) : null;
          formattedTeams[team.id] = { ...team, team_name: teamNameDisplay, logo: logoUrl };
        });
        setTeamsEsl(formattedTeams);

        // Создадим маппинг: ключ – id команды из коллекции team (то есть значение поля TeamName), значение – данные из teams_esl_2025
        const mapping = {};
        Object.values(formattedTeams).forEach(item => {
          if (item.TeamName) {
            mapping[item.TeamName] = item;
          }
        });
        setTeamsMapping(mapping);

        // 4. Получаем статистику игроков по матчам
        const statsData = await pb.collection('esl1_PlayerStats').getFullList(200, {
          sort: '-created',
        });
        const statsObj = {};
        statsData.forEach(stat => {
          if (!statsObj[stat.match_id]) {
            statsObj[stat.match_id] = {};
          }
          if (!statsObj[stat.match_id][stat.team_id]) {
            statsObj[stat.match_id][stat.team_id] = [];
          }
          statsObj[stat.match_id][stat.team_id].push(stat);
        });
        setPlayerStats(statsObj);

        // 5. Получаем данные игроков
        const playersData = await pb.collection('Player').getFullList(200, {
          sort: '-created',
        });
        const playersObj = {};
        playersData.forEach(player => {
          playersObj[player.id] = player;
        });
        setPlayers(playersObj);

        setMatches(matchesData);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        message.error('Ошибка загрузки данных');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openMatchModal = (match) => {
    setSelectedMatch(match);
  };

  const closeModal = () => {
    setSelectedMatch(null);
  };

  // Функция отображения информации о команде.
  // Ищем данные по team id из коллекции team в teamsMapping.
  const renderTeamInfo = (teamId) => {
    const teamData = teamsMapping[teamId];
    if (!teamData) {
      return <div>Данные о команде отсутствуют</div>;
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <Avatar 
        shape="square"
        style={{backgroundColor: '#001529' }}
        src={teamData.logo || null} alt={teamData.team_name} />
        <span style={{ marginLeft: 8 }}>{teamData.team_name}</span>
      </div>
    );
  };

  return (
    <div style={{ padding: 2 }}>
      {loading ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]}>
          {matches.map(match => (
            <Col key={match.id} xs={24} sm={12} md={12} lg={8}>
              <Card onClick={() => openMatchModal(match)} style={{ cursor: 'pointer' }}>
                <div style={{ marginBottom: 8, fontWeight: 'bold' }}>
                  {match.date ? new Date(match.date).toLocaleString() : 'Дата неизвестна'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {renderTeamInfo(match.team1)}
                  <div>{match.score || 'Нет счета'}</div>
                  {renderTeamInfo(match.team2)}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title="Детали матча"
        visible={!!selectedMatch}
        onCancel={closeModal}
        footer={null}
        width={800}
      >
        {selectedMatch && (
          <div>
            <h3>Команды</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {renderTeamInfo(selectedMatch.team1)}
              {renderTeamInfo(selectedMatch.team2)}
            </div>
            <h3 style={{ marginTop: 20 }}>Статистика игроков</h3>
            <div>
              <h4>Команда 1</h4>
              <Table
                columns={[
                  {
                    title: 'Игрок',
                    dataIndex: 'player_id',
                    key: 'player_id',
                    render: (playerId) => {
                      const player = players[playerId];
                      return player && player.NikName ? player.NikName : 'Нет данных';
                    },
                  },
                  {
                    title: 'Раунды',
                    dataIndex: 'n_rounds',
                    key: 'n_rounds',
                  },
                  {
                    title: 'Урон',
                    dataIndex: 'dmg',
                    key: 'dmg',
                  },
                  {
                    title: 'ADR',
                    dataIndex: 'adr',
                    key: 'adr',
                    render: (value) => roundValue(value),
                  },
                  {
                    title: 'KAST раундов',
                    dataIndex: 'kast_rounds',
                    key: 'kast_rounds',
                  },
                  {
                    title: 'KAST',
                    dataIndex: 'kast',
                    key: 'kast',
                    render: (value) => roundValue(value),
                  },
                  {
                    title: 'Импакт',
                    dataIndex: 'impact',
                    key: 'impact',
                    render: (value) => roundValue(value),
                  },
                  {
                    title: 'Рейтинг',
                    dataIndex: 'rating',
                    key: 'rating',
                    render: (value) => roundValue(value),
                  },
                ]}
                dataSource={
                  (playerStats[selectedMatch.id] &&
                    playerStats[selectedMatch.id][selectedMatch.team1]) ||
                  []
                }
                rowKey="id"
                pagination={false}
                locale={{ emptyText: 'Нет данных по игрокам' }}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <h4>Команда 2</h4>
              <Table
                columns={[
                  {
                    title: 'Игрок',
                    dataIndex: 'player_id',
                    key: 'player_id',
                    render: (playerId) => {
                      const player = players[playerId];
                      return player && player.NikName ? player.NikName : 'Нет данных';
                    },
                  },
                  {
                    title: 'Раунды',
                    dataIndex: 'n_rounds',
                    key: 'n_rounds',
                  },
                  {
                    title: 'Урон',
                    dataIndex: 'dmg',
                    key: 'dmg',
                  },
                  {
                    title: 'ADR',
                    dataIndex: 'adr',
                    key: 'adr',
                    render: (value) => roundValue(value),
                  },
                  {
                    title: 'KAST раундов',
                    dataIndex: 'kast_rounds',
                    key: 'kast_rounds',
                  },
                  {
                    title: 'KAST',
                    dataIndex: 'kast',
                    key: 'kast',
                    render: (value) => roundValue(value),
                  },
                  {
                    title: 'Импакт',
                    dataIndex: 'impact',
                    key: 'impact',
                    render: (value) => roundValue(value),
                  },
                  {
                    title: 'Рейтинг',
                    dataIndex: 'rating',
                    key: 'rating',
                    render: (value) => roundValue(value),
                  },
                ]}
                dataSource={
                  (playerStats[selectedMatch.id] &&
                    playerStats[selectedMatch.id][selectedMatch.team2]) ||
                  []
                }
                rowKey="id"
                pagination={false}
                locale={{ emptyText: 'Нет данных по игрокам' }}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MatchesListCS2;
