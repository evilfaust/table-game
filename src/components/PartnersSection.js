import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Spin } from 'antd';
import PocketBase from 'pocketbase';

const { Title, Text } = Typography;

// Компонент для отдельной карточки партнера
const PartnerCard = ({ imgSrc, altText, title, description }) => (
  <Col xs={24} sm={12} lg={6} style={{ display: 'flex' }}>
    {/* Растягиваем карточку на всю высоту колонки */}
    <Card hoverable style={{ width: '100%', height: '100%' }} cover={<img src={imgSrc} alt={altText} />}>
      <Title level={5}>{title}</Title>
      <Text type="secondary">{description}</Text>
    </Card>
  </Col>
);

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const pb = new PocketBase('https://apigame.emcotech.ru');

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // Fetch all records from the 'ets_partneri' collection
        const records = await pb.collection('ets_partneri').getFullList();
        // Map the API response to the desired structure
        const formattedPartners = records.map((record) => ({
          imgSrc: record.images
            ? `https://apigame.emcotech.ru/api/files/${record.collectionId}/${record.id}/${record.images}`
            : '',
          altText: record.title,
          title: record.title,
          description: record.discription || 'Нет описания',
        }));
        setPartners(formattedPartners);
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section id="partneri" style={{ textAlign: 'center', padding: '50px 0' }}>
        <Spin size="large" />
      </section>
    );
  }

  return (
    <section id="partneri">
      <Row justify="center" align="middle" style={{ padding: '50px 0' }}>
        <Col span={20}>
          <Row justify="center" gutter={[16, 16]}>
            <Col span={20}>
              <Title level={2} style={{ textAlign: 'center' }}>
                Партнеры лиги
              </Title>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ display: 'flex', alignItems: 'stretch' }}>
            {partners.length > 0 ? (
              partners.map((partner, index) => (
                <PartnerCard key={index} {...partner} />
              ))
            ) : (
              <Col span={24} style={{ textAlign: 'center' }}>
                <Text type="secondary">Нет данных о партнерах</Text>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default PartnersSection;
