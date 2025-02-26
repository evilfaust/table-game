import React, { useState, useEffect } from 'react';
import { Layout, Card, Avatar, Row, Col, Button } from 'antd';
import '../contentlink.css'; // CSS для расширенного набора анимаций
const { Meta } = Card;

const EtlLink = ({
            onToggleETL1,
            onToggleETL2,
            onToggleETL3,
            onToggleETL4,
            onToggleETL5,
            onToggleETL6,
            onToggleETL7,
            onToggleETL8,
            etl1ButtonText,
            etl2ButtonText,
            etl3ButtonText,
            etl4ButtonText,
            etl5ButtonText,
            etl6ButtonText,
            etl7ButtonText,
            etl8ButtonText

}) => {
    // Состояние для отслеживания текущей анимирующейся аватарки
    const [animatingAvatar, setAnimatingAvatar] = useState(null);
    // Состояние для отслеживания текущего типа анимации
    const [animationType, setAnimationType] = useState(null);

    // Расширенный массив с возможными анимациями
    const animations = [
        { name: 'pulse', style: { animation: 'pulse 1s' } },
        { name: 'bounce', style: { animation: 'bounce 1s' } },
        { name: 'shake', style: { animation: 'shake 0.5s' } },
        { name: 'rotate', style: { animation: 'rotate360 1s' } },
        { name: 'scale', style: { animation: 'scale 0.7s' } },
        { name: 'flip', style: { animation: 'flip 1s' } },
        { name: 'swing', style: { animation: 'swing 1s' } },
        { name: 'wobble', style: { animation: 'wobble 1s' } },
        { name: 'jello', style: { animation: 'jello 1s' } },
        { name: 'flash', style: { animation: 'flash 1s' } },
        { name: 'rubberBand', style: { animation: 'rubberBand 1s' } },
        { name: 'tada', style: { animation: 'tada 1s' } },
        { name: 'heartBeat', style: { animation: 'heartBeat 1.3s' } },
        { name: 'slideUp', style: { animation: 'slideUp 1s' } },
        { name: 'slideLeft', style: { animation: 'slideLeft 1s' } }
    ];

    // Данные о карточках
    const cards = [
        { id: 1, title: "ETL 1", description: "Март 2023", icon: "/images/icon-etl-001.png", onClick: onToggleETL1, buttonText: etl1ButtonText },
        { id: 2, title: "ETL 2", description: "Декабрь 2024", icon: "/images/icon-etl-002.png", onClick: onToggleETL2, buttonText: etl2ButtonText },
        { id: 3, title: "ETL 3", description: "Март-апрель 2024", icon: "/images/icon-etl-003.png", onClick: onToggleETL3, buttonText: etl3ButtonText },
        { id: 4, title: "ETL 4", description: "Ноябрь-февраль 2024/25", icon: "/images/icon-etl-004.png", onClick: onToggleETL4, buttonText: etl4ButtonText },
        { id: 5, title: "ETL 5", description: "Декабрь 2025", icon: "/images/icon-etl-001.png", onClick: onToggleETL5, buttonText: etl5ButtonText },
        { id: 6, title: "ETL 5", description: "скоро...", icon: "/images/icon-etl-002.png", onClick: onToggleETL6, buttonText: etl6ButtonText },
        { id: 7, title: "ETL 5", description: "скоро...", icon: "/images/icon-etl-003.png", onClick: onToggleETL7, buttonText: etl7ButtonText },
        { id: 8, title: "ETL 5", description: "скоро...", icon: "/images/icon-etl-004.png", onClick: onToggleETL8, buttonText: etl8ButtonText }
    ];

    useEffect(() => {
        // Функция для выбора случайной аватарки и анимации
        const animateRandomAvatar = () => {
            // Выбираем случайную аватарку
            const randomCardIndex = Math.floor(Math.random() * cards.length);
            const randomCardId = cards[randomCardIndex].id;

            // Выбираем случайную анимацию
            const randomAnimationIndex = Math.floor(Math.random() * animations.length);
            const randomAnimation = animations[randomAnimationIndex];

            // Устанавливаем анимацию
            setAnimatingAvatar(randomCardId);
            setAnimationType(randomAnimation.name);

            // Сбрасываем анимацию через указанное время
            setTimeout(() => {
                setAnimatingAvatar(null);
                setAnimationType(null);
            }, 1000); // 1 секунда для анимации
        };

        // Устанавливаем интервал для случайной анимации
        const intervalId = setInterval(animateRandomAvatar, 5000); // Каждые 5 секунд

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    // Получаем стиль анимации для текущей аватарки
    const getAnimationStyle = (cardId) => {
        if (animatingAvatar === cardId) {
            const animation = animations.find(a => a.name === animationType);
            return animation ? animation.style : {};
        }
        return {};
    };

    return (
        <Layout>
            <Layout.Content style={{ padding: "10px", width: "80%", margin: "0 auto" }}>
                <Row gutter={[16, 16]} style={{ marginBottom: "20px", justifyContent: "center", marginTop: "20px" }}>
                    {cards.map(card => (
                        <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
                            <Card style={{ width: "98%", backgroundColor: "#162938" }}>
                                <Meta
                                    avatar={
                                        <Avatar
                                            shape="square"
                                            size={128}
                                            src={card.icon}
                                            style={getAnimationStyle(card.id)}
                                        />
                                    }
                                    title={<span style={{color: "white"}} className="rubik-mono-one-regular">{card.title}</span>}
                                    description={
                                    <>
                                    <span style={{color: "white"}}>{card.description}</span>
                                        <Button href={card.link} variant="solid" block target="_blank" rel="noopener noreferrer">
                                            {card.buttonText}
                                          </Button>
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default EtlLink;
