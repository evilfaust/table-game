import React from 'react';
import { Typography, Card, Avatar, Row, Col, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const Etl2FinalReport = () => {
  return (
    <Card style={{ maxWidth: "90%", margin: '0 auto', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* <Avatar size={48} shape='square' src="/images/icon025.png" /> */}
        <Title level={2} style={{textAlign: "center"}}>🎮 ВТОРОЙ САХАЛИНСКИЙ КИБЕРТУРНИР ETL2: ЗАВЕРШЕНИЕ ГОДА С ГРОМКИМИ ПОБЕДАМИ! 🎮</Title>
        </div>
        <Row gutter={[16, 16]}>
            <Col lg={16} md={24} xs={24} sm={24}>
            <Paragraph>
              В конце 2023 года Южно-Сахалинск стал эпицентром киберспортивной жизни региона — здесь завершился второй сахалинский кибертурнир ETL2. 
              Этот чемпионат стал настоящим праздником для всех фанатов игр: 400 участников из 74 команд со всей Сахалинской области сражались за звание 
              лучших на протяжении двух месяцев. Финальные баталии прошли 23 и 24 декабря, собрав зрителей и болельщиков в Южно-Сахалинске.
            </Paragraph>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar shape='square' size={48} src="/images/icon028.png" />
            <Title level={3}>Dota 2: Sheshenyn Syngen — короли арены!</Title>
            </div>
            <Paragraph>
            В дисциплине Dota 2 чемпионом стала команда Sheshenyn Syngen, показавшая невероятную игру. Их стратегии, слаженность и мастерство оставили 
            соперников далеко позади. 🏆 Этот триумф стал доказательством того, что сахалинские команды способны на великие победы!
            </Paragraph>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar shape='square' size={48} src="/images/icon029.png" />
            <Title level={3}>Counter-Strike 2: 21 int — непобедимые!</Title>
            </div>
            <Paragraph>
            В Counter-Strike 2 безоговорочными лидерами стала команда 21 int. Их точность, тактика и командная работа впечатлили всех зрителей. 💥 
            Они прошли турнир с уверенностью настоящих профессионалов, заслужив звание чемпионов.
            </Paragraph>
            </Col>
            <Col lg={8} md={24} xs={24} sm={24}>
            <img style={{width: "100%", borderRadius: "10px"}} src="https://emcotech.site/assets/gall/final2024/exibid-photo-2024-02-15-18-43-35.jpg" alt="EMCO.TECH.SPORTS" />
            <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
            </Col>
        </Row>
        <Divider />
      <Row gutter={[16, 16]}>
        <Col lg={8} md={24} xs={24} sm={24}>
        <img style={{width: "100%", borderRadius: "10px"}} src="https://emcotech.site/assets/gall/final2024/exibid-photo-2024-02-15-18-43-02.jpg" alt="EMCO.TECH.SPORTS" />
        <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
        </Col>
        <Col lg={16} md={24} xs={24} sm={24}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar shape='square' size={48} src="/images/icon025.png" />
        <Title level={3}>Масштаб и значимость ETL2</Title>
        </div>
        <Paragraph>
        - 400 участников и 74 команды — это рекорд для региона, который показывает, насколько киберспорт популярен на Сахалине.
        </Paragraph>
        <Paragraph>
        - Финалы в оффлайн-формате — финальные дни стали настоящим праздником для болельщиков, которые смогли лично поддержать свои любимые команды.
        </Paragraph>
        <Paragraph>
        - Два месяца напряжённой борьбы — каждая игра была наполнена эмоциями, драйвом и невероятными моментами.
        </Paragraph>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar shape='square' size={48} src="/images/icon026.png" />
        <Title level={3}>Что дальше?</Title>
        </div>
        <Paragraph>
        Киберлига EMCO.TECH.SPORTS уверенно развивается, укрепляя свои позиции как главная площадка для киберспорта на Сахалине. 
      🚀 ETL2 стал ещё одним шагом в этом направлении, доказав, что регион готов к большим свершениям. 
      Мы продолжаем работать над созданием новых возможностей для игроков, организацией масштабных турниров и развитием 
      киберспортивной инфраструктуры. Впереди — новые вызовы, яркие победы и проекты, которые сделают Сахалин 
      настоящей точкой притяжения для киберспортивного сообщества!
        </Paragraph>
        </Col>
      </Row>
      <Divider />
    </Card>
  );
};

export default Etl2FinalReport;
