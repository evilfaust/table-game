import React from 'react';
import { Typography, Card, Avatar, Row, Col, Divider } from 'antd';
import { useMediaQuery } from 'react-responsive';

const { Title, Paragraph } = Typography;

const Etl3FinalReport = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Card style={{ maxWidth: "90%", margin: '0 auto', padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isMobile ? 'column' : 'row', textAlign: isMobile ? 'center' : 'left' }}>
        <Avatar size={48} shape='square' src="/images/icon025.png" style={{ objectFit: 'contain', display: 'block' }} />
        <Title level={2}>🎮 ФИНАЛ КИБЕРСПОРТИВНОГО ТУРНИРА ETL3: САХАЛИНСКИЕ КОМАНДЫ В ЦЕНТРЕ ВНИМАНИЯ! 🎮</Title>
        </div>
        <Row gutter={[16, 16]}>
            <Col lg={16} md={24} xs={24} sm={24}>
            <Paragraph>
            16 мая 2024 года завершился весенний чемпионат ETL 3, который прошёл полностью в онлайн-формате.
            Это был настоящий праздник для фанатов киберспорта: 64 команды сразились в двух дисциплинах — Counter-Strike 2 и DOTA 2. Итоги турнира впечатляют!
            </Paragraph>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isMobile ? 'column' : 'row', textAlign: isMobile ? 'center' : 'left' }}>
            <Avatar shape='square' size={48} src="/images/icon028.png" style={{ objectFit: 'contain', display: 'block' }} />
            <Title level={3}>DOTA 2: Team Spirit из Южно-Сахалинска — непобедимые чемпионы!</Title>
            </div>
            <Paragraph>
              Команда Team Spirit из Южно-Сахалинска показала феноменальную игру, пройдя весь турнир без
              единого поражения! 🏆 Их стратегии, координация и мастерство оставили соперников без шансов.
              Это настоящий триумф сахалинского киберспорта!
            </Paragraph>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isMobile ? 'column' : 'row', textAlign: isMobile ? 'center' : 'left' }}>
            <Avatar shape='square' size={48} src="/images/icon035.png" style={{ objectFit: 'contain', display: 'block' }} />
            <Title level={3}>Counter-Strike 2: MIRAI Ultimate — безоговорочные лидеры!</Title>
            </div>
            <Paragraph>
              В дисциплине Counter-Strike 2 команда MIRAI Ultimate из областного центра также не оставила
              соперникам ни единого шанса, одержав победу во всех матчах. 💥 Их точность, тактика и командная работа заслуживают аплодисментов!
            </Paragraph>
            </Col>
            <Col lg={8} md={24} xs={24} sm={24}>
            <img style={{width: "100%", borderRadius: "10px"}} src="/images/ETL-3.png" alt="EMCO.TECH.SPORTS" />
            <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
            </Col>
        </Row>
        <Divider />
      <Row gutter={[16, 16]}>
        <Col lg={8} md={24} xs={24} sm={24}>
        <img style={{width: "100%", borderRadius: "10px"}} src="https://emcotech.site/assets/gall/final2024/exibid-photo-2024-02-15-18-43-12.jpg" alt="EMCO.TECH.SPORTS" />
        <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
        </Col>
        <Col lg={16} md={24} xs={24} sm={24}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isMobile ? 'column' : 'row', textAlign: isMobile ? 'center' : 'left' }}>
        <Avatar shape='square' size={48} src="/images/icon025.png" style={{ objectFit: 'contain', display: 'block' }} />
        <Title level={3}>Гости с материка: 322 team из Калуги</Title>
        </div>
        <Paragraph>
            Турнир ETL 3 впервые привлёк команду с материка — 322 team из Калуги. Ребята достойно прошли
            групповой этап, но выбыли на 3-м раунде нижней сетки. Их участие стало важным шагом к укреплению связей между регионами. 🌏
        </Paragraph>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexDirection: isMobile ? 'column' : 'row', textAlign: isMobile ? 'center' : 'left' }}>
        <Avatar shape='square' size={48} src="/images/icon031.png" style={{ objectFit: 'contain', display: 'block' }} />
        <Title level={3}>Что дальше?</Title>
        </div>
        <Paragraph>
        ETL 3 доказал, что Сахалин — это не только край света, но и центр киберспортивных амбиций!
        🚀 Мы благодарим всех участников, зрителей и организаторов за невероятные эмоции и ждём новых турниров, где сахалинские команды продолжат покорять вершины!
        </Paragraph>
        </Col>
      </Row>
      <Divider />
    </Card>
  );
};

