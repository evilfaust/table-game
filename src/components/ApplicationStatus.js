// src/components/ApplicationStatus.js
import React, { useEffect, useState } from 'react';
import { Card, Spin, message, Row, Col } from 'antd';
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
        // Загружаем все записи, где наше кастомное поле userId соответствует текущему пользователю
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

  if (loading) return <Spin />;
  if (applications.length === 0)
    return <div>Заявки не найдены. Возможно, вы ещё не подали заявку.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Мои заявки</h1>
      <Row gutter={[16, 16]}>
        {applications.map((app) => (
          <Col xs={24} md={12} key={app.id}>
            <Card title={app.teamName} bordered>
              <p><strong>Организация:</strong> {app.organizationName}</p>
              <p><strong>Статус:</strong> {app.status || "На рассмотрении"}</p>
              <p><strong>Дата создания:</strong> {new Date(app.created).toLocaleString()}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ApplicationStatus;
