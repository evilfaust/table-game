import React, { useState, useEffect } from 'react';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const url = 'https://emcotech.site:5551/fetch-tournaments';
        console.log('Запрос турниров по URL:', url);

        const response = await fetch(url);
        const text = await response.text();
        console.log('Полученный ответ (как текст):', text);

        try {
          const data = JSON.parse(text);
          console.log('Полученные данные турниров:', data);
          if (data.error) {
            setError(data.error);
          } else {
            // Обновите путь к турнирам согласно структуре возвращаемых данных
            setTournaments(data.data.tournaments || []);
          }
        } catch (parseError) {
          console.error('Ошибка парсинга JSON:', parseError);
          setError('Неверный формат ответа от сервера');
        }
      } catch (err) {
        console.error('Ошибка при загрузке турниров:', err);
        setError('Ошибка при загрузке списка турниров.');
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) return <div>Загрузка турниров...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Список турниров</h2>
      <ul>
        {tournaments.map(tournament => (
          <li key={tournament.id}>
            {tournament.name} — ID: {tournament.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentList;
