import React, { useEffect, useState } from 'react';
import { Card, Modal, List, Avatar, Table, Spin, message } from 'antd';
import PocketBase from 'pocketbase';

// Инициализируем клиент PocketBase
const pb = new PocketBase('https://apigame.emcotech.ru');

const MatchesList = () => {
  const [matches, setMatches] = useState([]);
  // Данные из коллекции teams_esl_2025 с логотипами
  const [teamsEsl, setTeamsEsl] = useState({});
  // Маппинг: ключ – id команды из коллекции team, значение – данные из teams_esl_2025 (если найдены)
  const [teamsMapping, setTeamsMapping] = useState({});
  const [playerStats, setPlayerStats] = useState({}); // группировка по match_id и team_id
  const [players, setPlayers] = useState({}); // данные игроков, ключ – id
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
        console.log("Matches data:", matchesData);

        // 2. Получаем данные команд из коллекции teams_esl_2025
        const teamsResult = await pb.collection('teams_esl_2025').getFullList(200, {
          sort: '-pts',
        });
        console.log("Teams result (teams_esl_2025):", teamsResult);

        // 3. Получаем данные из коллекции team для подстановки имен
        let teamsList = [];
        try {
          teamsList = await pb.collection('team').getFullList();
          console.log("Teams list (team):", teamsList);
        } catch (teamError) {
          console.error("Ошибка получения имен команд:", teamError);
        }

        // Форматируем данные из teams_esl_2025:
        // Для каждой записи, если поле TeamName (которое содержит id из коллекции team) найдено в teamsList,
        // подставляем имя из teamsList.
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
        console.log("Formatted teams (by teams_esl_2025 id):", formattedTeams);
        setTeamsEsl(formattedTeams);

        // Создадим маппинг: ключ – id команды из коллекции team (то есть значение поля TeamName), значение – данные из teams_esl_2025
        const mapping = {};
        Object.values(formattedTeams).forEach(item => {
          if (item.TeamName) {
            mapping[item.TeamName] = item;
          }
        });
        console.log("Teams mapping (by team id from collection team):", mapping);
        setTeamsMapping(mapping);

        // 4. Получаем статистику игроков по матчам
        const statsData = await pb.collection('esl1_PlayerStats').getFullList(200, {
          sort: '-created',
        });
        console.log("Player stats data:", statsData);
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
        console.log("Players data:", playersData);
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

  // Открытие модального окна при клике на матч
  const openMatchModal = (match) => {
    setSelectedMatch(match);
  };

  const closeModal = () => {
    setSelectedMatch(null);
  };

  // Функция для отображения информации о команде.
  // Теперь ищем данные по team id из коллекции team в teamsMapping.
  const renderTeamInfo = (teamId) => {
    console.log("renderTeamInfo teamId:", teamId, "Team mapping data:", teamsMapping[teamId]);
    const teamData = teamsMapping[teamId];
    if (!teamData) {
      return <div>Данные о команде отсутствуют</div>;
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={teamData.logo || null} alt={teamData.team_name} />
        <span style={{ marginLeft: 8 }}>{teamData.team_name}</span>
      </div>
    );
  };

  // Определяем колонки для таблицы статистики игроков – выводятся все поля статистики.
  // Для полей ADR, KAST, Импакт и Рейтинг выполняется округление до 2 знаков.
  const columns = [
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
  ];

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={matches}
          renderItem={(match) => (
            <List.Item>
              <Card onClick={() => openMatchModal(match)} style={{ cursor: 'pointer' }}>
                {/* Добавляем дату матча */}
                <div style={{ marginBottom: 8, fontWeight: 'bold' }}>
                  {match.date ? new Date(match.date).toLocaleString() : 'Дата неизвестна'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {renderTeamInfo(match.team1)}
                  <div>{match.score || 'Нет счета'}</div>
                  {renderTeamInfo(match.team2)}
                </div>
              </Card>
            </List.Item>
          )}
        />
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
                columns={columns}
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
                columns={columns}
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

export default MatchesList;
