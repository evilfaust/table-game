import React from 'react';
import { Row, Col, Typography, Divider, Layout } from 'antd';
import { MessageOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';

import LeagueSchedule from '../components/LeagueSchedule';
import DocumentsSection from '../components/DocumentsSection';


const { Title, Text } = Typography;

// Карточка для Миссии, Видения и Целей
const MissionVisionGoalCard = ({ icon, title, description }) => (
  <Col md={8} xs={24} className="mt-5">
    <div className="about-icon" style={{ display: 'flex', justifyContent: 'center' }}>
      {icon}
    </div>
    <Title level={3} style={{ marginTop: 16, textAlign: 'center' }}>
      {title}
    </Title>
    <Text style={{ textAlign: 'center', color: '#666', lineHeight: '1.6' }}>
      {description}
    </Text>
  </Col>
);

// Основной компонент
const EsportAboutSection = () => {
  return (
    <>
    <Layout>
    <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
    <section id="esport-about" style={{ backgroundColor: '#f5f5f5', padding: '50px 0' }}>
          {/* Введение */}
          <Row justify="center" gutter={[16, 16]}>
            <Col lg={12} md={10} xs={24} style={{ textAlign: 'center', marginBottom: 32 }}>
              <Title level={2}>Миссия. <span style={{color: '#FEA202'}}>Видение.</span> <span style={{color: '#00FF94'}}>Цели.</span></Title>
              <Text strong style={{ fontSize: 18, display: 'block', marginBottom: 16 }}>
                Мы в детском технопарке EMCO.TECH видим большой потенциал в развитии киберспорта и рады объявить о запуске EMCO Season League 2025 для школьников, студентов СПО и ВУЗов Сахалинской области.
              </Text>
            </Col>
          </Row>

          {/* Миссия, Видение, Цели */}
          <Row gutter={[16, 16]}>
            <MissionVisionGoalCard
              icon={<MessageOutlined style={{ fontSize: '48px', color: '#FEA202' }} />}
              title="Миссия"
              description="Развитие киберспорта в Сахалинской области с поддержкой талантливой молодежи и привлечением внимания общества."
            />
            <MissionVisionGoalCard
              icon={<EyeOutlined style={{ fontSize: '48px', color: '#FEA202' }} />}
              title="Видение"
              description="Стать лидером в развитии киберспорта в регионе, создавая возможности для молодежи и продвигая киберспорт как спортивную дисциплину."
            />
            <MissionVisionGoalCard
              icon={<CheckOutlined style={{ fontSize: '48px', color: '#FEA202' }} />}
              title="Цели"
              description="Создать среду для развития талантов, поддержать молодежь и популяризировать киберспорт в Сахалинской области."
            />
          </Row>
    </section>
    </Layout.Content>
    </Layout>

      {/* Разделитель */}
      {/* <Divider style={{ margin: '32px 0' }} /> */}
    <Layout className="docbackground">
    <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
        <Row gutter={[16, 16]} className="">
        <Col xs={24} md={12} lg={12}>
            <LeagueSchedule />
        </Col>
        <Col xs={24} md={12} lg={12}>
            <DocumentsSection />
        </Col>
        </Row>
        </Layout.Content>
        </Layout>
        </>
  );
};

export default EsportAboutSection;
