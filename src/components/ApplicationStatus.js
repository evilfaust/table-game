// src/components/ApplicationStatus.js
import React, { useEffect, useState } from 'react';
import {Card, Spin, message, Row, Col, Avatar, Tag, Layout} from 'antd';
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import pb from '../pb';

const ApplicationStatus = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const currentUser = pb.authStore.model;
        if (!currentUser) {
          throw new Error("Пользователь не аутентифицирован");
        }
        const userId = currentUser.id;
        // Загружаем все заявки, где кастомное поле userId соответствует текущему пользователю
        const records = await pb.collection('team_applications').getFullList({
          filter: `userId = "${userId}"`
        });
        setApplications(records);
      } catch (error) {
        message.error("Ошибка загрузки заявок");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Функция для получения URL логотипа команды
  const getTeamLogoUrl = (record) => {
    const fileName = record.teamLogo;
    if (!fileName || !fileName.includes('.')) return null;
    return pb.files.getURL(record, fileName, { thumb: '100x100' });
  };

  // Функция для отображения статуса с использованием Tag
  const renderStatusTag = (status) => {
    if (status === 'approved') {
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          approved
        </Tag>
      );
    }
    if (status === 'rejected') {
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          rejected
        </Tag>
      );
    }
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
    );
  };

  if (loading) return <Spin />;
  if (applications.length === 0)
    return <div>Заявки не найдены. Возможно, вы ещё не подали заявку.</div>;

  return (
      <>
    <div style={{ padding: '20px' }}>
      <h1>Мои заявки</h1>
      <Row gutter={[16, 16]}>
        {applications.map((app) => {
          const logoUrl = getTeamLogoUrl(app);
          return (
            <Col xs={24} md={12} key={app.id}>
              <Card
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {logoUrl ? (
                      <Avatar size={50} src={logoUrl} style={{ marginRight: 10 }} />
                    ) : (
                      <Avatar size={50} style={{ marginRight: 10 }}>
                        {app.teamName ? app.teamName.charAt(0) : 'T'}
                      </Avatar>
                    )}
                    <span>{app.teamName}</span>
                  </div>
                }
                bordered
              >
                <p><strong>Организация:</strong> {app.organizationName}</p>
                <p><strong>Статус:</strong> {renderStatusTag(app.status)}</p>
                {app.status === 'rejected' && app.moderatorComment && (
                  <p>
                    <strong>Комментарий модератора:</strong> {app.moderatorComment}
                  </p>
                )}
                <p><strong>Дата создания:</strong> {new Date(app.created).toLocaleString()}</p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
      </>
  );
};

export default ApplicationStatus;
