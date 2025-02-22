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

// export default Gallery;

// import React, { useEffect } from "react";
// import { Row, Col, Card } from "antd";
// import "lightgallery/css/lightgallery.css";
// import "lightgallery/css/lg-zoom.css";
// import "lightgallery/css/lg-thumbnail.css";
// import lightGallery from "lightgallery/lg-lightgallery.umd";
// import lgThumbnail from "lightgallery/lg-thumbnail.umd";
// import lgZoom from "lightgallery/lg-zoom.umd";
//
// const Gallery = () => {
//   // Список изображений
//   const images = [
//     {
//       "src": "img/etl4/0p2a4509.jpg",
//       "thumb": "img/etl4/0p2a4509.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4511.jpg",
//       "thumb": "img/etl4/0p2a4511.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4514.jpg",
//       "thumb": "img/etl4/0p2a4514.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4516.jpg",
//       "thumb": "img/etl4/0p2a4516.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4519.jpg",
//       "thumb": "img/etl4/0p2a4519.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4521.jpg",
//       "thumb": "img/etl4/0p2a4521.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4533.jpg",
//       "thumb": "img/etl4/0p2a4533.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4534.jpg",
//       "thumb": "img/etl4/0p2a4534.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4537.jpg",
//       "thumb": "img/etl4/0p2a4537.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4538.jpg",
//       "thumb": "img/etl4/0p2a4538.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4543.jpg",
//       "thumb": "img/etl4/0p2a4543.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4546.jpg",
//       "thumb": "img/etl4/0p2a4546.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4549.jpg",
//       "thumb": "img/etl4/0p2a4549.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4558.jpg",
//       "thumb": "img/etl4/0p2a4558.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4573.jpg",
//       "thumb": "img/etl4/0p2a4573.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4576.jpg",
//       "thumb": "img/etl4/0p2a4576.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4587.jpg",
//       "thumb": "img/etl4/0p2a4587.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4588.jpg",
//       "thumb": "img/etl4/0p2a4588.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4591.jpg",
//       "thumb": "img/etl4/0p2a4591.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4599.jpg",
//       "thumb": "img/etl4/0p2a4599.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4602.jpg",
//       "thumb": "img/etl4/0p2a4602.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4609.jpg",
//       "thumb": "img/etl4/0p2a4609.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4614.jpg",
//       "thumb": "img/etl4/0p2a4614.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4615.jpg",
//       "thumb": "img/etl4/0p2a4615.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4618.jpg",
//       "thumb": "img/etl4/0p2a4618.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4619.jpg",
//       "thumb": "img/etl4/0p2a4619.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4624.jpg",
//       "thumb": "img/etl4/0p2a4624.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4629.jpg",
//       "thumb": "img/etl4/0p2a4629.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4630.jpg",
//       "thumb": "img/etl4/0p2a4630.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4646.jpg",
//       "thumb": "img/etl4/0p2a4646.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4654.jpg",
//       "thumb": "img/etl4/0p2a4654.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4657.jpg",
//       "thumb": "img/etl4/0p2a4657.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4661.jpg",
//       "thumb": "img/etl4/0p2a4661.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4665.jpg",
//       "thumb": "img/etl4/0p2a4665.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4672.jpg",
//       "thumb": "img/etl4/0p2a4672.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4675.jpg",
//       "thumb": "img/etl4/0p2a4675.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4679.jpg",
//       "thumb": "img/etl4/0p2a4679.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4692.jpg",
//       "thumb": "img/etl4/0p2a4692.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4696.jpg",
//       "thumb": "img/etl4/0p2a4696.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4708.jpg",
//       "thumb": "img/etl4/0p2a4708.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4713.jpg",
//       "thumb": "img/etl4/0p2a4713.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4715.jpg",
//       "thumb": "img/etl4/0p2a4715.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4719.jpg",
//       "thumb": "img/etl4/0p2a4719.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4721.jpg",
//       "thumb": "img/etl4/0p2a4721.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4744.jpg",
//       "thumb": "img/etl4/0p2a4744.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4747.jpg",
//       "thumb": "img/etl4/0p2a4747.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4756.jpg",
//       "thumb": "img/etl4/0p2a4756.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4765.jpg",
//       "thumb": "img/etl4/0p2a4765.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4766.jpg",
//       "thumb": "img/etl4/0p2a4766.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4769.jpg",
//       "thumb": "img/etl4/0p2a4769.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4777.jpg",
//       "thumb": "img/etl4/0p2a4777.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4783.jpg",
//       "thumb": "img/etl4/0p2a4783.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4785.jpg",
//       "thumb": "img/etl4/0p2a4785.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4789.jpg",
//       "thumb": "img/etl4/0p2a4789.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4791.jpg",
//       "thumb": "img/etl4/0p2a4791.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4795.jpg",
//       "thumb": "img/etl4/0p2a4795.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4802.jpg",
//       "thumb": "img/etl4/0p2a4802.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4808.jpg",
//       "thumb": "img/etl4/0p2a4808.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4816.jpg",
//       "thumb": "img/etl4/0p2a4816.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4820.jpg",
//       "thumb": "img/etl4/0p2a4820.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4838.jpg",
//       "thumb": "img/etl4/0p2a4838.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4840.jpg",
//       "thumb": "img/etl4/0p2a4840.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4843.jpg",
//       "thumb": "img/etl4/0p2a4843.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4848.jpg",
//       "thumb": "img/etl4/0p2a4848.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4852.jpg",
//       "thumb": "img/etl4/0p2a4852.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4859.jpg",
//       "thumb": "img/etl4/0p2a4859.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4865.jpg",
//       "thumb": "img/etl4/0p2a4865.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4867.jpg",
//       "thumb": "img/etl4/0p2a4867.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4877.jpg",
//       "thumb": "img/etl4/0p2a4877.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4888.jpg",
//       "thumb": "img/etl4/0p2a4888.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4890.jpg",
//       "thumb": "img/etl4/0p2a4890.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4894.jpg",
//       "thumb": "img/etl4/0p2a4894.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4897.jpg",
//       "thumb": "img/etl4/0p2a4897.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4898.jpg",
//       "thumb": "img/etl4/0p2a4898.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4901.jpg",
//       "thumb": "img/etl4/0p2a4901.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4909.jpg",
//       "thumb": "img/etl4/0p2a4909.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4926.jpg",
//       "thumb": "img/etl4/0p2a4926.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4935.jpg",
//       "thumb": "img/etl4/0p2a4935.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4939.jpg",
//       "thumb": "img/etl4/0p2a4939.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4951.jpg",
//       "thumb": "img/etl4/0p2a4951.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4956.jpg",
//       "thumb": "img/etl4/0p2a4956.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a4975.jpg",
//       "thumb": "img/etl4/0p2a4975.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5000.jpg",
//       "thumb": "img/etl4/0p2a5000.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5005.jpg",
//       "thumb": "img/etl4/0p2a5005.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5007.jpg",
//       "thumb": "img/etl4/0p2a5007.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5011.jpg",
//       "thumb": "img/etl4/0p2a5011.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5019.jpg",
//       "thumb": "img/etl4/0p2a5019.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5029.jpg",
//       "thumb": "img/etl4/0p2a5029.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5034.jpg",
//       "thumb": "img/etl4/0p2a5034.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5036.jpg",
//       "thumb": "img/etl4/0p2a5036.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5045.jpg",
//       "thumb": "img/etl4/0p2a5045.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5054.jpg",
//       "thumb": "img/etl4/0p2a5054.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5058.jpg",
//       "thumb": "img/etl4/0p2a5058.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5062.jpg",
//       "thumb": "img/etl4/0p2a5062.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5069.jpg",
//       "thumb": "img/etl4/0p2a5069.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5072.jpg",
//       "thumb": "img/etl4/0p2a5072.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5083.jpg",
//       "thumb": "img/etl4/0p2a5083.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5099.jpg",
//       "thumb": "img/etl4/0p2a5099.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5106.jpg",
//       "thumb": "img/etl4/0p2a5106.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5107.jpg",
//       "thumb": "img/etl4/0p2a5107.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5111.jpg",
//       "thumb": "img/etl4/0p2a5111.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5115.jpg",
//       "thumb": "img/etl4/0p2a5115.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5117.jpg",
//       "thumb": "img/etl4/0p2a5117.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5123.jpg",
//       "thumb": "img/etl4/0p2a5123.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5124.jpg",
//       "thumb": "img/etl4/0p2a5124.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5128.jpg",
//       "thumb": "img/etl4/0p2a5128.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5139.jpg",
//       "thumb": "img/etl4/0p2a5139.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5181.jpg",
//       "thumb": "img/etl4/0p2a5181.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5190.jpg",
//       "thumb": "img/etl4/0p2a5190.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5203.jpg",
//       "thumb": "img/etl4/0p2a5203.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5207.jpg",
//       "thumb": "img/etl4/0p2a5207.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5211.jpg",
//       "thumb": "img/etl4/0p2a5211.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5213.jpg",
//       "thumb": "img/etl4/0p2a5213.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5215.jpg",
//       "thumb": "img/etl4/0p2a5215.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5220.jpg",
//       "thumb": "img/etl4/0p2a5220.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5227.jpg",
//       "thumb": "img/etl4/0p2a5227.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5235.jpg",
//       "thumb": "img/etl4/0p2a5235.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5241.jpg",
//       "thumb": "img/etl4/0p2a5241.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5255.jpg",
//       "thumb": "img/etl4/0p2a5255.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5261.jpg",
//       "thumb": "img/etl4/0p2a5261.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5269.jpg",
//       "thumb": "img/etl4/0p2a5269.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5284.jpg",
//       "thumb": "img/etl4/0p2a5284.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5288.jpg",
//       "thumb": "img/etl4/0p2a5288.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5292.jpg",
//       "thumb": "img/etl4/0p2a5292.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5306.jpg",
//       "thumb": "img/etl4/0p2a5306.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5309.jpg",
//       "thumb": "img/etl4/0p2a5309.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5321.jpg",
//       "thumb": "img/etl4/0p2a5321.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5357.jpg",
//       "thumb": "img/etl4/0p2a5357.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5360.jpg",
//       "thumb": "img/etl4/0p2a5360.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5370.jpg",
//       "thumb": "img/etl4/0p2a5370.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5373.jpg",
//       "thumb": "img/etl4/0p2a5373.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5401.jpg",
//       "thumb": "img/etl4/0p2a5401.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5421.jpg",
//       "thumb": "img/etl4/0p2a5421.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5440.jpg",
//       "thumb": "img/etl4/0p2a5440.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5454.jpg",
//       "thumb": "img/etl4/0p2a5454.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5460.jpg",
//       "thumb": "img/etl4/0p2a5460.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5469.jpg",
//       "thumb": "img/etl4/0p2a5469.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5480.jpg",
//       "thumb": "img/etl4/0p2a5480.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5487.jpg",
//       "thumb": "img/etl4/0p2a5487.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5496.jpg",
//       "thumb": "img/etl4/0p2a5496.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5502.jpg",
//       "thumb": "img/etl4/0p2a5502.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5506.jpg",
//       "thumb": "img/etl4/0p2a5506.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5515.jpg",
//       "thumb": "img/etl4/0p2a5515.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5522.jpg",
//       "thumb": "img/etl4/0p2a5522.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5529.jpg",
//       "thumb": "img/etl4/0p2a5529.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5543.jpg",
//       "thumb": "img/etl4/0p2a5543.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5557.jpg",
//       "thumb": "img/etl4/0p2a5557.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5568.jpg",
//       "thumb": "img/etl4/0p2a5568.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5582.jpg",
//       "thumb": "img/etl4/0p2a5582.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5596.jpg",
//       "thumb": "img/etl4/0p2a5596.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5628.jpg",
//       "thumb": "img/etl4/0p2a5628.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5632.jpg",
//       "thumb": "img/etl4/0p2a5632.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5651.jpg",
//       "thumb": "img/etl4/0p2a5651.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5660.jpg",
//       "thumb": "img/etl4/0p2a5660.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5670.jpg",
//       "thumb": "img/etl4/0p2a5670.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5678.jpg",
//       "thumb": "img/etl4/0p2a5678.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5683.jpg",
//       "thumb": "img/etl4/0p2a5683.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5701.jpg",
//       "thumb": "img/etl4/0p2a5701.jpg"
//     },
//     {
//       "src": "img/etl4/0p2a5704.jpg",
//       "thumb": "img/etl4/0p2a5704.jpg"
//     }
//   ];
//
//
//   useEffect(() => {
//     // Инициализация LightGallery
//     const galleryContainer = document.getElementById("lightgallery");
//     if (galleryContainer) {
//       lightGallery(galleryContainer, {
//         selector: "a",
//         thumbnail: true,
//         zoom: true,
//         download: false,
//         plugins: [lgThumbnail, lgZoom],
//       });
//     }
//   }, []);
//
//   return (
//     <>
//     <div className="container my-5">
//       <Row gutter={16} id="lightgallery" className="gallery">
//         {images.map((image, index) => (
//           <Col key={index} xs={24} sm={12} md={8} lg={6}>
//             <Card>
//               <a href={image.src} data-lg-size="1024-768">
//                 <img
//                   src={image.thumb}
//                   alt={`Image ${index}`}
//                   style={{ width: "100%", borderRadius: "8px" }}
//                 />
//               </a>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//     </>
//   );
// };
//
// export default Gallery;