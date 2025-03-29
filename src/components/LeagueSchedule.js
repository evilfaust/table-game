import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Avatar, Spin, message } from 'antd';
import pb from '../pb'; // Замените './pb' на актуальный путь к файлу с коннектором

const { Title } = Typography;

const LeagueSchedule = () => {
  const [scheduleItems, setScheduleItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // Получаем список элементов коллекции LeagueSchedule, сортируя по полю order
        const result = await pb.collection('LeagueSchedule').getList(1, 30, {
          sort: 'order'
        });
        setScheduleItems(result.items);
      } catch (error) {
        console.error('Ошибка при загрузке расписания:', error);
        message.error('Не удалось загрузить расписание');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <Row justify="center" style={{ marginTop: 50 }}>
        <Spin size="large" />
      </Row>
    );
  }

  return (
    <>
      {/* Заголовок расписания */}
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: 'center', marginBottom: 16 }}>
          <Title level={2}>Календарь проведения соревнований</Title>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {scheduleItems.map((item) => (
          <Col key={item.id} lg={12} md={12} xs={24}>
            <Card>
              <Card.Meta
                avatar={<Avatar shape="square" size={64} src={item.count} />}
                title={item.date}
                description={<p>{item.event}</p>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default LeagueSchedule;


// import React from 'react';
// import {Row, Col, Typography, Card, Avatar} from 'antd';
//
// const { Title } = Typography;
// // const { Meta } = Card;
// // Компонент расписания лиги
// const LeagueSchedule = () => {
//   const scheduleItems = [
//     {
//       date: '1 февраля – 1 марта',
//       event: 'Регистрация участников',
//       count: '/images/count01.png'
//     },
//     {
//       date: '3 марта – 31 марта',
//       event: 'Первый этап лиги',
//       count: '/images/count02.png'
//     },
//     {
//       date: '1 апреля – 30 апреля',
//       event: 'Заключительный этап лиги',
//       count: '/images/count03.png'
//     },
//       {
//       date: '1 мая',
//       event: 'Подведение итогов Лиги',
//       count: '/images/count04.png'
//     },
//   ];
//
//   return (
//     <>
//       {/* Заголовок расписания */}
//       <Row gutter={[16, 16]}>
//         <Col lg={24} xs={24} style={{ textAlign: 'center', marginBottom: 16 }}>
//           <Title level={2}>Календарь проведения соревнований</Title>
//         </Col>
//       </Row>
//
//       <Row gutter={[16, 16]}>
//         {scheduleItems.map((item, index) => (
//         <Col lg={12} md={12} xs={24} key={index}>
//           <Card >
//             <Card.Meta
//               avatar={<Avatar shape="square" size={64} src={item.count} />}
//               title={item.date}
//               description={
//                 <>
//                   <p>{item.event}</p>
//                 </>
//               }
//             />
//           </Card>
//         </Col>
//             ))}
//       </Row>
//     </>
//   );
// };
//
// export default LeagueSchedule;