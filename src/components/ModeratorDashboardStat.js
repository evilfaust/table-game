// ModeratorDashboardStat.js

import React, { useState, useEffect } from 'react';
import { Tabs, Table, Button, message, Spin, List, Input, InputNumber, Row, Col } from 'antd';
import pb from '../pb';

const { TabPane } = Tabs;

const ModeratorDashboardStat = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  // Состояния для фильтров
  const [filterName, setFilterName] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [filterRating, setFilterRating] = useState(null);

  // Загружаем список игроков при монтировании компонента
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Функция получения всех игроков из коллекции Player
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const result = await pb.collection('Player').getFullList({ $autoCancel: false });
      setPlayers(result);
    } catch (error) {
      console.error('Ошибка при получении игроков:', error);
      message.error('Ошибка загрузки игроков');
    } finally {
      setLoading(false);
    }
  };

  // Функция пересчета рейтинга для одного игрока
  const recalcForPlayer = async (player) => {
    try {
      // Получаем статистику игрока из коллекции esl1_PlayerStats с отключенной автоотменой
      const stats = await pb.collection('esl1_PlayerStats').getFullList({
        filter: `player_id = "${player.id}"`,
        $autoCancel: false
      });

      // Если статистики нет, устанавливаем рейтинг в 0
      if (!stats || stats.length === 0) {
        await pb.collection('Player').update(player.id, { Rating: 0 });
        return { playerId: player.id, rating: 0, message: 'Нет статистики, установлен 0' };
      }

      // Вычисляем сумму и среднее значение рейтинга
      let totalRating = 0;
      stats.forEach(stat => {
        totalRating += parseFloat(stat.rating) || 0;
      });
      const averageRating = totalRating / stats.length;
      await pb.collection('Player').update(player.id, { Rating: averageRating });
      return { playerId: player.id, rating: averageRating, message: 'Успешно обновлено' };
    } catch (error) {
      return { playerId: player.id, rating: null, message: 'Ошибка обновления: ' + error.message };
    }
  };

  // Функция пересчета рейтингов для всех игроков
  const recalcAll = async () => {
    setLoading(true);
    const newLogs = [];
    for (const player of players) {
      const result = await recalcForPlayer(player);
      newLogs.push(result);
    }
    setLogs(newLogs);
    message.success('Пересчет завершен');
    fetchPlayers(); // Обновляем список игроков после пересчета
    setLoading(false);
  };

  // Обработчик для пересчета рейтинга для конкретного игрока
  const handleRecalcForPlayer = async (player) => {
    setLoading(true);
    const result = await recalcForPlayer(player);
    message.info(`Игрок ${player.NikName} обновлен: ${result.message}`);
    fetchPlayers();
    setLoading(false);
  };

  // Фильтруем игроков по введенным параметрам
  const filteredPlayers = players.filter(player => {
    const nameMatch =
      player.NikName.toLowerCase().includes(filterName.toLowerCase()) ||
      player.Name.toLowerCase().includes(filterName.toLowerCase());
    const teamValue = player.Team || player.former_teams || '';
    const teamMatch = teamValue.toLowerCase().includes(filterTeam.toLowerCase());
    const ratingValue = parseFloat(player.Rating) || 0;
    const ratingMatch = filterRating !== null ? ratingValue >= filterRating : true;
    return nameMatch && teamMatch && ratingMatch;
  });

  // Определение колонок для таблицы игроков
  const columns = [
    { title: 'Никнейм', dataIndex: 'NikName', key: 'NikName' },
    { title: 'Имя', dataIndex: 'Name', key: 'Name' },
    {
      title: 'Команда',
      dataIndex: 'Team',
      key: 'Team',
      render: (text, record) => record.Team || record.former_teams || 'N/A'
    },
    { title: 'Рейтинг', dataIndex: 'Rating', key: 'Rating' },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => handleRecalcForPlayer(record)}>Пересчитать</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Панель модератора: Статистика и Аналитика</h2>
      <Tabs defaultActiveKey="1">
        {/* Вкладка "Общая статистика" – таблица игроков с фильтрами */}
        <TabPane tab="Общая статистика" key="1">
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col xs={24} sm={8}>
              <Input
                placeholder="Фильтр по имени"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={8}>
              <Input
                placeholder="Фильтр по команде"
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={8}>
              <InputNumber
                placeholder="Мин. рейтинг"
                style={{ width: '100%' }}
                value={filterRating}
                onChange={(value) => setFilterRating(value)}
              />
            </Col>
          </Row>
          {loading ? <Spin /> : <Table dataSource={filteredPlayers} columns={columns} rowKey="id" />}
        </TabPane>

        {/* Вкладка "Пересчет статистики" – кнопка массового пересчета и вывод логов */}
        <TabPane tab="Пересчет статистики" key="2">
          <Button type="primary" onClick={recalcAll} loading={loading}>
            Пересчитать все рейтинги
          </Button>
          <List
            header={<div>Логи обновлений</div>}
            bordered
            dataSource={logs}
            renderItem={item => (
              <List.Item>
                Игрок {item.playerId}: {item.message}{' '}
                {item.rating !== null ? `(Новый рейтинг: ${item.rating.toFixed(2)})` : ''}
              </List.Item>
            )}
            style={{ marginTop: 16 }}
          />
        </TabPane>

        {/* Вкладка "Логи обновлений" */}
        <TabPane tab="Логи обновлений" key="3">
          <List
            header={<div>Логи обновлений</div>}
            bordered
            dataSource={logs}
            renderItem={item => (
              <List.Item>
                Игрок {item.playerId}: {item.message}{' '}
                {item.rating !== null ? `(Новый рейтинг: ${item.rating.toFixed(2)})` : ''}
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ModeratorDashboardStat;
