import React from 'react';
import {Layout, Card, Typography, Divider, Space, Row, Col, Avatar} from 'antd';
import { useMediaQuery } from 'react-responsive';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const TournamentDescription = () => {

  const isMobile = useMediaQuery({ maxWidth: 768 });


  return (
    <Layout style={{ background: "transparent" }}>
      <Content style={{ padding: "10px", width: "80%", margin: "0 auto", marginBottom: "20px" }}>
        <Typography>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {/* Показываем только первую иконку на мобильных устройствах */}
            <Avatar size={48} shape='square' src="/images/icon005.png"/>

            {/* Показываем остальные иконки только на десктопах */}
            {!isMobile && (
                <>
                  <Avatar size={48} shape='square' src="/images/icon007.png"/>
                  <Avatar size={48} shape='square' src="/images/icon020.png"/>
                  <Avatar size={48} shape='square' src="/images/icon021.png"/>
                </>
            )}

            <Title
                level={isMobile ? 3 : 2}  // Уменьшаем размер заголовка на мобильных
                style={{
                  textAlign: "center",
                  fontFamily: "'roboto', sans-serif",
                  marginBottom: "24px",
                  marginLeft: "10px"
                }}
            >
              Отчеты о киберспортивных турнирах EMCO.TECH.SPORTS
            </Title>
          </div>
          <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
          <Space direction="vertical" size="middle" style={{width: "100%"}}>
            <Row gutter={[16, 16]}>
              <Col lg={8} md={12} xs={24} sm={24}>
                <Paragraph style={{color: "", fontSize: "16px", fontFamily: "'Roboto', sans-serif"}}>
                  <Avatar size={48} shape='square' src="/images/icon025.png"/>
                  Добро пожаловать в раздел отчетов о турнирах лиги EMCO.TECH.SPORTS! Здесь вы найдете подробную
                  информацию обо всех прошедших сезонах нашей киберспортивной лиги — результаты соревнований,
                  статистику участников, фотогалереи и интервью с победителями.
                </Paragraph>
              </Col>
              <Col lg={8} md={12} xs={24} sm={24}>
                <Paragraph style={{color: "", fontSize: "16px"}}>
                  <Avatar size={48} shape='square' src="/images/icon028.png"/>
                  Каждый турнир — это не просто соревнование, но и важный шаг в развитии киберспорта на Сахалине и
                  Дальнем Востоке. С момента основания лиги количество команд-участников выросло с 23 до более чем 70,
                  а география расширилась от Корсаково до Охи.
                </Paragraph>
              </Col>
              <Col lg={8} md={12} xs={24} sm={24}>
                <Paragraph style={{color: "", fontSize: "16px"}}>
                  <Avatar size={48} shape='square' src="/images/icon030.png"/>
                  Выберите интересующий вас турнир из списка ниже, чтобы узнать о его ключевых моментах, победителях и
                  партнерах мероприятия. Недоступные карточки отмечают запланированные турниры, которые еще предстоят
                  — следите за новостями и готовьтесь к участию!
                </Paragraph>
              </Col>
              <Col span={12}>
                <a href="https://vk.com/emco.tech.sports">Стань частью киберспортивного движения с EMCO.TECH.SPORTS!</a>
              </Col>
            </Row>
          </Space>
        </Typography>
      </Content>
    </Layout>
  );
};

export default TournamentDescription;