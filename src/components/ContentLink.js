import React from 'react';
import { Layout, Card, Avatar, Row, Col, Button } from 'antd';
// import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ContentLink = () => {
    return (
        <Layout>
            <Layout.Content>
                <Row gutten={[16, 16]} style={{ marginBottom: "20px", justifyContent: "center", marginTop: "20px" }}>
                    <Col span={6}>
                    <Card
                    style={{ width: 300 }}
                    // cover={<img  alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    >
                    <Meta
                        avatar={<Avatar shape="square" size={64} src="/images/icon001.png" />}
                        title="Турнирная таблица"
                        description={<Button variant="solid" block href=""> Посмотреть </Button>}
                    />
                </Card>
                    </Col>
                    <Col span={6}>
                    <Card
                    style={{ width: 300 }}
                    // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                >
                    <Meta
                        avatar={<Avatar shape="square" size={64} src="/images/icon002.png" />}
                        title="Календарь лиги"
                        description={<Button variant="solid" block href=""> Посмотреть </Button>}
                    />
                </Card>
                    </Col>
                    <Col span={6}>
                    <Card
                    style={{ width: 300 }}
                    // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                >
                    <Meta
                        avatar={<Avatar shape="square" size={64} src="/images/icon003.png" />}
                        title="Регламент и правила"
                        description={<Button variant="solid" block href=""> Посмотреть </Button>}
                    />
                </Card>
                    </Col>
                    <Col span={6}>
                    <Card
                    style={{ width: 300 }}
                    // cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                >
                    <Meta
                        avatar={<Avatar shape="square" size={64} src="/images/icon004.png" />}
                        title="Новости лиги"
                        description={<Button variant="solid" block href=""> Посмотреть </Button>}
                    />
                </Card>
                    </Col>
                </Row>


                
            </Layout.Content>
        </Layout>
    );
};

export default ContentLink;

