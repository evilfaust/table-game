import React, { useState, useEffect } from 'react';
import { Table, Card, Spin, Typography, Tag, Space, Tooltip } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const TournamentBracket = () => {
  const [matches, setMatches] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        setLoading(true);
        // Fetch data from your proxy server
        const [matchesResponse, participantsResponse] = await Promise.all([
          axios.get('https://emcotech.site:5551/api/matches'),
          axios.get('https://emcotech.site:5551/api/participants')
        ]);

        // Process data
        setMatches(matchesResponse.data);
        setParticipants(participantsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tournament data. Please try again later.');
        setLoading(false);
        console.error('Error fetching tournament data:', err);
      }
    };

    fetchTournamentData();
  }, []);

  // Helper function to get participant name by ID
  const getParticipantName = (id) => {
    const participant = participants.find(p => p.participant.id === id);
    return participant ? participant.participant.display_name : 'TBD';
  };

  // Parse scores from scores_csv
  const parseScores = (scoresCsv) => {
    if (!scoresCsv) return [];
    return scoresCsv.split(',').map(score => {
      const [score1, score2] = score.split('-');
      return { score1: parseInt(score1), score2: parseInt(score2) };
    });
  };

  // Group matches by round
  const groupMatchesByRound = () => {
    const groupedMatches = {};

    if (!matches.length) return groupedMatches;

    matches.forEach(matchData => {
      const match = matchData.match;
      const round = match.round;

      if (!groupedMatches[round]) {
        groupedMatches[round] = [];
      }

      groupedMatches[round].push(match);
    });

    return groupedMatches;
  };

  // Get the maximum round number
  const getMaxRound = () => {
    if (!matches.length) return 0;
    return Math.max(...matches.map(m => m.match.round));
  };

  // Render match card
  const renderMatchCard = (match) => {
    const scores = parseScores(match.scores_csv);
    const player1Name = getParticipantName(match.player1_id);
    const player2Name = getParticipantName(match.player2_id);
    const isPlayer1Winner = match.winner_id === match.player1_id;
    const isPlayer2Winner = match.winner_id === match.player2_id;
    const matchCompleted = match.state === 'complete';

    return (
      <Card
        key={match.id}
        size="small"
        title={<Text strong>{`Match ${match.identifier}`}</Text>}
        style={{
          marginBottom: 16,
          width: 280,
          borderLeft: matchCompleted ? '4px solid #1890ff' : '4px solid #d9d9d9'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{
            fontWeight: isPlayer1Winner ? 'bold' : 'normal',
            color: isPlayer1Winner ? '#52c41a' : 'inherit'
          }}>
            {player1Name}
          </Text>
          <Space>
            {scores.map((score, idx) => (
              <Tag key={idx} color={isPlayer1Winner ? "success" : "default"}>
                {score.score1}
              </Tag>
            ))}
          </Space>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text style={{
            fontWeight: isPlayer2Winner ? 'bold' : 'normal',
            color: isPlayer2Winner ? '#52c41a' : 'inherit'
          }}>
            {player2Name}
          </Text>
          <Space>
            {scores.map((score, idx) => (
              <Tag key={idx} color={isPlayer2Winner ? "success" : "default"}>
                {score.score2}
              </Tag>
            ))}
          </Space>
        </div>

        {matchCompleted && (
          <div style={{ marginTop: 8, textAlign: 'right' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {new Date(match.completed_at).toLocaleDateString()}
            </Text>
          </div>
        )}
      </Card>
    );
  };

  // Render tournament bracket
  const renderBracket = () => {
    const groupedMatches = groupMatchesByRound();
    const maxRound = getMaxRound();
    const rounds = [];

    for (let i = 1; i <= maxRound; i++) {
      const roundMatches = groupedMatches[i] || [];
      rounds.push(
        <div key={`round-${i}`} style={{ display: 'flex', flexDirection: 'column', marginRight: 20 }}>
          <Title level={4} style={{ textAlign: 'center', marginBottom: 16 }}>
            {i === maxRound ? 'Finals' : i === maxRound - 1 ? 'Semifinals' : `Round ${i}`}
          </Title>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: `${100 * Math.pow(2, maxRound - i)}%`
          }}>
            {roundMatches.sort((a, b) => a.suggested_play_order - b.suggested_play_order)
              .map(match => renderMatchCard(match))}
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', overflowX: 'auto', padding: '20px' }}>
        {rounds}
      </div>
    );
  };

  // Render participants table
  const renderParticipantsTable = () => {
    const columns = [
      {
        title: 'Seed',
        dataIndex: 'seed',
        key: 'seed',
        sorter: (a, b) => a.seed - b.seed,
        render: (seed, record) => (
          <Tag color={seed <= 8 ? 'gold' : seed <= 16 ? 'blue' : 'default'}>
            {record.ordinal_seed}
          </Tag>
        )
      },
      {
        title: 'Team',
        dataIndex: 'display_name',
        key: 'name',
        render: (name) => <Text strong>{name}</Text>
      },
      {
        title: 'Status',
        key: 'status',
        render: (_, record) => (
          <Tag color={record.active ? 'green' : 'default'}>
            {record.active ? 'Active' : 'Inactive'}
          </Tag>
        )
      },
      {
        title: 'Final Rank',
        dataIndex: 'final_rank',
        key: 'final_rank',
        render: (rank) => rank ? <Tag color="volcano">{rank}</Tag> : '-'
      }
    ];

    const data = participants.map(p => p.participant);

    return (
      <Card style={{ marginTop: 20 }}>
        <Title level={4}>Tournament Participants</Title>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={false}
          size="small"
        />
      </Card>
    );
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading tournament data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: 50 }}>
        <Title level={4} type="danger">{error}</Title>
      </div>
    );
  }

  return (
    <div className="tournament-bracket">
      <Title level={2}>Esports Tournament Bracket</Title>
      <Card>
        {renderBracket()}
      </Card>
      {renderParticipantsTable()}
    </div>
  );
};

export default TournamentBracket;
