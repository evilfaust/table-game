import React, { useState, useEffect } from 'react';
import { Card, List, Spin, Alert } from 'antd';

const { Meta } = Card;

const NewsFeed = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Замените на ваш access token и ID паблика
    const token = 'c4d4f584c4d4f584c4d4f5840bc7fe5167cc4d4c4d4f584a36db98e432a664fd219abb6';
    const groupId = '218883068'; // Например, -123456789
    const count = 5; // Количество постов для загрузки

    const fetchNews = async () => {
      try {
        const response = await fetch(`https://api.vk.com/method/wall.get?owner_id=-${groupId}&count=${count}&access_token=${token}&v=5.131`);
        const data = await response.json();

        if (data.response) {
          setNews(data.response.items);
        } else {
          setError('Ошибка при загрузке новостей.');
        }
      } catch (error) {
        setError('Ошибка при подключении к API.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Ошибка" description={error} type="error" />;
  }

  return (
    <div>
      <h2>Новости EMCO.TECH.SPORT</h2>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={news}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[<a href={`https://vk.com/wall${item.owner_id}_${item.id}`} target="_blank" rel="noopener noreferrer">Читать</a>]}
          >
            <Card
              hoverable
              cover={item.attachments && item.attachments[0] ? <img alt="cover" src={item.attachments[0].photo.sizes[3].url} /> : null}
            >
              <Meta title={item.text || 'Без заголовка'} description={new Date(item.date * 1000).toLocaleString()} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default NewsFeed;
