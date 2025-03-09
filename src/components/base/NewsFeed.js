
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, Alert, Modal, Layout } from 'antd';

const { Meta } = Card;

const NewsFeed = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const proxyUrl = 'https://emcotech.site:3050/fetch-news';
      const response = await fetch(`${proxyUrl}?groupId=218883068&count=50`);
      const data = await response.json();

      if (data.response) {
        const filteredNews = data.response.items
          .map(item => {
            if (!item.text.trim()) return null;

            const lines = item.text.split('\n').filter(line => line.trim() !== '');
            if (lines.length === 0) return null;

            return {
              ...item,
              title: lines[0], 
              content: lines.slice(1).join('\n\n'), 
              image: item.attachments?.[0]?.photo?.sizes.slice(-1)[0]?.url || '/images/vk-post.png',
              repost: item.copy_history ? item.copy_history[0] : null
            };
          })
          .filter(item => item !== null)
          .slice(0, 20);

        setNews(filteredNews);
        setError(null);
      } else {
        setError('Ошибка при загрузке новостей.');
      }
    } catch (error) {
      setError('Ошибка при подключении к API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openModal = (item) => {
    setSelectedNews(item);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  const formatContent = (text) => {
    return text.split('\n').map((line, index) => (
      <p key={index}>
        {line.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
          part.match(/^https?:\/\//) ? (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer">
              {part}
            </a>
          ) : (
            part
          )
        )}
      </p>
    ));
  };

  if (loading) return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} />;
  if (error) return <Alert message="Ошибка" description={error} type="error" style={{ textAlign: 'center', marginTop: '20px' }} />;
//     <Layout style={{ background: 'transparent' }}>
//       <Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
  return (
    <Layout style={{ background: 'transparent' }}>
      <Layout.Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '95%' }}>
        <h2 style={{textAlign: "center"}}>Новости EMCO.TECH.SPORT</h2>

        <Row gutter={[16, 16]} justify="center">
          {news.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                variant="outlined"
                onClick={() => openModal(item)}
                cover={<img alt="cover" src={item.image} style={{ maxHeight: '200px', objectFit: 'cover' }} />}
              >
                {/* // style={{ width: '80%', maxHeight: '200px', objectFit: 'cover' }}  */}
                <Meta title={item.title} description={new Date(item.date * 1000).toLocaleString()} />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Модальное окно */}
        <Modal open={!!selectedNews} onCancel={closeModal} footer={null} width={600}>
          {selectedNews && (
            <>
              <img src={selectedNews.image} alt="cover" style={{ width: '100%', marginBottom: '16px' }} />
              <h2>{selectedNews.title}</h2>
              {formatContent(selectedNews.content)}

              {/* Блок ссылок в одной строке */}
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <a
                  href={`https://vk.com/wall${selectedNews.owner_id}_${selectedNews.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Открыть в VK
                </a>
                <a
                  href={`https://vk.com/share.php?url=${encodeURIComponent(`https://vk.com/wall${selectedNews.owner_id}_${selectedNews.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Сделать репост
                </a>
              </div>

              {selectedNews.repost && (
                <div style={{ marginTop: '8px' }}>
                  <strong>Репост от:</strong>{' '}
                  <a
                    href={`https://vk.com/wall${selectedNews.repost.owner_id}_${selectedNews.repost.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Оригинальный пост
                  </a>
                </div>
              )}
            </>
          )}
        </Modal>
      </Layout.Content>
    </Layout>
  );
};

export default NewsFeed;
