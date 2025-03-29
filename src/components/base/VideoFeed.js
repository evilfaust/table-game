import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, Alert, Modal, Layout } from 'antd';

const VideoFeed = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const proxyUrl = 'https://emcotech.site:3050/fetch-videos';
      const response = await fetch(`${proxyUrl}?groupId=218883068&count=20`);
      const data = await response.json();

      if (data.response && data.response.items) {
        const processedVideos = data.response.items.map(item => {
          // Определяем миниатюру: если есть массив image, берём последний элемент
          const thumbnail =
            item.image && item.image.length > 0
              ? item.image[item.image.length - 1].url
              : '/images/video-placeholder.png';
          return {
            ...item,
            thumbnail,
          };
        });
        // Сортируем по дате (от новых к старым)
        processedVideos.sort((a, b) => (b.date || 0) - (a.date || 0));
        setVideos(processedVideos);
        setError(null);
      } else {
        setError('Ошибка при загрузке видео.');
      }
    } catch (err) {
      setError('Ошибка при подключении к API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <Layout style={{ background: 'transparent' }}>
      <Layout.Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', width: '95%' }}>
        <h2 style={{ textAlign: 'center' }}>Видео сообщества</h2>
        {loading ? (
          <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} />
        ) : error ? (
          <Alert message="Ошибка" description={error} type="error" style={{ textAlign: 'center', marginTop: '20px' }} />
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {videos.map(video => (
              <Col key={video.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  onClick={() => setSelectedVideo(video)}
                  cover={
                    <img
                      alt="video thumbnail"
                      src={video.thumbnail}
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                  }
                >
                  <Card.Meta
                    title={video.title}
                    description={video.date ? new Date(video.date * 1000).toLocaleString() : ''}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <Modal
          visible={!!selectedVideo}
          onCancel={() => setSelectedVideo(null)}
          footer={null}
          width={800}
        >
          {selectedVideo && (
            <>
              <h2>{selectedVideo.title}</h2>
              {/* Если API возвращает поле player с URL для встраивания */}
              <iframe
                src={selectedVideo.player}
                width="100%"
                height="450"
                frameBorder="0"
                allow="autoplay; fullscreen"
                title="Video Playback"
              ></iframe>
              {selectedVideo.description && <p>{selectedVideo.description}</p>}
            </>
          )}
        </Modal>
      </Layout.Content>
    </Layout>
  );
};

export default VideoFeed;
