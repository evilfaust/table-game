import React from 'react';
import { Layout, Card, Avatar, Row, Col, Button } from 'antd';

const { Meta } = Card;

const ContentLink = ({
  onToggleTables,
  onToggleSchedule,
  onToggleDocuments,
    onToggleNewsFeed,
  tableButtonText,
  scheduleButtonText,
  documentsButtonText,
    newsButtonText
}) => {
    return (
        <Layout>
            <Layout.Content>
                <Row gutten={[16, 16]} style={{ marginBottom: "20px", justifyContent: "center", marginTop: "20px" }}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card style={{ width: "98%" }}>
                            <Meta
                                avatar={<Avatar shape="square" size={64} src="/images/icon001.png" />}
                                title="Турнирная таблица"
                                description={<Button variant="solid" block onClick={onToggleTables}>{tableButtonText}</Button>}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card style={{ width: "98%" }}>
                            <Meta
                                avatar={<Avatar shape="square" size={64} src="/images/icon002.png" />}
                                title="Календарь лиги"
                                description={<Button variant="solid" block onClick={onToggleSchedule}>{scheduleButtonText}</Button>}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card style={{ width: "98%" }}>
                            <Meta
                                avatar={<Avatar shape="square" size={64} src="/images/icon003.png" />}
                                title="Регламент и правила"
                                description={<Button variant="solid" block onClick={onToggleDocuments}>{documentsButtonText}</Button>}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Card style={{ width: "98%" }}>
                            <Meta
                                avatar={<Avatar shape="square" size={64} src="/images/icon004.png" />}
                                title="Новости лиги"
                                description={<Button variant="solid" block onClick={onToggleNewsFeed}>{newsButtonText}</Button>}
                            />
                        </Card>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default ContentLink;