export default Etl3FinalReport;


// import React from 'react';
// import { Typography, Card, Avatar, Row, Col, Divider } from 'antd';
//
// const { Title, Paragraph } = Typography;
//
// const Etl3FinalReport = () => {
//   return (
//     <Card style={{ maxWidth: "90%", margin: '0 auto', padding: 20 }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//         {/* <Avatar size={48} shape='square' src="/images/icon025.png" style={{ objectFit: 'contain', display: 'block' }} /> */}
//         <Title level={2} style={{textAlign: "center"}}>🎮 ФИНАЛ КИБЕРСПОРТИВНОГО ТУРНИРА ETL3: САХАЛИНСКИЕ КОМАНДЫ В ЦЕНТРЕ ВНИМАНИЯ! 🎮</Title>
//         </div>
//         <Row gutter={[16, 16]}>
//             <Col lg={16} md={24} xs={24} sm={24}>
//             <Paragraph>
//             16 мая 2024 года завершился весенний чемпионат ETL 3, который прошёл полностью в онлайн-формате.
//             Это был настоящий праздник для фанатов киберспорта: 64 команды сразились в двух дисциплинах — Counter-Strike 2 и DOTA 2. Итоги турнира впечатляют!
//             </Paragraph>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <Avatar shape='square' size={48} src="/images/icon028.png" style={{ objectFit: 'contain', display: 'block' }} />
//             <Title level={3}>DOTA 2: Team Spirit из Южно-Сахалинска — непобедимые чемпионы!</Title>
//             </div>
//             <Paragraph>
//               Команда Team Spirit из Южно-Сахалинска показала феноменальную игру, пройдя весь турнир без
//               единого поражения! 🏆 Их стратегии, координация и мастерство оставили соперников без шансов.
//               Это настоящий триумф сахалинского киберспорта!
//             </Paragraph>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <Avatar shape='square' size={48} src="/images/icon035.png" style={{ objectFit: 'contain', display: 'block' }} />
//             <Title level={3}>Counter-Strike 2: MIRAI Ultimate — безоговорочные лидеры!</Title>
//             </div>
//             <Paragraph>
//               В дисциплине Counter-Strike 2 команда MIRAI Ultimate из областного центра также не оставила
//               соперникам ни единого шанса, одержав победу во всех матчах. 💥 Их точность, тактика и командная работа заслуживают аплодисментов!
//             </Paragraph>
//             </Col>
//             <Col lg={8} md={24} xs={24} sm={24}>
//             <img style={{width: "100%", borderRadius: "10px"}} src="/images/ETL-3.png" alt="EMCO.TECH.SPORTS" />
//             <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
//             </Col>
//         </Row>
//         <Divider />
//       <Row gutter={[16, 16]}>
//         <Col lg={8} md={24} xs={24} sm={24}>
//         <img style={{width: "100%", borderRadius: "10px"}} src="https://emcotech.site/assets/gall/final2024/exibid-photo-2024-02-15-18-43-12.jpg" alt="EMCO.TECH.SPORTS" />
//         <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
//         </Col>
//         <Col lg={16} md={24} xs={24} sm={24}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//         <Avatar shape='square' size={48} src="/images/icon025.png" style={{ objectFit: 'contain', display: 'block' }} />
//         <Title level={3}>Гости с материка: 322 team из Калуги</Title>
//         </div>
//         <Paragraph>
//             Турнир ETL 3 впервые привлёк команду с материка — 322 team из Калуги. Ребята достойно прошли
//             групповой этап, но выбыли на 3-м раунде нижней сетки. Их участие стало важным шагом к укреплению связей между регионами. 🌏
//         </Paragraph>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//         <Avatar shape='square' size={48} src="/images/icon026.png" style={{ objectFit: 'contain', display: 'block' }} />
//         <Title level={3}>Что дальше?</Title>
//         </div>
//         <Paragraph>
//         ETL 3 доказал, что Сахалин — это не только край света, но и центр киберспортивных амбиций!
//         🚀 Мы благодарим всех участников, зрителей и организаторов за невероятные эмоции и ждём новых турниров, где сахалинские команды продолжат покорять вершины!
//         </Paragraph>
//         </Col>
//       </Row>
//       <Divider />
//     </Card>
//   );
// };
//
// export default Etl3FinalReport;


