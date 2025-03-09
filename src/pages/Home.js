import { Col, Layout, Row, Button } from "antd";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import ContentLink from "../components/base/ContentLink";
import TableCS2 from "../components/TableCS2";
import TableDOTA2 from "../components/TableDOTA2";
import LeagueSchedule from "../components/LeagueSchedule";
import DocumentsSection from "../components/base/DocumentsSection";
import NewsFeed from "../components/base/NewsFeed";

const Home = () => {
  const [activeTable, setActiveTable] = useState("CS2");
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Состояния для отображения секций
  const [showTables, setShowTables] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showNewsFeed, setShowNewsFeed] = useState(false);
  
  // Активная секция для мобильной версии
  const [activeSection, setActiveSection] = useState(null);
  
  // Состояние для отображения карточек
  const [showCards, setShowCards] = useState(true);

  // Состояния для текста кнопок
  const [tableButtonText, setTableButtonText] = useState("Посмотреть");
  const [scheduleButtonText, setScheduleButtonText] = useState("Посмотреть");
  const [documentsButtonText, setDocumentsButtonText] = useState("Посмотреть");
  const [newsButtonText, setNewsButtonText] = useState("Посмотреть");

  // Универсальный обработчик переключения секций
  const handleToggleSection = (section) => {
    if (isMobile) {
      // Если активна текущая секция и на нее нажали снова (скрыть)
      if (activeSection === section && showCards === false) {
        // Возвращаемся к показу всех карточек
        setActiveSection(null);
        setShowCards(true);
        
        // Скрываем контент
        setShowTables(false);
        setShowSchedule(false);
        setShowDocuments(false);
        setShowNewsFeed(false);
        
        // Сбрасываем тексты кнопок
        setTableButtonText("Посмотреть");
        setScheduleButtonText("Посмотреть");
        setDocumentsButtonText("Посмотреть");
        setNewsButtonText("Посмотреть");
        
        return;
      }
      
      // Активируем выбранную секцию, скрываем карточки
      setActiveSection(section);
      setShowCards(false);
      
      // Включаем только выбранную секцию
      setShowTables(section === 'tables');
      setShowSchedule(section === 'schedule');
      setShowDocuments(section === 'documents');
      setShowNewsFeed(section === 'newsfeed');
      
      // Обновляем тексты кнопок
      setTableButtonText(section === 'tables' ? "Вернуться назад" : "Посмотреть");
      setScheduleButtonText(section === 'schedule' ? "Вернуться назад" : "Посмотреть");
      setDocumentsButtonText(section === 'documents' ? "Вернуться назад" : "Посмотреть");
      setNewsButtonText(section === 'newsfeed' ? "Вернуться назад" : "Посмотреть");
    } else {
      // Десктопная логика - переключение без изменения активной секции
      switch(section) {
        case 'tables':
          setShowTables(!showTables);
          setTableButtonText(showTables ? "Посмотреть" : "Скрыть");
          break;
        case 'schedule':
          setShowSchedule(!showSchedule);
          setScheduleButtonText(showSchedule ? "Посмотреть" : "Скрыть");
          break;
        case 'documents':
          setShowDocuments(!showDocuments);
          setDocumentsButtonText(showDocuments ? "Посмотреть" : "Скрыть");
          break;
        case 'newsfeed':
          setShowNewsFeed(!showNewsFeed);
          setNewsButtonText(showNewsFeed ? "Посмотреть" : "Скрыть");
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <Layout>
        <Layout.Content style={{ padding: "10px", width: isMobile ? "97%" : "80%", margin: "0 auto" }}>
          <ContentLink
            onToggleTables={(section) => handleToggleSection(section || 'tables')}
            onToggleSchedule={(section) => handleToggleSection(section || 'schedule')}
            onToggleDocuments={(section) => handleToggleSection(section || 'documents')}
            onToggleNewsFeed={(section) => handleToggleSection(section || 'newsfeed')}
            tableButtonText={tableButtonText}
            scheduleButtonText={scheduleButtonText}
            documentsButtonText={documentsButtonText}
            newsButtonText={newsButtonText}
            activeSection={activeSection}
            showCards={showCards}
          />
        </Layout.Content>

        {showTables && (
          <Layout.Content style={{ padding: "5px 0px", width: "97%", margin: "0 auto" }}>
            {isMobile && !showCards && (
              <Button
                style={{ marginBottom: '10px', width: '100%' }}
                onClick={() => handleToggleSection('tables')}
              >
                &#8592; {tableButtonText}
              </Button>
            )}
            <Row
              gutter={[16, 16]}
              style={{ marginBottom: "20px", justifyContent: "center" }}
            >
              <Col span={6}>
                <Button
                  block
                  style={{
                    backgroundColor: activeTable === "CS2" ? "#FEA202" : "#f0f0f0",
                    borderColor: activeTable === "CS2" ? "#FEA202" : "#d9d9d9",
                  }}
                  onClick={() => setActiveTable("CS2")}
                >
                  {isMobile ? "CS 2" : "Рейтинговая таблица CS 2"}
                </Button>
              </Col>
              <Col span={6}>
                <Button
                  block
                  style={{
                    backgroundColor: activeTable === "DOTA2" ? "#FEA202" : "#f0f0f0",
                    borderColor: activeTable === "DOTA2" ? "#FEA202" : "#d9d9d9",
                  }}
                  onClick={() => setActiveTable("DOTA2")}
                >
                  {isMobile ? "DOTA 2" : "Рейтинговая таблица DOTA 2"}
                </Button>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col sm={24} xs={24} md={24} lg={24} style={{ padding: "0px 10px" }}>
                {activeTable === "CS2" && <TableCS2 />}
              </Col>
              <Col sm={24} xs={24} md={24} lg={24} style={{ padding: "0px 10px" }}>
                {activeTable === "DOTA2" && <TableDOTA2 />}
              </Col>
            </Row>
          </Layout.Content>
        )}
       </Layout>
        {showSchedule && (
          <Layout className="">
            <Layout.Content style={{ padding: "10px", width: isMobile ? "97%" : "80%", margin: "0 auto" }}>
              {isMobile && !showCards && (
                <Button
                  style={{ marginBottom: '10px', width: '100%' }}
                  onClick={() => handleToggleSection('schedule')}
                >
                  &#8592; {scheduleButtonText}
                </Button>
              )}
              <Row gutter={[16, 16]} className="">
                <Col xs={24} md={24} lg={24}>
                  <LeagueSchedule />
                </Col>
              </Row>
            </Layout.Content>
          </Layout>
        )}
        {showDocuments && (
          <Layout className="">
            <Layout.Content style={{ padding: "10px", width: isMobile ? "97%" : "80%", margin: "0 auto" }}>
              {isMobile && !showCards && (
                <Button
                  style={{ marginBottom: '10px', width: '100%' }}
                  onClick={() => handleToggleSection('documents')}
                >
                  &#8592; {documentsButtonText}
                </Button>
              )}
              <Row gutter={[16, 16]} className="">
                <Col xs={24} md={24} lg={24}>
                  <DocumentsSection />
                </Col>
              </Row>
            </Layout.Content>
          </Layout>
        )}
      {showNewsFeed && (
          <Layout>
            <Layout.Content style={{ padding: "10px", width: isMobile ? "97%" : "80%", margin: "0 auto" }}>
              {isMobile && !showCards && (
                <Button
                  style={{ marginBottom: '10px', width: '100%' }}
                  onClick={() => handleToggleSection('newsfeed')}
                >
                 &#8592; {newsButtonText}
                </Button>
              )}
              <Row gutter={[16, 16]} className="">
                <Col xs={24} md={24} lg={24}>
                  <NewsFeed />
                </Col>
              </Row>
            </Layout.Content>
          </Layout>
      )}
    </>
  );
};

export default Home;



// import { Col, Layout, Row, Button } from "antd";
// import React, { useState, useEffect } from "react";
// import ContentLink from "../components/ContentLink";
// import TableCS2 from "../components/TableCS2";
// import TableDOTA2 from "../components/TableDOTA2";
// import LeagueSchedule from "../components/LeagueSchedule";
// import DocumentsSection from "../components/DocumentsSection";
// import NewsFeed from "../components/NewsFeed";

// const Home = () => {
//   const [activeTable, setActiveTable] = useState("CS2");
//   const [isMobile, setIsMobile] = useState(false);

//   // Состояния для отображения секций
//   const [showTables, setShowTables] = useState(false);
//   const [showSchedule, setShowSchedule] = useState(false);
//   const [showDocuments, setShowDocuments] = useState(false);
//   const [showNewsFeed, setShowNewsFeed] = useState(false);

//   // Состояния для текста кнопок
//   const [tableButtonText, setTableButtonText] = useState("Посмотреть");
//   const [scheduleButtonText, setScheduleButtonText] = useState("Посмотреть");
//   const [documentsButtonText, setDocumentsButtonText] = useState("Посмотреть");
//   const [newsButtonText, setNewsButtonText] = useState("Посмотреть");

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Обработчики для каждой секции
//   const handleToggleTables = () => {
//     setShowTables(!showTables);
//     setTableButtonText(showTables ? "Посмотреть" : "Скрыть");
//   };

//   const handleToggleSchedule = () => {
//     setShowSchedule(!showSchedule);
//     setScheduleButtonText(showSchedule ? "Посмотреть" : "Скрыть");
//   };

//   const handleToggleDocuments = () => {
//     setShowDocuments(!showDocuments);
//     setDocumentsButtonText(showDocuments ? "Посмотреть" : "Скрыть");
//   };

//   const handleToggleNewsFeed = () => {
//     setShowNewsFeed(!showNewsFeed);
//     setNewsButtonText(showNewsFeed ? "Посмотреть" : "Скрыть")
//   }

//   return (
//     <>
//       <Layout>
//         <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
//           <ContentLink
//             onToggleTables={handleToggleTables}
//             onToggleSchedule={handleToggleSchedule}
//             onToggleDocuments={handleToggleDocuments}
//             onToggleNewsFeed={handleToggleNewsFeed}
//             tableButtonText={tableButtonText}
//             scheduleButtonText={scheduleButtonText}
//             documentsButtonText={documentsButtonText}
//             newsButtonText={newsButtonText}
//           />
//         </Layout.Content>

//         {showTables && (
//           <Layout.Content style={{ padding: "5px 0px", width: "97%", margin: "0 auto" }}>
//             <Row
//               gutter={[16, 16]}
//               style={{ marginBottom: "20px", justifyContent: "center" }}
//             >
//               <Col span={6}>
//                 <Button
//                   block
//                   style={{
//                     backgroundColor: activeTable === "CS2" ? "#FEA202" : "#f0f0f0",
//                     borderColor: activeTable === "CS2" ? "#FEA202" : "#d9d9d9",
//                   }}
//                   onClick={() => setActiveTable("CS2")}
//                 >
//                   {isMobile ? "CS 2" : "Рейтинговая таблица CS 2"}
//                 </Button>
//               </Col>
//               <Col span={6}>
//                 <Button
//                   block
//                   style={{
//                     backgroundColor: activeTable === "DOTA2" ? "#FEA202" : "#f0f0f0",
//                     borderColor: activeTable === "DOTA2" ? "#FEA202" : "#d9d9d9",
//                   }}
//                   onClick={() => setActiveTable("DOTA2")}
//                 >
//                   {isMobile ? "DOTA 2" : "Рейтинговая таблица DOTA 2"}
//                 </Button>
//               </Col>
//             </Row>

//             <Row gutter={[16, 16]}>
//               <Col sm={24} xs={24} md={24} lg={24} style={{ padding: "0px 10px" }}>
//                 {activeTable === "CS2" && <TableCS2 />}
//               </Col>
//               <Col sm={24} xs={24} md={24} lg={24} style={{ padding: "0px 10px" }}>
//                 {activeTable === "DOTA2" && <TableDOTA2 />}
//               </Col>
//             </Row>
//           </Layout.Content>
//         )}
//        </Layout>
//         {showSchedule && (
//           <Layout className="">
//             <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
//               <Row gutter={[16, 16]} className="">
//                 <Col xs={24} md={24} lg={24}>
//                   <LeagueSchedule />
//                 </Col>
//               </Row>
//             </Layout.Content>
//           </Layout>
//         )}
//         {showDocuments && (
//           <Layout className="">
//             <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
//               <Row gutter={[16, 16]} className="">
//                 <Col xs={24} md={24} lg={24}>
//                   <DocumentsSection />
//                 </Col>
//               </Row>
//             </Layout.Content>
//           </Layout>
//         )}
//       {showNewsFeed && (
//           <Layout>
//             <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
//               <Row gutter={[16, 16]} className="">
//                 <Col xs={24} md={24} lg={24}>
//                   <NewsFeed />
//                 </Col>
//               </Row>
//             </Layout.Content>
//           </Layout>
//       )}
//     </>
//   );
// };

// export default Home;