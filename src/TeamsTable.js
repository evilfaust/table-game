import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Spin } from 'antd';
import axios from 'axios';

const PlayerProfileModal = ({ visible, onClose, playerId }) => {
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    if (playerId) {
      axios
        .get(`https://apigame.emcotech.ru/api/collections/Player/records/${playerId}`)
        .then((response) => {
          setPlayerData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching player data:', error);
        });
    }
  }, [playerId]);

  return (
    <Modal
      visible={visible}
      title="Player Profile"
      onCancel={onClose}
      footer={<Button onClick={onClose}>Close</Button>}
    >
      {playerData ? (
        <div>
          <p>Name: {playerData.Name}</p>
          <p>Nickname: {playerData.NikName}</p>
          <p>Steam ID: {playerData.SteamID}</p>
          <p>Telegram: {playerData.TG}</p>
          {playerData.Photo && <img src={playerData.Photo} alt="Player" style={{ width: '100px' }} />}
        </div>
      ) : (
        <Spin size="large" />
      )}
    </Modal>
  );
};

const TeamsTable = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const teamsResult = await axios.get('https://apigame.emcotech.ru/api/collections/teams_esl_2025/records');
        const teamsList = await axios.get('https://apigame.emcotech.ru/api/collections/team/records');
        const processedTeams = [];

        for (const team of teamsResult.data) {
          const teamName = team.TeamName || 'Unknown Team';
          const players = team.Players || [];
          const playerNames = await Promise.all(
            players.map(async (playerId) => {
              try {
                const player = await axios.get(`https://apigame.emcotech.ru/api/collections/Player/records/${playerId}`);
                return player.data.NikName || player.data.Name || `ID: ${playerId}`;
              } catch (err) {
                return `ID: ${playerId}`;
              }
            })
          );
          const logoUrl = team.logo ? `https://apigame.emcotech.ru/api/files/${team.logo}` : 'No Logo';
          processedTeams.push({
            rank: team.rank || 'N/A',
            points: team.pts || 0,
            team_name: teamName,
            players: playerNames,
            logo: logoUrl,
          });
        }

        setTeams(processedTeams);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams data:', error);
        setLoading(false);
      }
    };

    fetchTeamsData();
  }, []);

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (logo) => <img src={logo} alt="Team Logo" width={50} height={50} />,
    },
    {
      title: 'Team',
      dataIndex: 'team_name',
      key: 'team_name',
    },
    {
      title: 'Players',
      dataIndex: 'players',
      key: 'players',
      render: (players) =>
        players.map((player, index) => (
          <Button key={index} onClick={() => setSelectedPlayerId(player)}>
            {player}
          </Button>
        )),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={teams}
        loading={loading}
        rowKey="rank"
        pagination={false}
      />
      <PlayerProfileModal
        visible={!!selectedPlayerId}
        onClose={() => setSelectedPlayerId(null)}
        playerId={selectedPlayerId}
      />
    </div>
  );
};

export default TeamsTable;
