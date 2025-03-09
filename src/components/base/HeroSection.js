import React from "react";
import {Row, Col, Button, Typography, Card} from "antd";
import {RocketFilled} from "@ant-design/icons";
import "antd/dist/reset.css";
// import {Link} from "react-router-dom";

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <section className="hero-section ">
      <Row align="middle" justify="center" gutter={[16, 16]}>
        <Col xs={24} lg={12} className="hero-3-img">
          <img src="/images/head-to-site.png" alt="EMCO.TECH.SPORTS" />
        </Col>
        <Col xs={24} lg={12}>
          <Card className="hero-card text-left" bordered={false}>
            <div className="badge text-white roboto-base">
              <RocketFilled className="icon"/> Киберспорт это спорт
            </div>
            <Title level={4} className="text-white roboto-base">
              КИБЕРСПОРТИВНАЯ <span className="highlight">ЛИГА</span>
            </Title>
            <Title level={3} className="hero-title-game text-white roboto-base">
              EMCO.TECH<span className="highlight ">.SPORTS</span>
            </Title>
            <Paragraph className="text-white roboto-base">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>Дисциплины: </span>
              <img src="/images/cs2-logo.png" alt="CS2" style={{height: "32px"}} />
              <img src="/images/dota2-logo.png" alt="DOTA2" style={{height: "32px"}} />
            </div>
            </Paragraph>
            <Title level={3} className="text-center">
              <span className="highlight roboto-base">РЕГИСТРАЦИЯ</span>
            </Title>
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={12}>
                <Button
                    className="roboto-base"
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
                className="roboto-base"
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
