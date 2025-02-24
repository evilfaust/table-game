import React from 'react';
import { Row, Col, Typography, Button } from 'antd';

const { Title } = Typography;

const DocumentsSection = () => {
  return (
    <div className="section" >
      <div className="container">
        {/* Заголовок */}
        <Row justify="center" gutter={[16, 16]}>
          <Col lg={24} md={24} xs={24} style={{ textAlign: 'center', marginBottom: 16 }}>
            <Title level={2}>Нормативные документы</Title>
          </Col>
        </Row>

        {/* Список документов */}
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} xs={24}>
            <Button
              type="primary"
              size="large"
              block
              href="assets/emcotech/esport/doc/esl1/emco-tech-sports-esl.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Общие положения
            </Button>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <Button
              type="primary"
              size="large"
              block
              href="assets/emcotech/esport/doc/esl1/reglament-esl-dota-2.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Правила DOTA 2
            </Button>
          </Col>
          <Col lg={8} md={12} xs={24}>
            <Button
              type="primary"
              size="large"
              block
              href="assets/emcotech/esport/doc/esl1/reglament-cs-2.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Правила CS 2
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DocumentsSection;