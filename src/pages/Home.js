import {Col, Layout, Row} from "antd";
// import Navbar from "../components/Navbar";
// import HeroSection from "../components/HeroSection";
import EsportAbout from "../components/EsportAbout";
import TableCS2 from "../components/TableCS2";
import TableDOTA2 from "../components/TableDOTA2";
// import Gallery from "../components/GalleryETL4";
import React from "react";


const Home = () => {



    return (
        <>
            <Layout>
              {/*<Navbar />*/}
              {/*<HeroSection />*/}
              <Layout.Content style={{
                padding: "10px",
                width: "80%",
                margin: "0 auto"
              }}>
              <EsportAbout />
              </Layout.Content>
              <Layout.Content style={{
                padding: "5px 0px",
                width: "97%",
                margin: "0 auto"
              }}>
                {/* <Divider style={{ margin: '2px 0' }} /> */}
                <Row gutten={[16, 16]}>
                  <Col sm={24} xs={24}  md={24} lg={12} style={{padding: "0px 10px"}}>
                    <TableCS2 />
                  </Col>
                  <Col sm={24} xs={24}  md={24} lg={12} style={{padding: "0px 10px"}}>
                    <TableDOTA2 />
                  </Col>
                </Row>
                {/* <App /> */}
              </Layout.Content>
              {/*  <Layout.Content style={{}}>*/}
              {/*    <Gallery />*/}
              {/*</Layout.Content>*/}
            </Layout>
        </>
    )
}

export default Home