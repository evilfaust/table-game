import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';

const { Title } = Typography;

// Компонент расписания лиги
const LeagueSchedule = () => {
  const scheduleItems = [
    {
      date: '1 февраля – 1 марта',
      event: 'Регистрация участников',
    },
    {
      date: '3 марта – 31 марта',
      event: 'Первый этап лиги',
    },
    {
      date: '1 апреля – 30 апреля',
      event: 'Заключительный этап лиги',
    },
  ];

  return (
    <>
      {/* Заголовок расписания */}
      <Row gutter={[16, 16]}>
        <Col lg={24} xs={24} style={{ textAlign: 'center', marginBottom: 16 }}>
          <Title level={2}>Календарь проведения соревнований</Title>
        </Col>
      </Row>

      {/* События календаря */}
      {scheduleItems.map((item, index) => (
        <React.Fragment key={index}>
          <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
            <Col lg={12} xs={6}>
              <Title level={5}>{item.date}</Title>
            </Col>
            <Col lg={12} xs={18}>
              <Title level={5}>{item.event}</Title>
            </Col>
          </Row>
          <Divider style={{ margin: '16px 0' }} />
        </React.Fragment>
      ))}
    </>
  );
};

export default LeagueSchedule;