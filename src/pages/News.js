import React, { useState } from 'react';
import { Card, Row, Col, Avatar, Typography } from 'antd';
import NewsDescription from "../components/base/NewsDescription";
import NewsFeed from "../components/base/NewsFeed";         // Новости лиги
import NewsFeedCS2 from "../components/base/NewsFeedCS2";       // Новости CS 2
import NewsFeedDOTA2 from "../components/base/NewsFeedDOTA2";   // Новости DOTA 2
// const { Meta } = Card;
const { Title } = Typography;

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('league');

  const renderNewsFeed = () => {
    switch (selectedCategory) {
      case 'cs2':
        return <NewsFeedCS2 />;
      case 'dota2':
        return <NewsFeedDOTA2 />;
      default:
        return <NewsFeed />;
    }
  };

  return (
    <>
      <NewsDescription />
      <Row gutter={[16, 16]} style={{ marginBottom: '20px', padding: "10px", width: "80%", margin: "0 auto"}}>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            onClick={() => setSelectedCategory('league')}
            style={{ textAlign: 'center' }}
          >
            <Avatar
            shape="square"
            size={64}
            src="/images/icon025.png"
        />
            <Title level={4}>Новости Лиги</Title>
            {/* <p>Загрузить новости киберспортивной лиги</p> */}
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            onClick={() => setSelectedCategory('cs2')}
            style={{ textAlign: 'center' }}
          >
            <Avatar
            shape="square"
            size={64}
            src="/images/icon033.png"
        />
            <Title level={4}>Новости CS 2</Title>
            {/* <p>Загрузить новости сообщества CS 2</p> */}
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            hoverable
            onClick={() => setSelectedCategory('dota2')}
            style={{ textAlign: 'center' }}
          >
            <Avatar
            shape="square"
            size={64}
            src="/images/icon036.png"
        />
            <Title level={4}>Новости DOTA 2</Title>
            {/* <p>Загрузить новости сообщества DOTA 2</p> */}
          </Card>
        </Col>
      </Row>
      {renderNewsFeed()}
    </>
  );
};

export default News;



// import NewsDescription from "../components/base/NewsDescription";
// import NewsFeed from "../components/base/NewsFeed";

// const News = () => {
//     return (
//         <>
//         <NewsDescription />
//             <NewsFeed />
//         </>
//     )
// }
// export default News;
