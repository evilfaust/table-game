import { Col, Layout, Row, Button } from "antd";
import React, { useState, useEffect } from "react";
import EsportAbout from "../components/EsportAbout";
import TableCS2 from "../components/TableCS2";
import TableDOTA2 from "../components/TableDOTA2";

const Home = () => {
  const [activeTable, setActiveTable] = useState("CS2");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Функция для проверки ширины экрана
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Если ширина экрана <= 768px, то это мобильное устройство
    };

    // Инициализация при монтировании компонента
    handleResize();

    // Обработчик изменения размера экрана
    window.addEventListener("resize", handleResize);

    // Очистка обработчика при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Layout>
        <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
          <EsportAbout />
        </Layout.Content>

        <Layout.Content style={{ padding: "5px 0px", width: "97%", margin: "0 auto" }}>
          <Row
            gutter={[16, 16]}
            style={{ marginBottom: "20px", justifyContent: "center" }}
          >
            <Col span={8}>
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
            <Col span={8}>
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
      </Layout>
    </>
  );
};

export default Home;





// import {Col, Layout, Row} from "antd";
// // import Navbar from "../components/Navbar";
// // import HeroSection from "../components/HeroSection";
// import EsportAbout from "../components/EsportAbout";
// import TableCS2 from "../components/TableCS2";
// import TableDOTA2 from "../components/TableDOTA2";
// // import Gallery from "../components/GalleryETL4";
// import React from "react";
//
// const Home = () => {
//     return (
//         <>
//             <Layout>
//               {/*<Navbar />*/}
//               {/*<HeroSection />*/}
//               <Layout.Content style={{
//                 padding: "10px",
//                 width: "80%",
//                 margin: "0 auto"
//               }}>
//               <EsportAbout />
//               </Layout.Content>
//               <Layout.Content style={{
//                 padding: "5px 0px",
//                 width: "97%",
//                 margin: "0 auto"
//               }}>
//                 {/* <Divider style={{ margin: '2px 0' }} /> */}
//                 <Row gutten={[16, 16]}>
//                   <Col sm={24} xs={24}  md={24} lg={12} style={{padding: "0px 10px"}}>
//                     <TableCS2 />
//                   </Col>
//                   <Col sm={24} xs={24}  md={24} lg={12} style={{padding: "0px 10px"}}>
//                     <TableDOTA2 />
//                   </Col>
//                 </Row>
//                 {/* <App /> */}
//               </Layout.Content>
//               {/*  <Layout.Content style={{}}>*/}
//               {/*    <Gallery />*/}
//               {/*</Layout.Content>*/}
//             </Layout>
//         </>
//     )
// }
//
// export default Home