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
  const [playerExistence, setPlayerExistence] = useState({});

  useEffect(() => {
    fetchApplications();
  }, []);

  // ===========================
  // ===== Загрузка заявок =====
  // ===========================
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const apps = await pb.collection('team_applications').getFullList({
        sort: '-created',
        $autoCancel: false,
      });
      console.log('[fetchApplications] Загружено заявок:', apps);
      setApplications(apps);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
      message.error('Ошибка загрузки заявок');
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // ===== Модалки (открытие/закрытие) =====
  // ===========================
  const openDetailsModal = (app) => {
    setSelectedApp(app);
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setSelectedApp(null);
    setPlayerExistence({});
  };

  const openRejectModal = (app) => {
    setSelectedApp(app);
    setModeratorComment('');
    setRejectModalVisible(true);
  };

  const closeRejectModal = () => {
    setRejectModalVisible(false);
    setSelectedApp(null);
    setPlayerExistence({});
  };

  // ===========================
  // === Проверка игроков (useEffect) ===
  // ===========================
  useEffect(() => {
    if (selectedApp) {
      let isCancelled = false;
      const roles = ['captain', 'player2', 'player3', 'player4', 'player5', 'substitute1', 'substitute2'];
      Promise.all(
        roles.map(role => {
          const steamId = selectedApp[`${role}_steamProfile`];
          if (!steamId) return Promise.resolve({ role, data: null });
          console.log(`[checkPlayer] Проверяем ${role} с SteamID=${steamId}`);
          return pb.collection('Player')
            .getList(1, 1, { filter: `SteamID = "${steamId}"`, $autoCancel: false })
            .then(res => {
              console.log(`[checkPlayer] Результат для ${role}:`, res);
              return { role, data: res.totalItems > 0 ? res.items[0] : null };
            })
            .catch(error => {
              console.error(`Ошибка проверки игрока для роли ${role}:`, error);
              return { role, data: null };
            });
        })
      ).then(results => {
        if (!isCancelled) {
          const info = {};
          results.forEach(({ role, data }) => {
            info[role] = data;
          });
          console.log('[checkPlayer] Итоговая информация:', info);
          setPlayerExistence(info);
        }
      }).catch(error => {
        if (!isCancelled) {
          console.error("Ошибка при проверке существования игроков:", error);
        }
      });
      return () => {
        isCancelled = true;
      };
    }
  }, [selectedApp]);

  // ===========================
  // ===== Обновление статуса заявки =====
  // ===========================
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

  // ===========================
  // ===== Проверка/создание записи в "team" =====
  // ===========================
  const getOrCreateTeamRecord = async (app) => {
    try {
      console.log('[getOrCreateTeamRecord] Проверяем команду с Name=', app.teamName);
      // Ищем команду в коллекции "team" (по Name и discipline, если это нужно)
      const existingTeams = await pb.collection('team').getList(1, 1, {
        filter: `Name = "${app.teamName}" && discipline = "${app.discipline}"`,
        $autoCancel: false,
      });
      if (existingTeams.totalItems > 0) {
        // Команда найдена
        const existing = existingTeams.items[0];
        console.log('[getOrCreateTeamRecord] Найдена существующая команда:', existing);
        // Спросим у модератора, нужно ли обновить
        const updateTeam = window.confirm(
          `Команда "${app.teamName}" (дисциплина "${app.discipline}") уже существует.\n` +
          `Обновить запись или оставить как есть?`
        );
        if (updateTeam) {
          const updated = await pb.collection('team').update(existing.id, {
            Name: app.teamName,
            discipline: app.discipline,
          });
          console.log('[getOrCreateTeamRecord] Обновили команду:', updated);
          return updated.id;
        } else {
          return existing.id;
        }
      } else {
        // Команда не найдена – создаём новую
        console.log('[getOrCreateTeamRecord] Команда не найдена, создаём новую...');
        const created = await pb.collection('team').create({
          Name: app.teamName,
          discipline: app.discipline,
        });
        console.log('[getOrCreateTeamRecord] Создана новая команда:', created);
        return created.id;
      }
    } catch (error) {
      console.error('[getOrCreateTeamRecord] Ошибка при поиске/создании команды:', error);
      message.error('Ошибка при поиске или создании команды (team)');
      throw error;
    }
  };

  // ===========================
  // ===== Обработка заявки =====
  // ===========================
