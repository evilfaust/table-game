import { Col, Layout, Row, Button } from "antd";
import React, { useState, useEffect } from "react";
import ContentLink from "../components/ContentLink";
import TableCS2 from "../components/TableCS2";
import TableDOTA2 from "../components/TableDOTA2";
import LeagueSchedule from "../components/LeagueSchedule";
import DocumentsSection from "../components/DocumentsSection";

const Home = () => {
  const [activeTable, setActiveTable] = useState("CS2");
  const [isMobile, setIsMobile] = useState(false);

  // Состояния для отображения секций
  const [showTables, setShowTables] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  // Состояния для текста кнопок
  const [tableButtonText, setTableButtonText] = useState("Посмотреть");
  const [scheduleButtonText, setScheduleButtonText] = useState("Посмотреть");
  const [documentsButtonText, setDocumentsButtonText] = useState("Посмотреть");

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

  return (
    <>
      <Layout>
        <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
          <ContentLink
            onToggleTables={handleToggleTables}
            onToggleSchedule={handleToggleSchedule}
            onToggleDocuments={handleToggleDocuments}
            tableButtonText={tableButtonText}
            scheduleButtonText={scheduleButtonText}
            documentsButtonText={documentsButtonText}
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
                  {isMobile ? "CS 2" : "Турнирная таблица CS 2"}
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
                  {isMobile ? "DOTA 2" : "Турнирная таблица DOTA 2"}
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
        {(showTables || showDocuments) && (
                    <Layout className="docbackground">
                      <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
                        <Row gutter={[16, 16]}>
                          {showSchedule && (
                              <Col xs={24} md={12} lg={12}>
                              <LeagueSchedule />
                            </Col>
                          )}
                          {showDocuments && (
                              <Col xs={24} md={12} lg={12}>
                              <DocumentsSection />
                            </Col>
                          )}
                        </Row>
                      </Layout.Content>
                    </Layout>
        )}

        {/*{showSchedule && (*/}
        {/*  <Layout className="docbackground">*/}
        {/*    <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>*/}
        {/*      <Row gutter={[16, 16]} className="">*/}
        {/*        <Col xs={24} md={12} lg={12}>*/}
        {/*          <LeagueSchedule />*/}
        {/*        </Col>*/}
        {/*      </Row>*/}
        {/*    </Layout.Content>*/}
        {/*  </Layout>*/}
        {/*)}*/}

        {/*{showDocuments && (*/}
        {/*  <Layout className="docbackground">*/}
        {/*    <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>*/}
        {/*      <Row gutter={[16, 16]} className="">*/}
        {/*        <Col xs={24} md={12} lg={12}>*/}
        {/*          <DocumentsSection />*/}
        {/*        </Col>*/}
        {/*      </Row>*/}
        {/*    </Layout.Content>*/}
        {/*  </Layout>*/}
        {/*)}*/}
      </Layout>
    </>
  );
};

export default Home;