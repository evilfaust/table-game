import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Select, Tag, Divider } from 'antd';
import CS2PlayerRating from './CS2PlayerRating';
import TableCS2 from './TableCS2';
import MatchesListCS2 from './etl/MatchesListCS2';
import DOTA2PlayerRating from './DOTA2PlayerRating';
import TableDOTA2 from './TableDOTA2';
import MatchesListDOTA2 from './etl/MatchesListDOTA2';

const { Title, Paragraph } = Typography;

const LeagueDashboard = () => {
  // По умолчанию выбран CS2
  const [discipline, setDiscipline] = useState('CS2');
  // activeSection хранит выбранный раздел: 'tables', 'playerStats', 'matches'
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionToggle = (section) => {
    setActiveSection(prev => (prev === section ? null : section));
  };

  // Рендерим компонент для выбранного раздела в зависимости от дисциплины
  const renderActiveSection = () => {
    if (discipline === 'CS2') {
      switch (activeSection) {
        case 'tables':
          return <TableCS2 discipline={discipline} />;
        case 'playerStats':
          return <CS2PlayerRating discipline={discipline} />;
        case 'matches':
          return <MatchesListCS2 discipline={discipline} />;
        default:
          return null;
      }
    } else if (discipline === 'DOTA2') {
      switch (activeSection) {
        case 'tables':
          return <TableDOTA2 discipline={discipline} />;
        case 'playerStats':
          return <DOTA2PlayerRating discipline={discipline} />;
        case 'matches':
          return <MatchesListDOTA2 discipline={discipline} />;
        default:
          return null;
      }
    }
  };

  // Определяем карточки – для DOTA2 делаем неактивными карточки статистики и матчей
  const cards = [
    {
      id: 1,
      section: 'tables',
      title: "Рейтинговая таблица",
      icon: discipline === 'CS2' ? "/images/icon033.png" : "/images/icon028.png",
      buttonText: "Открыть таблицу",
      active: true
    },
    {
      id: 2,
      section: 'playerStats',
      title: "Статистика игроков",
      icon: discipline === 'CS2' ? "/images/icon034.png" : "/images/icon036.png",
      buttonText: "Открыть статистику",
      active: discipline === 'CS2' // для DOTA2 будет false
    },
    {
      id: 3,
      section: 'matches',
      title: "Сыгранные матчи",
      icon: discipline === 'CS2' ? "/images/icon032.png" : "/images/icon037.png",
      buttonText: "Открыть матчи",
      active: discipline === 'CS2' // для DOTA2 будет false
    }
  ];

  return (
    <Layout style={{ padding: '20px' }}>
      <Layout.Content>
        <Title level={2}>Прогресс киберспортивной лиги</Title>
        <Paragraph>
          На этой странице вы можете ознакомиться с текущими результатами и статистикой киберспортивной лиги.
          Выберите дисциплину, а затем перейдите в нужный раздел – рейтинговая таблица команд, статистика игроков или сыгранные матчи.
        </Paragraph>

        {/* Селектор дисциплины и логотип */}
        <Row align="middle" style={{ marginBottom: 20 }}>
          <Col>
            {discipline === 'CS2' ? (
              <Tag color="#FEA202">
                <img
                  src="/images/cs2-logo.png"
                  style={{ height: '48px' }}
                  alt="CS2 Logo"
                />
              </Tag>
            ) : (
              <Tag color="#FEA202">
                <img
                  src="/images/dota2-logo.png"
                  style={{ height: '48px' }}
                  alt="DOTA 2 Logo"
                />
              </Tag>
            )}
          </Col>
          <Col style={{ marginLeft: 20 }}>
            <Select
              value={discipline}
              onChange={(value) => {
                setDiscipline(value);
                setActiveSection(null); // сброс выбранного раздела при смене дисциплины
              }}
              style={{ width: 200 }}
            >
              <Select.Option value="CS2">Counter Strike 2</Select.Option>
              <Select.Option value="DOTA2">DOTA 2</Select.Option>
            </Select>
          </Col>
        </Row>

        <Divider />

        {/* Карточки с переходами на нужные разделы, выровненные по центру */}
        <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "stretch", justifyContent: "center" }}>
          {cards.map(card => {
            const cardStyle = {
              width: "98%",
              // backgroundColor: "#162938",
              filter: card.active ? "none" : "grayscale(0.8) brightness(0.7)",
              transition: "all 0.3s ease",
              position: "relative",
              cursor: card.active ? "pointer" : "not-allowed"
            };

            return (
              <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
                <Card
                  title={card.title}
                  hoverable={card.active}
                  onClick={() => card.active && handleSectionToggle(card.section)}
                  style={cardStyle}
                >
                  <img
                    src={card.icon}
                    alt={card.title}
                    style={{ width: '50%', display: 'block', margin: '0 auto 10px' }}
                  />
                  <Button
                    block
                    disabled={!card.active}
                    variant="outlined"
                    style={{
                      cursor: card.active ? "pointer" : "not-allowed",
                      opacity: card.active ? 1 : 0.6
                    }}
                  >
                    {card.buttonText}
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>

        {activeSection && (
          <div style={{ marginTop: 30 }}>
            <Divider />
            {renderActiveSection()}
          </div>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default LeagueDashboard;
