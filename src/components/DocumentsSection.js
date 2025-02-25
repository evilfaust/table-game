import React from 'react';
import {Row, Col, Typography, Card, Avatar, Button} from 'antd';

const { Title } = Typography;
const { Meta } = Card;

// Компонент документов
const DocumentsSection = () => {
  // Данные для карточек
  const documentsData = [
    {
      title: "Общие положения",
      avatar: "/images/icon010.png",
      description: "Здесь собраны общие положения и правила проведения лиги",
      button: {
        text: "Общие положения",
        href: "assets/emcotech/esport/doc/esl1/emco-tech-sports-esl.pdf",
      },
    },
    {
      title: "Правила DOTA 2",
      avatar: "/images/icon008.png",
      description: "Здесь все что вам нужно знать о правилах лиги относительно DOTA 2",
      button: {
        text: "Смотреть",
        href: "assets/emcotech/esport/doc/esl1/reglament-esl-dota-2.pdf",
      },
    },
    {
      title: "Правила CS 2",
      avatar: "/images/icon009.png",
      description: "Здесь все что вам нужно знать о правилах лиги относительно CS 2",
      button: {
        text: "Смотреть",
        href: "assets/emcotech/esport/doc/esl1/reglament-cs-2.pdf",
      },
    },
  ];

  return (
    <div className="section">
      <div className="container">
        {/* Заголовок */}
        <Row justify="center" gutter={[16, 16]}>
          <Col lg={24} md={24} xs={24} style={{ textAlign: 'center', marginBottom: 16 }}>
            <Title level={2}>Нормативные документы</Title>
          </Col>
        </Row>

        {/* Карточки через map */}
        <Row gutter={[16, 16]}>
          {documentsData.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={12}>
              <Card style={{ width: "100%" }}>
                <Meta
                  avatar={<Avatar shape="square" size={64} src={item.avatar} />}
                  title={item.title}
                  description={
                    <>
                      <p>{item.description}</p>
                      <Button
                          block
                          variant="solid"
                          href={item.button.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'block', marginTop: '8px' }}
                      >
                        {item.button.text}
                      </Button>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default DocumentsSection;
