import React from 'react';
import { Layout, Typography, Divider, Space, Row, Col, Avatar } from 'antd';
import { useMediaQuery } from 'react-responsive';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const NewsDescription = () => {
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
            <Avatar size={48} shape='square' src="/images/icon022.png"/>

            {/* Показываем остальные иконки только на десктопах */}
            {!isMobile && (
                <>
                  <Avatar size={48} shape='square' src="/images/icon015.png"/>
                  <Avatar size={48} shape='square' src="/images/icon024.png"/>
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
              Новости EMCO.TECH.SPORT
            </Title>
          </div>
          <Divider style={{borderColor: "#FEA202", margin: "16px 0"}}/>
          <Space direction="vertical" size="middle" style={{width: "100%"}}>
            <Row gutter={[16, 16]}>
              <Col lg={8} md={12} xs={24} sm={24}>
                <Paragraph style={{color: "", fontSize: "16px", fontFamily: "'Roboto', sans-serif"}}>
                  <Avatar size={48} shape='square' src="/images/icon010.png"/>
                  Добро пожаловать на нашу новостную страницу! Здесь вы найдете самые актуальные новости о событиях, турнирах и участниках нашей киберспортивной лиги.
                </Paragraph>
              </Col>
              <Col lg={8} md={12} xs={24} sm={24}>
                <Paragraph style={{color: "", fontSize: "16px"}}>
                  <Avatar size={48} shape='square' src="/images/icon011.png"/>
                  <Text strong>Наши информационные каналы</Text><br/>
                  Все публикуемые здесь новости автоматически подгружаются из нашего официального сообщества ВКонтакте. Чтобы быть в курсе всех событий и не пропустить важные анонсы, приглашаем вас подписаться на наши социальные сети:
                </Paragraph>
              </Col>
              <Col lg={8} md={12} xs={24} sm={24}>
                <Paragraph style={{color: "", fontSize: "16px"}}>
                  <Avatar size={48} shape='square' src="/images/icon009.png"/>
                  Следите за трансляциями КИБЕРКАСТ, где мы регулярно освещаем интересные матчи и события нашей лиги!<br/>
                  Присоединяйтесь к нашему сообществу, участвуйте в дискуссиях и будьте в центре киберспортивных событий!
                </Paragraph>
              </Col>
              <Col span={24}>
                <Paragraph style={{fontSize: "16px"}}>
                  <ul>
                    <li><Text strong>ВКонтакте</Text>: <a href="https://vk.com/emco.tech.sports" target="_blank" rel="noopener noreferrer">vk.com/emco.tech.sports</a> — основной источник новостей о лиге, анонсы и результаты матчей, обсуждения и многое другое</li>
                    <li><Text strong>Telegram-канал лиги</Text>: <a href="https://t.me/emcotechsports65" target="_blank" rel="noopener noreferrer">t.me/emcotechsports65</a> — оперативные уведомления о важных событиях лиги</li>
                    <li><Text strong>Telegram-канал детского технопарка</Text>: <a href="https://t.me/emco_tech" target="_blank" rel="noopener noreferrer">t.me/emco_tech</a> — новости нашего технопарка и образовательных программ</li>
                  </ul>
                </Paragraph>
              </Col>
            </Row>
          </Space>
        </Typography>
      </Content>
    </Layout>
  );
};

export default NewsDescription;