import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Modal, Button } from 'antd';
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css'; // Импортируйте стили Ant Design
import imagesETL4 from './imagesetl4'; // Импортируем данные изображений

const Gallery = () => {
  // Используем импортированный массив изображений
  const images = imagesETL4;

  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Обработчик клавиш
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!visible) return;

      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  // Стили для элементов управления в модальном окне
  const modalControlStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0, 0, 0, 0.3)',
    color: 'white',
    border: 'none',
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1001,
  };
// https://emcotech.site/img/etl4/0p2a4549.jpg
  return (
    <div className="container" style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {images.map((image, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={image.alt}
                  src={'https://emcotech.site/'+image.thumb}
                  style={{ objectFit: 'cover', height: '200px' }}
                  onClick={() => openModal(index)}
                />
              }
              bodyStyle={{ padding: '12px' }}
            >
              <Card.Meta title={image.alt} />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        visible={visible}
        footer={null}
        onCancel={closeModal}
        width="80%"
        centered
        closable={false}
        bodyStyle={{ padding: 0, backgroundColor: 'black', height: '80vh', position: 'relative' }}
      >
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            icon={<LeftOutlined />}
            onClick={prevImage}
            style={{ ...modalControlStyle, left: '20px' }}
          />

          <img
            src={'https://emcotech.site/'+images[currentIndex].src}
            alt={images[currentIndex].alt}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />

          <Button
            icon={<RightOutlined />}
            onClick={nextImage}
            style={{ ...modalControlStyle, right: '20px' }}
          />

          <Button
            icon={<CloseOutlined />}
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              border: 'none',
              zIndex: 1001,
            }}
          />

          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '16px',
            background: 'rgba(0, 0, 0, 0.5)',
            padding: '5px 15px',
            borderRadius: '20px',
          }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Gallery;
