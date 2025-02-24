import React from "react";
import {Row, Col, Button, Typography, Card, Avatar} from "antd";
import { RocketOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import {Link} from "react-router-dom";

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Row align="middle" justify="center" gutter={[16, 16]}>
        <Col xs={24} lg={12} className="hero-3-img">
          <img src="/images/head-to-site.png" alt="EMCO.TECH.SPORTS" />
        </Col>
        <Col xs={24} lg={12}>
          <Card className="hero-card text-left" bordered={false}>
            <div className="badge text-white">
              <RocketOutlined className="icon"/> Киберспорт это спорт
            </div>
            <Title level={3} className="text-white">
              КИБЕР-СПОРТИВНАЯ <span className="highlight">ЛИГА</span>
            </Title>
            <div style={{ justifyContent: "center" }}>
              <Avatar shape="square" size={64} src="/images/icon001.png" style={{ marginRight: "5px" }}/>
              <Avatar shape="square" size={64} src="/images/icon002.png" style={{ marginRight: "5px" }}/>
              <Avatar shape="square" size={64} src="/images/icon003.png" style={{ marginRight: "5px" }}/>
              <Avatar shape="square" size={64} src="/images/icon004.png" style={{ marginRight: "5px" }}/>
            </div>
            <Title level={2} className="hero-title-game text-white">
              EMCO.TECH<span className="highlight">.SPORTS</span>
            </Title>
            <Paragraph className="text-white">
              Дисциплины: DOTA 2, CS2
            </Paragraph>
            <Title level={3} className="text-center">
              <span className="highlight">РЕГИСТРАЦИЯ</span>
            </Title>
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={12}>
                <Button
                    block
                    variant="solid"
                    href="https://forms.yandex.ru/cloud/67b02371f47e73d61ea520c8/"
                    style={{backgroundColor: "#FEA202"}}
                    color="#FEA202"
                >
                  DOTA 2
                </Button>
              </Col>
              <Col xs={24} sm={12}>
                <Button
                    block
                    variant="solid"
                    href="https://forms.yandex.ru/cloud/67b01cfb02848fd446b03ba8/"
                    color="#FEA202"
                    style={{backgroundColor: "#FEA202"}}
                >
                  CS 2
                </Button>
              </Col>
            </Row>
            <Paragraph className="registration-deadline">
              Регистрация доступна до <span className="highlight">1 марта включительно</span>
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default HeroSection;
