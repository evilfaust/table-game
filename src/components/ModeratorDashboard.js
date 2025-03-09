import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Card, Spin, message, Image, Input, Tag, Avatar, Space, Flex } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import pb from '../pb';

const ModeratorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [moderatorComment, setModeratorComment] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  const openDetailsModal = (app) => {
    setSelectedApp(app);
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setSelectedApp(null);
  };

  const openRejectModal = (app) => {
    setSelectedApp(app);
    setModeratorComment('');
    setRejectModalVisible(true);
  };

  const closeRejectModal = () => {
    setRejectModalVisible(false);
    setSelectedApp(null);
  };

  // Функция обновления статуса заявки с комментариями (при отклонении)
  const updateApplicationStatus = async (appId, status, comment = '') => {
    try {
      await pb.collection('team_applications').update(appId, { status, moderatorComment: comment });
      message.success(`Заявка ${status === 'approved' ? 'одобрена' : 'отклонена'}`);
      fetchApplications();
    } catch (error) {
      console.error('Ошибка обновления статуса заявки:', error);
      message.error('Ошибка обновления статуса заявки');
    }
  };

  const approveApplication = async (app) => {
    await updateApplicationStatus(app.id, 'approved');
    closeDetailsModal();
  };

  const confirmRejection = async () => {
    if (!moderatorComment.trim()) {
      message.error('Пожалуйста, введите комментарий перед отклонением заявки');
      return;
    }
    await updateApplicationStatus(selectedApp.id, 'rejected', moderatorComment);
    closeRejectModal();
  };

  // Функция для отображения статуса с использованием Tag
  const renderStatusTag = (status) => {
    if (status === 'approved')
      return (
        <Tag icon={<CheckCircleOutlined />} color="cyan">
          approved
        </Tag>
      );
    if (status === 'rejected')
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          rejected
        </Tag>
      );
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    );
  };

  // Функция для получения URL логотипа команды
  const getTeamLogoUrl = (record) => {
    const fileName = record.teamLogo;
    if (!fileName || !fileName.includes('.')) return null;
    return pb.files.getURL(record, fileName, { thumb: '100x100' });
  };

  // Функция для получения URL изображения сертификата
  const getCertificateUrl = (record, fieldName) => {
    const fileName = record[fieldName];
    if (!fileName || !fileName.includes('.')) return null;
    return pb.files.getURL(record, fileName, { thumb: 'original' });
  };

  // Функция для рендеринга изображения сертификата
  const renderImage = (record, fieldName) => {
    const fileUrl = getCertificateUrl(record, fieldName);
    return fileUrl ? (
      <Image width={100} src={fileUrl} preview={{ src: fileUrl }} />
    ) : (
      <span>Нет сертификата</span>
    );
  };

  // Функция для рендеринга данных игроков с изображениями сертификатов и ссылками на Steam профиль
  // Добавлены ники игроков
  const renderPlayersDetails = (app) => {
    const players = ['player2', 'player3', 'player4', 'player5'];
    return (
      <div>
        {players.map((playerKey) => {
          const fullName = app[`${playerKey}_fullName`];
          if (!fullName) return null;
          const nickname = app[`${playerKey}_nickName`];
          const steamId = app[`${playerKey}_steamProfile`];
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
              <p><strong>Ник:</strong> {nickname}</p>
              <p>
                <strong>Steam:</strong>{' '}
                <a
                  href={`https://steamcommunity.com/profiles/${steamId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {steamId}
                </a>
              </p>
              <p><strong>Сертификат:</strong></p>
              {renderImage(app, `${playerKey}_certificateFiles`)}
            </div>
          );
        })}
      </div>
    );
  };

  // Настройка rowSelection для массовых действий (если понадобится)
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns = [
    {
      title: 'Логотип',
      dataIndex: 'teamLogo',
      key: 'teamLogo',
      render: (logo, record) => {
        const logoUrl = getTeamLogoUrl(record);
        return logoUrl ? (
          <Avatar size={50} src={logoUrl} style={{ marginRight: 10 }} />
        ) : (
          <Avatar size={50} style={{ marginRight: 10 }}>
            {record.teamName ? record.teamName.charAt(0) : 'T'}
          </Avatar>
        );
      },
    },
    {
      title: 'Название команды',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: 'Дисциплина',
      dataIndex: 'discipline',
      key: 'discipline',
      sorter: (a, b) => a.discipline.localeCompare(b.discipline),
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
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => renderStatusTag(status),
    },
    {
      title: 'Комментарий',
      dataIndex: 'moderatorComment',
      key: 'moderatorComment',
      render: (comment) => (comment ? comment : '-'),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            onClick={() => openDetailsModal(record)}
            color="default"
            variant="filled"
            style={{ marginRight: 8 }}
          >
            Подробнее
          </Button>
          <Button
            color="cyan"
            variant="filled"
            style={{ marginRight: 8 }}
            icon={<CheckCircleOutlined />}
            onClick={() => approveApplication(record)}
          />
          <Button
            style={{ marginRight: 8 }}
            color="danger"
            variant="filled"
            icon={<CloseCircleOutlined />}
            onClick={() => openRejectModal(record)}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Модераторская панель</h1>
        <Space>
          <Button
            color="cyan"
            variant="filled"
            icon={<CheckCircleOutlined />}
            onClick={() => {
              if (selectedRowKeys.length === 0) {
                message.error('Не выбраны заявки для массового одобрения');
                return;
              }
              selectedRowKeys.forEach(async (id) => {
                await pb.collection('team_applications').update(id, { status: 'approved' });
              });
              message.success('Выбранные заявки одобрены');
              setSelectedRowKeys([]);
              fetchApplications();
            }}
          >
            Одобрить выбранное
          </Button>
          <Button
            color="danger"
            variant="filled"
            icon={<CloseCircleOutlined />}
            onClick={() => {
              if (selectedRowKeys.length === 0) {
                message.error('Не выбраны заявки для массового отклонения');
                return;
              }
              if (!moderatorComment.trim()) {
                message.error('Пожалуйста, введите комментарий перед массовым отклонением заявок');
                return;
              }
              selectedRowKeys.forEach(async (id) => {
                await pb.collection('team_applications').update(id, { status: 'rejected', moderatorComment });
              });
              message.success('Выбранные заявки отклонены');
              setSelectedRowKeys([]);
              setModeratorComment('');
              fetchApplications();
            }}
          >
            Отклонить выбранное
          </Button>
        </Space>
      </Flex>

      {loading ? (
        <Spin />
      ) : (
        <Table dataSource={applications} columns={columns} rowKey="id" rowSelection={rowSelection} />
      )}

      {/* Модальное окно с подробной информацией о заявке */}
      <Modal
        title="Детали заявки"
        visible={detailsModalVisible}
        onCancel={closeDetailsModal}
        footer={[
          <Button key="close" onClick={closeDetailsModal}>
            Закрыть
          </Button>,
          <Button key="approve" type="primary" onClick={() => approveApplication(selectedApp)}>
            Одобрить
          </Button>,
        ]}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '70%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        {selectedApp ? (
          <Card>
            <p><strong>Название команды:</strong> {selectedApp.teamName}</p>
            <p><strong>Организация:</strong> {selectedApp.organizationName}</p>
            <p><strong>Дисциплина:</strong> {selectedApp.discipline}</p>
            <p><strong>Логотип команды:</strong></p>
            {getTeamLogoUrl(selectedApp) ? (
              <Avatar size={100} src={getTeamLogoUrl(selectedApp)} />
            ) : (
              <span>Нет логотипа</span>
            )}
            <p><strong>Капитан:</strong> {selectedApp.captain_fullName}</p>
            <p><strong>Ник капитана:</strong> {selectedApp.captain_nickName}</p>
            <p>
              <strong>Steam профиль капитана:</strong>{' '}
              <a
                href={`https://steamcommunity.com/profiles/${selectedApp.captain_steamProfile}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedApp.captain_steamProfile}
              </a>
            </p>
            <p><strong>Телефон капитана:</strong> {selectedApp.captain_phone}</p>
            <p><strong>Telegram капитана:</strong> {selectedApp.captain_telegram}</p>
            <p><strong>Сертификат капитана:</strong></p>
            {renderImage(selectedApp, 'captain_certificateFiles')}
            <hr />
            <h3>Игроки</h3>
            {renderPlayersDetails(selectedApp)}
          </Card>
        ) : (
          <Spin />
        )}
      </Modal>

      {/* Модальное окно для отклонения заявки с вводом комментария */}
      <Modal
        title="Отклонить заявку"
        visible={rejectModalVisible}
        onCancel={closeRejectModal}
        footer={[
          <Button key="cancel" onClick={closeRejectModal}>
            Отмена
          </Button>,
          <Button key="confirm" type="primary" danger onClick={confirmRejection}>
            Подтвердить отклонение
          </Button>,
        ]}
      >
        <p>Пожалуйста, введите комментарий модератора:</p>
        <Input.TextArea
          rows={4}
          value={moderatorComment}
          onChange={(e) => setModeratorComment(e.target.value)}
          placeholder="Введите комментарий..."
        />
      </Modal>
    </div>
  );
};

export default ModeratorDashboard;
