

import React, { useEffect, useState } from 'react';
import { Card, Modal, List, Avatar, Table, Spin, message } from 'antd';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://apigame.emcotech.ru');

const CS2PlayerRating = () => {
  const [players, setPlayers] = useState([]);
  const [stats, setStats] = useState([]);
  const [teamsEsl, setTeamsEsl] = useState([]);
  const [teamsInfo, setTeamsInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [rankedPlayers, setRankedPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playersData = await pb.collection('Player').getFullList(200, {
          sort: '-created',
          $autoCancel: false,
        });
        const statsData = await pb.collection('esl1_PlayerStats').getFullList(200, {
          sort: '-created',
          $autoCancel: false,
        });
        const teamsEslData = await pb.collection('teams_esl_2025').getFullList(200, {
          sort: '-pts',
          $autoCancel: false,
        });
        const teamsInfoData = await pb.collection('team').getFullList(200, {
          $autoCancel: false,
        });

        setPlayers(playersData);
        setStats(statsData);
        setTeamsEsl(teamsEslData);
        setTeamsInfo(teamsInfoData);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        message.error("Ошибка загрузки данных");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Формируем маппинг: для каждой записи из teamsEsl используем поле TeamName (ID записи из teamsInfo)
  // для получения реального имени, и для каждого playerId из team.Players устанавливаем этот объект.
  const formattedTeamsMapping = {};
  teamsEsl.forEach(team => {
    let displayName = team.TeamName;
    if (team.TeamName) {
      const foundTeam = teamsInfo.find(t => t.id === team.TeamName);
      if (foundTeam) {
        displayName = foundTeam.Name || foundTeam.name || team.TeamName;
      }
    }
    if (Array.isArray(team.Players)) {
      team.Players.forEach(pid => {
        formattedTeamsMapping[pid] = { ...team, displayName };
      });
    }
  });

  // Фильтруем игроков по дисциплине CS2
  const cs2Players = players.filter(player => player.Discipline === "Counter Strike 2");

  // Агрегируем статистику для каждого CS2 игрока, связывая записи по player_id === player.id
  const aggregated = cs2Players.map(player => {
    const playerStats = stats.filter(stat => stat.player_id === player.id);
    if (playerStats.length === 0) return null;
    const fields = ["n_rounds", "dmg", "adr", "kast_rounds", "kast", "impact", "rating"];
    const sum = {};
    fields.forEach(f => sum[f] = 0);
    playerStats.forEach(record => {
      fields.forEach(f => {
        sum[f] += parseFloat(record[f]) || 0;
      });
    });
    const count = playerStats.length;
    const avg = {};
    fields.forEach(f => {
      avg[f] = count > 0 ? sum[f] / count : 0;
    });
    return {
      ...player,
      aggregatedStats: avg,
      matchCount: count,
    };
  }).filter(item => item !== null);

  aggregated.sort((a, b) => b.aggregatedStats.rating - a.aggregatedStats.rating);
  const ranked = aggregated.map((player, index) => ({ ...player, rank: index + 1 }));

  useEffect(() => {
    setRankedPlayers(ranked);
  }, [players, stats, teamsEsl, teamsInfo]);

  const roundValue = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? value : num.toFixed(2);
  };

  const getCardColor = (rank) => {
    if (rank <= 3) return "#ffd700"; // золотой или вот такой цвет FEA202
    if (rank <= 10) return "#c0c0c0"; // серебряный
    if (rank <= 20) return "#cd7f32"; // бронзовый
    return "#fff"; // остальные — белый
  };

  const detailColumns = [
    { title: 'Показатель', dataIndex: 'key', key: 'key' },
    { 
      title: 'Значение', 
      dataIndex: 'value', 
      key: 'value',
      render: (val) => typeof val === 'number' ? val.toFixed(2) : val,
    },
  ];

  const getDetailData = (player) => {
    const s = player.aggregatedStats;
    return [
      { key: "Среднее количество раундов", value: s.n_rounds },
      { key: "Средний урон", value: s.dmg },
      { key: "ADR", value: s.adr },
      { key: "Среднее KAST раундов", value: s.kast_rounds },
      { key: "KAST", value: s.kast },
      { key: "Импакт", value: s.impact },
      { key: "Рейтинг", value: s.rating },
      { key: "Сыграно матчей", value: player.matchCount },
    ];
  };

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <Spin />
      ) : (
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={rankedPlayers}
          renderItem={(player) => (
            <List.Item>
              <Card
                onClick={() => setSelectedPlayer(player)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: getCardColor(player.rank),
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 'bold' }}>#{player.rank}</div>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>{player.NikName}</div>
                <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
                  <Avatar
                    // shape="square"
                    src={player.Photo ? pb.files.getURL(player, player.Photo, { thumb: '100x100' }) : "/images/icon031.png"}
                    size={100}
                  />
                  {formattedTeamsMapping[player.id] && (
                    <Avatar
                      style={{ marginLeft: -8, border: '2px solid #fff' }}
                      src={
                        formattedTeamsMapping[player.id].logo
                          ? pb.files.getURL(formattedTeamsMapping[player.id], formattedTeamsMapping[player.id].logo, { thumb: '100x100' })
                          : null
                      }
                      size={32}
                    />
                  )}
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}

      <Modal
        open={!!selectedPlayer}
        onCancel={() => setSelectedPlayer(null)}
        footer={null}
        title={selectedPlayer ? `${selectedPlayer.NikName} (#${selectedPlayer.rank})` : ""}
      >
        {selectedPlayer && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <Avatar
                size={64}
                src={selectedPlayer.Photo ? pb.files.getURL(selectedPlayer, selectedPlayer.Photo, { thumb: '200x200' }) : "/images/icon031.png"}
              />
              <div style={{ marginLeft: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedPlayer.NikName}</div>
                <div>
                  {formattedTeamsMapping[selectedPlayer.id] ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={
                          formattedTeamsMapping[selectedPlayer.id].logo
                            ? pb.files.getURL(formattedTeamsMapping[selectedPlayer.id], formattedTeamsMapping[selectedPlayer.id].logo, { thumb: '100x100' })
                            : null
                        }
                      />
                      <span style={{ marginLeft: 8 }}>
                        {formattedTeamsMapping[selectedPlayer.id].displayName || "Команда"}
                      </span>
                    </div>
                  ) : (
                    "Команда не найдена"
                  )}
                </div>
              </div>
            </div>
            <Table
              columns={detailColumns}
              dataSource={getDetailData(selectedPlayer)}
              pagination={false}
              showHeader={false}
              size="small"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CS2PlayerRating;