// import React from 'react';
// import { Typography, Card, Avatar, Row, Col, Divider } from 'antd';
//
// const { Title, Paragraph } = Typography;
//
// const Etl3FinalReport = () => {
//   return (
//     <Card style={{ maxWidth: "90%", margin: '0 auto', padding: 20 }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//         {/* <Avatar size={48} shape='square' src="/images/icon025.png" /> */}
//         <Title level={2} style={{textAlign: "center"}}>🎮 ФИНАЛ КИБЕРСПОРТИВНОГО ТУРНИРА ETL3: САХАЛИНСКИЕ КОМАНДЫ В ЦЕНТРЕ ВНИМАНИЯ! 🎮</Title>
//         </div>
//         <Row gutter={[16, 16]}>
//             <Col lg={16} md={24} xs={24} sm={24}>
//             <Paragraph>
//             16 мая 2024 года завершился весенний чемпионат ETL 3, который прошёл полностью в онлайн-формате.
//             Это был настоящий праздник для фанатов киберспорта: 64 команды сразились в двух дисциплинах — Counter-Strike 2 и DOTA 2. Итоги турнира впечатляют!
//             </Paragraph>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <Avatar shape='square' size={48} src="/images/icon028.png" />
//             <Title level={3}>DOTA 2: Team Spirit из Южно-Сахалинска — непобедимые чемпионы!</Title>
//             </div>
//             <Paragraph>
//               Команда Team Spirit из Южно-Сахалинска показала феноменальную игру, пройдя весь турнир без
//               единого поражения! 🏆 Их стратегии, координация и мастерство оставили соперников без шансов.
//               Это настоящий триумф сахалинского киберспорта!
//             </Paragraph>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//             <Avatar shape='square' size={48} src="/images/icon035.png" />
//             <Title level={3}>Counter-Strike 2: MIRAI Ultimate — безоговорочные лидеры!</Title>
//             </div>
//             <Paragraph>
//               В дисциплине Counter-Strike 2 команда MIRAI Ultimate из областного центра также не оставила
//               соперникам ни единого шанса, одержав победу во всех матчах. 💥 Их точность, тактика и командная работа заслуживают аплодисментов!
//             </Paragraph>
//             </Col>
//             <Col lg={8} md={24} xs={24} sm={24}>
//             <img style={{width: "100%", borderRadius: "10px"}} src="/images/ETL-3.png" alt="EMCO.TECH.SPORTS" />
//             <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
//             </Col>
//         </Row>
//         <Divider />
//       <Row gutter={[16, 16]}>
//         <Col lg={8} md={24} xs={24} sm={24}>
//         <img style={{width: "100%", borderRadius: "10px"}} src="https://emcotech.site/assets/gall/final2024/exibid-photo-2024-02-15-18-43-12.jpg" alt="EMCO.TECH.SPORTS" />
//         <img className="bottomleft" style={{height: "24px"}} src="/images/esl-logo.png" alt="EMCO.TECH.SPORTS" />
//         </Col>
//         <Col lg={16} md={24} xs={24} sm={24}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//         <Avatar shape='square' size={48} src="/images/icon025.png" />
//         <Title level={3}>Гости с материка: 322 team из Калуги</Title>
//         </div>
//         <Paragraph>
//             Турнир ETL 3 впервые привлёк команду с материка — 322 team из Калуги. Ребята достойно прошли
//             групповой этап, но выбыли на 3-м раунде нижней сетки. Их участие стало важным шагом к укреплению связей между регионами. 🌏
//         </Paragraph>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//         <Avatar shape='square' size={48} src="/images/icon026.png" />
//         <Title level={3}>Что дальше?</Title>
//         </div>
//         <Paragraph>
//         ETL 3 доказал, что Сахалин — это не только край света, но и центр киберспортивных амбиций!
//         🚀 Мы благодарим всех участников, зрителей и организаторов за невероятные эмоции и ждём новых турниров, где сахалинские команды продолжат покорять вершины!
//         </Paragraph>
//         </Col>
//       </Row>
//       <Divider />
//     </Card>
//   );
// };
//
// export default Etl3FinalReport;
