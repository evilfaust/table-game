import { Col, Layout, Row, Button } from "antd";
import React, { useState, useEffect } from "react";
import ContentLink from "../components/ContentLink";
import TableCS2 from "../components/TableCS2";
import TableDOTA2 from "../components/TableDOTA2";
import LeagueSchedule from "../components/LeagueSchedule";
import DocumentsSection from "../components/DocumentsSection";
import NewsFeed from "../components/NewsFeed";

const Home = () => {
  const [activeTable, setActiveTable] = useState("CS2");
  const [isMobile, setIsMobile] = useState(false);

  // Состояния для отображения секций
  const [showTables, setShowTables] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showNewsFeed, setShowNewsFeed] = useState(false);

  // Состояния для текста кнопок
  const [tableButtonText, setTableButtonText] = useState("Посмотреть");
  const [scheduleButtonText, setScheduleButtonText] = useState("Посмотреть");
  const [documentsButtonText, setDocumentsButtonText] = useState("Посмотреть");
  const [newsButtonText, setNewsButtonText] = useState("Посмотреть");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Обработчики для каждой секции
  const handleToggleTables = () => {
    setShowTables(!showTables);
    setTableButtonText(showTables ? "Посмотреть" : "Скрыть");
  };

  const handleToggleSchedule = () => {
    setShowSchedule(!showSchedule);
    setScheduleButtonText(showSchedule ? "Посмотреть" : "Скрыть");
  };

  const handleToggleDocuments = () => {
    setShowDocuments(!showDocuments);
    setDocumentsButtonText(showDocuments ? "Посмотреть" : "Скрыть");
  };

  const handleToggleNewsFeed = () => {
    setShowNewsFeed(!showNewsFeed);
    setNewsButtonText(showNewsFeed ? "Посмотреть" : "Скрыть")
  }

  return (
    <>
      <Layout>
        <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
          <ContentLink
            onToggleTables={handleToggleTables}
            onToggleSchedule={handleToggleSchedule}
            onToggleDocuments={handleToggleDocuments}
            onToggleNewsFeed={handleToggleNewsFeed}
            tableButtonText={tableButtonText}
            scheduleButtonText={scheduleButtonText}
            documentsButtonText={documentsButtonText}
            newsButtonText={newsButtonText}
          />
        </Layout.Content>

        {showTables && (
          <Layout.Content style={{ padding: "5px 0px", width: "97%", margin: "0 auto" }}>
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
            <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
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
            <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
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
            <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
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