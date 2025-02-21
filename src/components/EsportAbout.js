import React from 'react';
import { Row, Col, Divider, Typography } from 'antd';
import { MessageOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const mission = [
    {
      icon: <MessageOutlined style={{ fontSize: '48px', color: '#FEA202' }} />,
      title: 'Миссия',
      description: 'Развитие киберспорта в Сахалинской области с поддержкой талантливой молодежи и привлечением внимания общества.',
    },
    {
      icon: <EyeOutlined style={{ fontSize: '48px', color: '#FEA202' }} />,
      title: 'Видение',
      description: 'Стать лидером в развитии киберспорта в регионе, создавая возможности для молодежи и продвигая киберспорт как спортивную дисциплину.',
    },
    {
      icon: <CheckOutlined style={{ fontSize: '48px', color: '#FEA202' }} />,
      title: 'Цели',
      description: 'Создать среду для развития талантов, поддержать молодежь и популяризировать киберспорт в Сахалинской области.',
    },
  ]
const EsportAbout = () => {
  return (
    <>
    <section>
        <Row gutter={[16, 16]} >
            <Col span={8} justify="center" align="middle" >
                <Title level={5} style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.5rem' }}>
                    Мы в детском технопарке EMCO.TECH видим большой потенциал в развитии киберспорта и рады объявить о запуске EMCO Season League 2025 для школьников, студентов СПО и ВУЗов Сахалинской области.
                </Title>
            </Col>
            <Col span={16}>
                <Row>
                    {mission.map((item, index) => (
                        <Row key={index} gutter={[8, 8]}>
                            <Col span={2}><div style={{ marginBottom: '5px' }}>{item.icon}</div></Col>
                            <Col span={4} ><Title level={3} style={{color: "#FEA202"}}>{item.title}</Title></Col>
                            <Col span={16}><Text>{item.description}</Text></Col>
                            <Divider style={{ margin: '2px 0' }} />
                        </Row>
                    ))}
                </Row>
            </Col>
        </Row>
    </section>
    </>
  );
};

export default EsportAbout;