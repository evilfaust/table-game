import React from 'react';
import { Typography, Card, Avatar, Row, Col, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const Etl4FinalReport = () => {
  return (
    <Card style={{ maxWidth: "90%", margin: '0 auto', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar size={48} shape='square' src="/images/icon025.png" />
        <Title level={2} style={{textAlign: "center"}}>Финал киберспортивного турнира ETL 4: борьба за чемпионство</Title>
        </div>
        <Row gutter={[16, 16]}>
            
            <Col lg={16} md={24} xs={24} sm={24}>
            <Paragraph>
            На Сахалине завершился финал четвертого сезона киберспортивной лиги EMCO.TECH.SPORTS, который стал настоящим праздником для игроков 
            и зрителей. Это второй очный турнир, организованный лигой, и он продемонстрировал, насколько стремительно развивается киберспорт в регионе.
            </Paragraph>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar shape='square' size={48} src="/images/icon020.png" />
            <Title level={3}>Жаркие сражения и неожиданные повороты</Title>
            </div>
            <Paragraph>
            В этом сезоне участие приняли 72 команды, но лишь 6 лучших (по две в каждой дисциплине) пробились в финал. Состязания проходили
            в трех популярных дисциплинах: DOTA 2, Counter-Strike 2 и Valorant.
            </Paragraph>
            <Paragraph>
            В DOTA 2 чемпионом стала команда LFY, которая уверенно прошла весь турнир без единого поражения. В дисциплине Counter-Strike 2 
            главной сенсацией стали Octo Gaming, полностью обновившие состав и сумевшие одолеть Mirai Ultimate в напряженном финальном матче. 
            В Valorant чемпионство также завоевали игроки Octo Gaming.
            </Paragraph>
            </Col>
            <Col lg={8} md={24} xs={24} sm={24}>
            <img style={{width: "100%", borderRadius: "10px"}} src="https://emcotech.site/img/etl4/0p2a4591.jpg" alt="EMCO.TECH.SPORTS" />
            <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
            </Col>
        </Row>
        <Divider />
      <Row gutter={[16, 16]}>
        <Col lg={8} md={24} xs={24} sm={24}>
        <img style={{width: "100%", borderRadius: "10px"}} src="https://emcotech.site/img/etl4/0p2a4909.jpg" alt="EMCO.TECH.SPORTS" />
        <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
        </Col>
        <Col lg={16} md={24} xs={24} sm={24}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar shape='square' size={48} src="/images/icon025.png" />
        <Title level={3}>Турнир как праздник</Title>
        
        </div>
        
        <Paragraph>
        Турнир собрал около 300 гостей, и организаторы позаботились о насыщенной программе. Пока участники ожидали своих матчей, зрители 
        могли поучаствовать в мини-турнирах на PS5 (UFC5 и FC24), попробовать VR-игры или сразиться на ретро-консолях в легендарные "Танчики" и Subway Surfers.
        </Paragraph>
        <Paragraph>
        Победителей ждали ценные призы, включая топовое игровое кресло и монитор с частотой 240 Гц. А чемпионы и серебряные призеры турнира 
        получили денежные призы. Общий призовой фонд от Восточной горнорудной компании составил более 200 тысяч рублей.
        </Paragraph>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar shape='square' size={48} src="/images/icon026.png" />
        <Title level={3}>Развитие киберспорта в регионе</Title>
        
        </div>
        <Paragraph>
        Как отметил руководитель детского технопарка EMCO TECH и основатель лиги Олег Павлюченко, интерес к киберспорту на Сахалине продолжает расти. 
        Если в первом сезоне лиги участвовало всего 23 команды, то сейчас их 72, а игроки приезжают со всего региона — от Корсаково до Охи. Более того, 
        если раньше в турнире участвовали только школьники, то теперь в него включились и студенты.
        </Paragraph>
        <Paragraph>
        Министр образования Сахалинской области Анастасия Киктева подчеркнула, что киберлига EMCO.TECH.SPORTS выводит киберспортивные события на уровень 
        профессиональных чемпионатов, и уже весной планируется совместный фиджитал-турнир с Сахалинским государственным университетом.
        </Paragraph>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col lg={10} md={10} xs={24} sm={24}>
        <Title level={3}>Благодарности партнерам</Title>
        <Paragraph>
        Организаторы выражают благодарность партнерам, которые поддержали турнир:
        </Paragraph>
        <ul>
            <li>Министерство образования и Министерство спорта Сахалинской области</li>
            <li>Центр спортивной подготовки (ЦСП)</li>
            <li>Федерация компьютерного спорта России (ФКС Сахалинского отделения)</li>
            <li>Сети компьютерных клубов MIRAI и CyberX</li>
            <li>Сеть магазинов Домотехника</li>
            <li>Логистическая компания Delta</li>
            <li>Клуб виртуальной реальности Warpoint</li>
            <li>Пиццерия "Сказка"</li>
        </ul>
        </Col>
        <Col lg={14} md={24} xs={24} sm={24}>
        <img style={{width: "80%"}} src="/images/partneri.png" alt="EMCO.TECH.SPORTS" />
        </Col>
      </Row>

      <Divider />
      <Title level={3}>Вперед к новым высотам!</Title>
      <Paragraph>
       С каждым сезоном киберспортивная лига EMCO.TECH.SPORTS продолжает развиваться, привлекая все больше 
       игроков и зрителей. Следующий шаг — расширение географии турниров на Дальний Восток и повышение уровня 
       подготовки участников.
      </Paragraph>
      <Paragraph>
        Следите за новостями и становитесь частью киберспортивного движения вместе с EMCO.TECH.SPORTS!
      </Paragraph>
      <Paragraph>
        Турнир стал значимым шагом в развитии киберспорта в регионе. Как отметил Олег Павлюченко, 
        организатор и руководитель EMCO TECH, лига продолжит расширяться, охватывая новые регионы и привлекая больше участников.
      </Paragraph>
    </Card>
  );
};

export default Etl4FinalReport;