const handleProcessApplication = async () => {
  if (!selectedApp) return;
  console.log('[handleProcessApplication] Начало обработки заявки', selectedApp.id);
  message.info('Начинается обработка заявки...');

  // 1) Создаём/находим команду и получаем её id
  let teamId;
  try {
    teamId = await getOrCreateTeamRecord(selectedApp);
    console.log('[handleProcessApplication] teamId=', teamId);
  } catch (teamError) {
    console.error('[handleProcessApplication] Не удалось получить/создать команду:', teamError);
    return;
  }

  // 2) Создаём/обновляем игроков (Player)
  const roles = [
    { key: 'captain', label: 'Капитан' },
    { key: 'player2', label: 'Игрок 2' },
    { key: 'player3', label: 'Игрок 3' },
    { key: 'player4', label: 'Игрок 4' },
    { key: 'player5', label: 'Игрок 5' },
    { key: 'substitute1', label: 'Запасной 1' },
    { key: 'substitute2', label: 'Запасной 2' },
  ];
  const processedPlayerIds = [];
  for (let role of roles) {
    const steamId = selectedApp[`${role.key}_steamProfile`];
    if (!steamId) continue;
    console.log(`[handleProcessApplication] Обработка ${role.label} с SteamID=${steamId}`);
    try {
      const res = await pb.collection('Player').getList(1, 1, {
        filter: `SteamID = "${steamId}"`,
        $autoCancel: false,
      });
      if (res.totalItems > 0) {
        const existing = res.items[0];
        console.log(`[handleProcessApplication] ${role.label} существует:`, existing);
        const update = window.confirm(
          `${role.label}: Игрок уже существует.\n` +
          `Имя: ${existing.Name}, Ник: ${existing.NikName}, SteamID: ${existing.SteamID}.\n` +
          `Обновить данные из заявки?`
        );
        if (update) {
          const updatedData = {
            Name: selectedApp[`${role.key}_fullName`],
            NikName: selectedApp[`${role.key}_nickName`],
            SteamID: steamId,
            Discipline: selectedApp.discipline,
          };
          const updatedPlayer = await pb.collection('Player').update(existing.id, updatedData);
          console.log(`[handleProcessApplication] Обновлён ${role.label}:`, updatedPlayer);
          processedPlayerIds.push(updatedPlayer.id);
        } else {
          processedPlayerIds.push(existing.id);
        }
      } else {
        const newData = {
          Name: selectedApp[`${role.key}_fullName`],
          NikName: selectedApp[`${role.key}_nickName`],
          SteamID: steamId,
          Discipline: selectedApp.discipline,
        };
        const createdPlayer = await pb.collection('Player').create(newData);
        console.log(`[handleProcessApplication] Создан новый ${role.label}:`, createdPlayer);
        processedPlayerIds.push(createdPlayer.id);
      }
    } catch (error) {
      console.error(`Ошибка обработки игрока ${role.label}:`, error);
      message.error(`Ошибка обработки игрока ${role.label}`);
    }
  }
  console.log('[handleProcessApplication] Обработанные игроки:', processedPlayerIds);

  // 3) Создаём запись в teams_etl5_2025
  // Поле TeamName ожидает ID записи из коллекции team, Players – массив ID из Player,
  // discipline заполняется значением из заявки.
  try {
    const teamData = {
      TeamName: teamId, // relation single: ID записи из "team"
      pts: 0,
      place: 'N/A', // Если пустая строка не допускается, можно задать значение по умолчанию
      Players: processedPlayerIds, // relation multiple: массив ID из "Player"
      // logo: selectedApp.teamLogo, // Убираем поле logo, т.к. оно не обязателен
      discipline: selectedApp.discipline,
    };
    console.log('[handleProcessApplication] Данные для создания команды:', teamData);

    const teamRecord = await pb.collection('teams_etl5_2025').create(teamData);
    console.log('[handleProcessApplication] Создана команда (teams_etl5_2025):', teamRecord);
    message.success('Команда успешно создана в teams_etl5_2025');
  } catch (error) {
    console.error('Ошибка создания команды (teams_etl5_2025):', error);
    message.error('Ошибка создания команды в teams_etl5_2025');
  }
};


  // ===========================
  // ===== Рендер "статуса" =====
  // ===========================
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

  // ===========================
  // ===== Хелперы для картинок =====
  // ===========================
  const getTeamLogoUrl = (record) => {
    const fileName = record.teamLogo;
    if (!fileName || !fileName.includes('.')) return null;
    return pb.files.getURL(record, fileName, { thumb: '100x100' });
  };

  const getCertificateUrl = (record, fieldName) => {
    const fileName = record[fieldName];
    if (!fileName || !fileName.includes('.')) return null;
    return pb.files.getURL(record, fileName, { thumb: 'original' });
  };

  const renderImage = (record, fieldName) => {
    const fileUrl = getCertificateUrl(record, fieldName);
    return fileUrl ? (
      <Image width={100} src={fileUrl} preview={{ src: fileUrl }} />
    ) : (
      <span>Нет сертификата</span>
    );
  };

  // ===========================
  // ===== Рендер основных игроков =====
  // ===========================
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
              {steamId && (
                playerExistence[playerKey] ? (
                  <p style={{ color: 'green' }}>
                    (Existing: {playerExistence[playerKey].Name}, {playerExistence[playerKey].NikName})
                  </p>
                ) : (
                  <p style={{ color: 'blue' }}>(new)</p>
                )
              )}
              <p><strong>Сертификат:</strong></p>
              {renderImage(app, `${playerKey}_certificateFiles`)}
            </div>
          );
        })}
      </div>
    );
  };

  // ===========================
  // ===== Таблица заявок =====
  // ===========================
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

  // ===========================
  // ===== Рендер компонента ===
  // ===========================
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

      <Modal
        title="Детали заявки"
        visible={detailsModalVisible}
        onCancel={closeDetailsModal}
        footer={[
          <Button key="close" onClick={closeDetailsModal}>
            Закрыть
          </Button>,
          <Button key="process" type="primary" onClick={handleProcessApplication}>
            Обработать заявку
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
            {selectedApp.captain_steamProfile && (
              <p>
                <strong>Steam профиль капитана:</strong>{' '}
                <a
                  href={`https://steamcommunity.com/profiles/${selectedApp.captain_steamProfile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedApp.captain_steamProfile}
                </a>{' '}
                {playerExistence['captain'] ? (
                  <span style={{ color: 'green' }}>
                    (Existing: {playerExistence['captain'].Name}, {playerExistence['captain'].NikName})
                  </span>
                ) : (
                  <span style={{ color: 'blue' }}>(new)</span>
                )}
              </p>
            )}
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





// import React, { useEffect, useState } from 'react';
// import { Table, Button, Modal, Card, Spin, message, Image, Input, Tag, Avatar, Space, Flex } from 'antd';
// import {
//   CheckCircleOutlined,
//   CloseCircleOutlined,
//   ClockCircleOutlined,
//   SyncOutlined
// } from '@ant-design/icons';
// import pb from '../pb';
//
// const ModeratorDashboard = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedApp, setSelectedApp] = useState(null);
//   const [detailsModalVisible, setDetailsModalVisible] = useState(false);
//   const [rejectModalVisible, setRejectModalVisible] = useState(false);
//   const [moderatorComment, setModeratorComment] = useState('');
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
//
//   useEffect(() => {
//     fetchApplications();
//   }, []);
//
//   const fetchApplications = async () => {
//     setLoading(true);
//     try {
//       const apps = await pb.collection('team_applications').getFullList({
//         sort: '-created',
//         $autoCancel: false,
//       });
//       setApplications(apps);
//     } catch (error) {
//       console.error('Ошибка загрузки заявок:', error);
//       message.error('Ошибка загрузки заявок');
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   const openDetailsModal = (app) => {
//     setSelectedApp(app);
//     setDetailsModalVisible(true);
//   };
//
//   const closeDetailsModal = () => {
//     setDetailsModalVisible(false);
//     setSelectedApp(null);
//   };
//
//   const openRejectModal = (app) => {
//     setSelectedApp(app);
//     setModeratorComment('');
//     setRejectModalVisible(true);
//   };
//
//   const closeRejectModal = () => {
//     setRejectModalVisible(false);
//     setSelectedApp(null);
//   };
//
//   // Функция обновления статуса заявки с комментариями (при отклонении)
//   const updateApplicationStatus = async (appId, status, comment = '') => {
//     try {
//       await pb.collection('team_applications').update(appId, { status, moderatorComment: comment });
//       message.success(`Заявка ${status === 'approved' ? 'одобрена' : 'отклонена'}`);
//       fetchApplications();
//     } catch (error) {
//       console.error('Ошибка обновления статуса заявки:', error);
//       message.error('Ошибка обновления статуса заявки');
//     }
//   };
//
//   const approveApplication = async (app) => {
//     await updateApplicationStatus(app.id, 'approved');
//     closeDetailsModal();
//   };
//
//   const confirmRejection = async () => {
//     if (!moderatorComment.trim()) {
//       message.error('Пожалуйста, введите комментарий перед отклонением заявки');
//       return;
//     }
//     await updateApplicationStatus(selectedApp.id, 'rejected', moderatorComment);
//     closeRejectModal();
//   };
//
//   // Функция для отображения статуса с использованием Tag
//   const renderStatusTag = (status) => {
//     if (status === 'approved')
//       return (
//         <Tag icon={<CheckCircleOutlined />} color="cyan">
//           approved
//         </Tag>
//       );
//     if (status === 'rejected')
//       return (
//         <Tag icon={<CloseCircleOutlined />} color="error">
//           rejected
//         </Tag>
//       );
//     return (
//       <Tag icon={<SyncOutlined spin />} color="processing">
//         processing
//       </Tag>
//     );
//   };
//
//   // Функция для получения URL логотипа команды
//   const getTeamLogoUrl = (record) => {
//     const fileName = record.teamLogo;
//     if (!fileName || !fileName.includes('.')) return null;
//     return pb.files.getURL(record, fileName, { thumb: '100x100' });
//   };
//
//   // Функция для получения URL изображения сертификата
//   const getCertificateUrl = (record, fieldName) => {
//     const fileName = record[fieldName];
//     if (!fileName || !fileName.includes('.')) return null;
//     return pb.files.getURL(record, fileName, { thumb: 'original' });
//   };
//
//   // Функция для рендеринга изображения сертификата
//   const renderImage = (record, fieldName) => {
//     const fileUrl = getCertificateUrl(record, fieldName);
//     return fileUrl ? (
//       <Image width={100} src={fileUrl} preview={{ src: fileUrl }} />
//     ) : (
//       <span>Нет сертификата</span>
//     );
//   };
//
//   // Функция для рендеринга данных игроков с изображениями сертификатов и ссылками на Steam профиль
//   // Добавлены ники игроков
//   const renderPlayersDetails = (app) => {
//     const players = ['player2', 'player3', 'player4', 'player5'];
//     return (
//       <div>
//         {players.map((playerKey) => {
//           const fullName = app[`${playerKey}_fullName`];
//           if (!fullName) return null;
//           const nickname = app[`${playerKey}_nickName`];
//           const steamId = app[`${playerKey}_steamProfile`];
//           return (
//             <div
//               key={playerKey}
//               style={{
//                 marginBottom: '10px',
//                 borderBottom: '1px solid #f0f0f0',
//                 paddingBottom: '5px',
//               }}
//             >
//               <p><strong>Игрок {playerKey.slice(-1)}</strong></p>
//               <p><strong>ФИО:</strong> {fullName}</p>
//               <p><strong>Ник:</strong> {nickname}</p>
//               <p>
//                 <strong>Steam:</strong>{' '}
//                 <a
//                   href={`https://steamcommunity.com/profiles/${steamId}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {steamId}
//                 </a>
//               </p>
//               <p><strong>Сертификат:</strong></p>
//               {renderImage(app, `${playerKey}_certificateFiles`)}
//             </div>
//           );
//         })}
//       </div>
//     );
//   };
//
//   // Настройка rowSelection для массовых действий (если понадобится)
//   const rowSelection = {
//     selectedRowKeys,
//     onChange: (selectedKeys) => {
//       setSelectedRowKeys(selectedKeys);
//     },
//   };
//
//   const columns = [
//     {
//       title: 'Логотип',
//       dataIndex: 'teamLogo',
//       key: 'teamLogo',
//       render: (logo, record) => {
//         const logoUrl = getTeamLogoUrl(record);
//         return logoUrl ? (
//           <Avatar size={50} src={logoUrl} style={{ marginRight: 10 }} />
//         ) : (
//           <Avatar size={50} style={{ marginRight: 10 }}>
//             {record.teamName ? record.teamName.charAt(0) : 'T'}
//           </Avatar>
//         );
//       },
//     },
//     {
//       title: 'Название команды',
//       dataIndex: 'teamName',
//       key: 'teamName',
//     },
//     {
//       title: 'Дисциплина',
//       dataIndex: 'discipline',
//       key: 'discipline',
//       sorter: (a, b) => a.discipline.localeCompare(b.discipline),
//     },
//     {
//       title: 'Организация',
//       dataIndex: 'organizationName',
//       key: 'organizationName',
//     },
//     {
//       title: 'Дата создания',
//       dataIndex: 'created',
//       key: 'created',
//       render: (created) => new Date(created).toLocaleString(),
//     },
//     {
//       title: 'Статус',
//       dataIndex: 'status',
//       key: 'status',
//       sorter: (a, b) => a.status.localeCompare(b.status),
//       render: (status) => renderStatusTag(status),
//     },
//     {
//       title: 'Комментарий',
//       dataIndex: 'moderatorComment',
//       key: 'moderatorComment',
//       render: (comment) => (comment ? comment : '-'),
//     },
//     {
//       title: 'Действия',
//       key: 'actions',
//       render: (_, record) => (
//         <>
//           <Button
//             onClick={() => openDetailsModal(record)}
//             color="default"
//             variant="filled"
//             style={{ marginRight: 8 }}
//           >
//             Подробнее
//           </Button>
//           <Button
//             color="cyan"
//             variant="filled"
//             style={{ marginRight: 8 }}
//             icon={<CheckCircleOutlined />}
//             onClick={() => approveApplication(record)}
//           />
//           <Button
//             style={{ marginRight: 8 }}
//             color="danger"
//             variant="filled"
//             icon={<CloseCircleOutlined />}
//             onClick={() => openRejectModal(record)}
//           />
//         </>
//       ),
//     },
//   ];
//
//   return (
//     <div style={{ padding: '20px' }}>
//       <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
//         <h1 style={{ margin: 0 }}>Модераторская панель</h1>
//         <Space>
//           <Button
//             color="cyan"
//             variant="filled"
//             icon={<CheckCircleOutlined />}
//             onClick={() => {
//               if (selectedRowKeys.length === 0) {
//                 message.error('Не выбраны заявки для массового одобрения');
//                 return;
//               }
//               selectedRowKeys.forEach(async (id) => {
//                 await pb.collection('team_applications').update(id, { status: 'approved' });
//               });
//               message.success('Выбранные заявки одобрены');
//               setSelectedRowKeys([]);
//               fetchApplications();
//             }}
//           >
//             Одобрить выбранное
//           </Button>
//           <Button
//             color="danger"
//             variant="filled"
//             icon={<CloseCircleOutlined />}
//             onClick={() => {
//               if (selectedRowKeys.length === 0) {
//                 message.error('Не выбраны заявки для массового отклонения');
//                 return;
//               }
//               if (!moderatorComment.trim()) {
//                 message.error('Пожалуйста, введите комментарий перед массовым отклонением заявок');
//                 return;
//               }
//               selectedRowKeys.forEach(async (id) => {
//                 await pb.collection('team_applications').update(id, { status: 'rejected', moderatorComment });
//               });
//               message.success('Выбранные заявки отклонены');
//               setSelectedRowKeys([]);
//               setModeratorComment('');
//               fetchApplications();
//             }}
//           >
//             Отклонить выбранное
//           </Button>
//         </Space>
//       </Flex>
//
//       {loading ? (
//         <Spin />
//       ) : (
//         <Table dataSource={applications} columns={columns} rowKey="id" rowSelection={rowSelection} />
//       )}
//
//       {/* Модальное окно с подробной информацией о заявке */}
//       <Modal
//         title="Детали заявки"
//         visible={detailsModalVisible}
//         onCancel={closeDetailsModal}
//         footer={[
//           <Button key="close" onClick={closeDetailsModal}>
//             Закрыть
//           </Button>,
//           <Button key="approve" type="primary" onClick={() => approveApplication(selectedApp)}>
//             Одобрить
//           </Button>,
//         ]}
//         width={{
//           xs: '90%',
//           sm: '80%',
//           md: '70%',
//           lg: '70%',
//           xl: '50%',
//           xxl: '40%',
//         }}
//       >
//         {selectedApp ? (
//           <Card>
//             <p><strong>Название команды:</strong> {selectedApp.teamName}</p>
//             <p><strong>Организация:</strong> {selectedApp.organizationName}</p>
//             <p><strong>Дисциплина:</strong> {selectedApp.discipline}</p>
//             <p><strong>Логотип команды:</strong></p>
//             {getTeamLogoUrl(selectedApp) ? (
//               <Avatar size={100} src={getTeamLogoUrl(selectedApp)} />
//             ) : (
//               <span>Нет логотипа</span>
//             )}
//             <p><strong>Капитан:</strong> {selectedApp.captain_fullName}</p>
//             <p><strong>Ник капитана:</strong> {selectedApp.captain_nickName}</p>
//             <p>
//               <strong>Steam профиль капитана:</strong>{' '}
//               <a
//                 href={`https://steamcommunity.com/profiles/${selectedApp.captain_steamProfile}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {selectedApp.captain_steamProfile}
//               </a>
//             </p>
//             <p><strong>Телефон капитана:</strong> {selectedApp.captain_phone}</p>
//             <p><strong>Telegram капитана:</strong> {selectedApp.captain_telegram}</p>
//             <p><strong>Сертификат капитана:</strong></p>
//             {renderImage(selectedApp, 'captain_certificateFiles')}
//             <hr />
//             <h3>Игроки</h3>
//             {renderPlayersDetails(selectedApp)}
//           </Card>
//         ) : (
//           <Spin />
//         )}
//       </Modal>
//
//       {/* Модальное окно для отклонения заявки с вводом комментария */}
//       <Modal
//         title="Отклонить заявку"
//         visible={rejectModalVisible}
//         onCancel={closeRejectModal}
//         footer={[
//           <Button key="cancel" onClick={closeRejectModal}>
//             Отмена
//           </Button>,
//           <Button key="confirm" type="primary" danger onClick={confirmRejection}>
//             Подтвердить отклонение
//           </Button>,
//         ]}
//       >
//         <p>Пожалуйста, введите комментарий модератора:</p>
//         <Input.TextArea
//           rows={4}
//           value={moderatorComment}
//           onChange={(e) => setModeratorComment(e.target.value)}
//           placeholder="Введите комментарий..."
//         />
//       </Modal>
//     </div>
//   );
// };
//
// export default ModeratorDashboard;
