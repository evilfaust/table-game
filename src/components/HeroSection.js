import React from "react";
import { Row, Col, Button, Typography, Card } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Row align="middle" justify="center" gutter={[32, 32]}>
        <Col xs={24} lg={10} className="hero-3-img">
          <img src="/assets/esl-react/build/images/head-to-site.png" alt="EMCO.TECH.SPORTS" />
        </Col>
        <Col xs={24} lg={14}>
          <Card className="hero-card text-left" bordered={false}>
            <div className="badge text-white">
              <RocketOutlined className="icon" /> Киберспорт это спорт
            </div>
            <Title level={3} className="text-white">
              КИБЕР-СПОРТИВНАЯ <span className="highlight">ЛИГА</span>
            </Title>
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
                  type=""
                  href="https://forms.yandex.ru/cloud/67b02371f47e73d61ea520c8/"
                  className="register-btn"
                >
                  DOTA 2
                </Button>
              </Col>
              <Col xs={24} sm={12}>
                <Button
                  type=""
                  href="https://forms.yandex.ru/cloud/67b01cfb02848fd446b03ba8/"
                  className="register-btn"
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
