// src/components/ModeratorDashboard.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Card, Spin, message, Image } from 'antd';
import pb from '../pb';

const ModeratorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const apps = await pb.collection('team_applications').getFullList({
        sort: '-created',
        $autoCancel: false,
      });
      setApplications(apps);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
      message.error('Ошибка загрузки заявок');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (app) => {
    setSelectedApp(app);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedApp(null);
  };

  // Функция обновления статуса заявки
  const updateApplicationStatus = async (appId, status) => {
    try {
      await pb.collection('team_applications').update(appId, { status });
      message.success(`Заявка ${status === 'approved' ? 'одобрена' : 'отклонена'}`);
      fetchApplications();
    } catch (error) {
      console.error('Ошибка обновления статуса заявки:', error);
      message.error('Ошибка обновления статуса заявки');
    }
  };

  const approveApplication = async (app) => {
    await updateApplicationStatus(app.id, 'approved');
    closeModal();
  };

  const rejectApplication = async (app) => {
    await updateApplicationStatus(app.id, 'rejected');
    closeModal();
  };

  const columns = [
    {
      title: 'Название команды',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: 'Организация',
      dataIndex: 'organizationName',
      key: 'organizationName',
    },
    {
      title: 'Дата создания',
      dataIndex: 'created',
      key: 'created',
      render: (created) => new Date(created).toLocaleString(),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => status || 'pending',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => openModal(record)} style={{ marginRight: 8 }}>
            Подробнее
          </Button>
          <Button type="primary" onClick={() => approveApplication(record)} style={{ marginRight: 8 }}>
            Одобрить
          </Button>
          <Button danger onClick={() => rejectApplication(record)}>
            Отклонить
          </Button>
        </>
      ),
    },
  ];

  // Функция для получения URL изображения справки, аналогичная getPlayerPhotoUrl
  const getCertificateUrl = (record, fieldName) => {
    const fileValue = record[fieldName];
    console.log(`Field ${fieldName} value:`, fileValue);
    if (!fileValue || typeof fileValue !== 'string' || !fileValue.includes('.')) {
      return null;
    }
    const url = pb.files.getUrl(record, fieldName, { thumb: 'original' });
    console.log(`Generated URL for ${fieldName}:`, url);
    return url;
  };

  // Функция для рендеринга изображения с использованием getCertificateUrl
  const renderImage = (record, fieldName) => {
    const fileUrl = getCertificateUrl(record, fieldName);
    return fileUrl ? (
      <Image width={100} src={fileUrl} preview={{ src: fileUrl }} />
    ) : (
      <span>Нет справки</span>
    );
  };

  // Функция для рендеринга данных игроков с изображениями справок
  const renderPlayersDetails = (app) => {
    const players = ['player2', 'player3', 'player4', 'player5'];
    return (
      <div>
        {players.map((playerKey) => {
          const fullName = app[`${playerKey}_fullName`];
          if (!fullName) return null;
          return (
            <div
              key={playerKey}
              style={{
                marginBottom: '10px',
                borderBottom: '1px solid #f0f0f0',
                paddingBottom: '5px',
              }}
            >
              <p><strong>Игрок {playerKey.slice(-1)}</strong></p>
              <p><strong>ФИО:</strong> {fullName}</p>
              <p><strong>Steam:</strong> {app[`${playerKey}_steamProfile`]}</p>
              <p><strong>Справка:</strong></p>
              {renderImage(app, `${playerKey}_certificateFiles`)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Модераторская панель</h1>
      {loading ? (
        <Spin />
      ) : (
        <Table dataSource={applications} columns={columns} rowKey="id" />
      )}

      <Modal
        title="Детали заявки"
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Закрыть
          </Button>,
          <Button key="approve" type="primary" onClick={() => approveApplication(selectedApp)}>
            Одобрить
          </Button>,
          <Button key="reject" danger onClick={() => rejectApplication(selectedApp)}>
            Отклонить
          </Button>,
        ]}
      >
        {selectedApp ? (
          <Card>
            <p><strong>Название команды:</strong> {selectedApp.teamName}</p>
            <p><strong>Организация:</strong> {selectedApp.organizationName}</p>
            <p><strong>Капитан:</strong> {selectedApp.captain_fullName}</p>
            <p><strong>Телефон капитана:</strong> {selectedApp.captain_phone}</p>
            <p><strong>Telegram капитана:</strong> {selectedApp.captain_telegram}</p>
            <p><strong>Steam профиль капитана:</strong> {selectedApp.captain_steamProfile}</p>
            <p><strong>Справка капитана:</strong></p>
            {renderImage(selectedApp, 'captain_certificateFiles')}
            <hr />
            <h3>Игроки</h3>
            {renderPlayersDetails(selectedApp)}
          </Card>
        ) : (
          <Spin />
        )}
      </Modal>
    </div>
  );
};

export default ModeratorDashboard;
