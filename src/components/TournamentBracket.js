// import React, { useState, useEffect } from 'react';
// import { Card, Spin, Typography } from 'antd';
// import axios from 'axios';
//
// const { Title, Text } = Typography;
//
// const TournamentBracket = ({ tournamentId }) => {
//   const [matches, setMatches] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   // Базовый URL прокси-сервера
//   const PROXY_BASE_URL = 'https://emcotech.site:5551/api';
//
//   useEffect(() => {
//     const fetchTournamentData = async () => {
//       try {
//         setLoading(true);
//
//         // Получаем матчи и участников через прокси
//         const [matchesResponse, participantsResponse] = await Promise.all([
//           axios.get(`${PROXY_BASE_URL}/matches`),
//           axios.get(`${PROXY_BASE_URL}/participants`),
//         ]);
//
//         setMatches(matchesResponse.data.data);
//         setParticipants(participantsResponse.data.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Не удалось загрузить данные турнира. Пожалуйста, попробуйте позже.');
//         setLoading(false);
//         console.error('Ошибка при получении данных турнира:', err);
//       }
//     };
//
//     fetchTournamentData();
//   }, [tournamentId]);
//
//   // Получаем имя участника по ID
//   const getParticipantName = (id) => {
//     const participant = participants.find(p => p.id === id);
//     return participant ? participant.attributes.name : 'TBD';
//   };
//
//   // Группируем матчи по раундам
//   const groupMatchesByRound = () => {
//     const groupedMatches = {};
//     matches.forEach(match => {
//       const round = match.attributes.round;
//       if (!groupedMatches[round]) groupedMatches[round] = [];
//       groupedMatches[round].push(match);
//     });
//     return groupedMatches;
//   };
//
//   // Получаем максимальный раунд
//   const getMaxRound = () => {
//     return matches.length ? Math.max(...matches.map(m => m.attributes.round)) : 0;
//   };
//
//   // Отображаем карточку матча
//   const renderMatchCard = (match) => {
//     const attrs = match.attributes;
//     const player1Name = getParticipantName(attrs.player1_id);
//     const player2Name = getParticipantName(attrs.player2_id);
//     const isPlayer1Winner = attrs.winner_id === attrs.player1_id;
//     const isPlayer2Winner = attrs.winner_id === attrs.player2_id;
//     const matchCompleted = attrs.state === 'complete';
//
//     return (
//       <Card
//         key={match.id}
//         size="small"
//         title={<Text strong>{`Матч ${attrs.identifier}`}</Text>}
//         style={{
//           marginBottom: 16,
//           width: 280,
//           borderLeft: matchCompleted ? '4px solid #1890ff' : '4px solid #d9d9d9'
//         }}
//       >
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//           <Text style={{
//             fontWeight: isPlayer1Winner ? 'bold' : 'normal',
//             color: isPlayer1Winner ? '#52c41a' : 'inherit'
//           }}>
//             {player1Name}
//           </Text>
//         </div>
//
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Text style={{
//             fontWeight: isPlayer2Winner ? 'bold' : 'normal',
//             color: isPlayer2Winner ? '#52c41a' : 'inherit'
//           }}>
//             {player2Name}
//           </Text>
//         </div>
//       </Card>
//     );
//   };
//
//   // Отображаем турнирную сетку
//   const renderBracket = () => {
//     const groupedMatches = groupMatchesByRound();
//     const maxRound = getMaxRound();
//     const rounds = [];
//
//     for (let i = 1; i <= maxRound; i++) {
//       const roundMatches = groupedMatches[i] || [];
//       rounds.push(
//         <div key={`round-${i}`} style={{ display: 'flex', flexDirection: 'column', marginRight: 20 }}>
//           <Title level={4} style={{ textAlign: 'center', marginBottom: 16 }}>
//             {i === maxRound ? 'Финал' : i === maxRound - 1 ? 'Полуфинал' : `Раунд ${i}`}
//           </Title>
//           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
//             {roundMatches.map(match => renderMatchCard(match))}
//           </div>
//         </div>
//       );
//     }
//
//     return <div style={{ display: 'flex', overflowX: 'auto', padding: '20px' }}>{rounds}</div>;
//   };
//
//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', padding: 50 }}>
//         <Spin size="large" />
//         <div style={{ marginTop: 16 }}>Загрузка данных турнира...</div>
//       </div>
//     );
//   }
//
//   if (error) {
//     return (
//       <div style={{ textAlign: 'center', padding: 50 }}>
//         <Title level={4} type="danger">{error}</Title>
//       </div>
//     );
//   }
//
//   return (
//     <div className="tournament-bracket">
//       <Title level={2}>Турнирная сетка Esports</Title>
//       <Card>
//         {renderBracket()}
//       </Card>
//     </div>
//   );
// };
//
// export default TournamentBracket;



// import React, { useState, useEffect } from 'react';
// import { Table, Card, Spin, Typography, Tag, Space } from 'antd';
// import axios from 'axios';
//
// const { Title, Text } = Typography;
//
// const TournamentBracket = ({ tournamentId }) => {
//   const [matches, setMatches] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   const API_BASE_URL = 'https://api.challonge.com/v2';
//   const API_TOKEN = 'b70cbf62014c0d1c28b2beccd5e102ae23b16b93d50557ce1403dae88e96676c'; // Заменить на свой токен
//
//   useEffect(() => {
//     const fetchTournamentData = async () => {
//       try {
//         setLoading(true);
//         const headers = { Authorization: `Bearer ${API_TOKEN}` };
//
//         // Получаем матчи и участников
//         const [matchesResponse, participantsResponse] = await Promise.all([
//           axios.get(`${API_BASE_URL}/tournaments/${tournamentId}/matches`, { headers }),
//           axios.get(`${API_BASE_URL}/tournaments/${tournamentId}/participants`, { headers }),
//         ]);
//
//         setMatches(matchesResponse.data.data);
//         setParticipants(participantsResponse.data.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load tournament data. Please try again later.');
//         setLoading(false);
//         console.error('Error fetching tournament data:', err);
//       }
//     };
//
//     fetchTournamentData();
//   }, [tournamentId]);
//
//   // Получаем имя участника по ID
//   const getParticipantName = (id) => {
//     const participant = participants.find(p => p.id === id);
//     return participant ? participant.attributes.name : 'TBD';
//   };
//
//   // Группируем матчи по раундам
//   const groupMatchesByRound = () => {
//     const groupedMatches = {};
//     matches.forEach(match => {
//       const round = match.attributes.round;
//       if (!groupedMatches[round]) groupedMatches[round] = [];
//       groupedMatches[round].push(match);
//     });
//     return groupedMatches;
//   };
//
//   // Получаем максимальный раунд
//   const getMaxRound = () => {
//     return matches.length ? Math.max(...matches.map(m => m.attributes.round)) : 0;
//   };
//
//   // Отображаем карточку матча
//   const renderMatchCard = (match) => {
//     const attrs = match.attributes;
//     const player1Name = getParticipantName(attrs.player1_id);
//     const player2Name = getParticipantName(attrs.player2_id);
//     const isPlayer1Winner = attrs.winner_id === attrs.player1_id;
//     const isPlayer2Winner = attrs.winner_id === attrs.player2_id;
//     const matchCompleted = attrs.state === 'complete';
//
//     return (
//       <Card
//         key={match.id}
//         size="small"
//         title={<Text strong>{`Match ${attrs.identifier}`}</Text>}
//         style={{
//           marginBottom: 16,
//           width: 280,
//           borderLeft: matchCompleted ? '4px solid #1890ff' : '4px solid #d9d9d9'
//         }}
//       >
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//           <Text style={{
//             fontWeight: isPlayer1Winner ? 'bold' : 'normal',
//             color: isPlayer1Winner ? '#52c41a' : 'inherit'
//           }}>
//             {player1Name}
//           </Text>
//         </div>
//
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Text style={{
//             fontWeight: isPlayer2Winner ? 'bold' : 'normal',
//             color: isPlayer2Winner ? '#52c41a' : 'inherit'
//           }}>
//             {player2Name}
//           </Text>
//         </div>
//       </Card>
//     );
//   };
//
//   // Отображаем турнирную сетку
//   const renderBracket = () => {
//     const groupedMatches = groupMatchesByRound();
//     const maxRound = getMaxRound();
//     const rounds = [];
//
//     for (let i = 1; i <= maxRound; i++) {
//       const roundMatches = groupedMatches[i] || [];
//       rounds.push(
//         <div key={`round-${i}`} style={{ display: 'flex', flexDirection: 'column', marginRight: 20 }}>
//           <Title level={4} style={{ textAlign: 'center', marginBottom: 16 }}>
//             {i === maxRound ? 'Finals' : i === maxRound - 1 ? 'Semifinals' : `Round ${i}`}
//           </Title>
//           <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
//             {roundMatches.map(match => renderMatchCard(match))}
//           </div>
//         </div>
//       );
//     }
//
//     return <div style={{ display: 'flex', overflowX: 'auto', padding: '20px' }}>{rounds}</div>;
//   };
//
//   if (loading) {
//     return (
//       <div style={{ textAlign: 'center', padding: 50 }}>
//         <Spin size="large" />
//         <div style={{ marginTop: 16 }}>Loading tournament data...</div>
//       </div>
//     );
//   }
//
//   if (error) {
//     return (
//       <div style={{ textAlign: 'center', padding: 50 }}>
//         <Title level={4} type="danger">{error}</Title>
//       </div>
//     );
//   }
//
//   return (
//     <div className="tournament-bracket">
//       <Title level={2}>Esports Tournament Bracket</Title>
//       <Card>
//         {renderBracket()}
//       </Card>
//     </div>
//   );
// };
//
// export default TournamentBracket;


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
