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
        { id: 1, title: "ETL 1", description: "Март 2023", icon: "/images/icon-etl-001.png", onClick: onToggleETL1, buttonText: etl1ButtonText, active: true },
        { id: 2, title: "ETL 2", description: "Декабрь 2024", icon: "/images/icon-etl-002.png", onClick: onToggleETL2, buttonText: etl2ButtonText, active: true },
        { id: 3, title: "ETL 3", description: "Март-апрель 2024", icon: "/images/icon-etl-003.png", onClick: onToggleETL3, buttonText: etl3ButtonText, active: true },
        { id: 4, title: "ETL 4", description: "Ноябрь-февраль 2024/25", icon: "/images/icon-etl-004.png", onClick: onToggleETL4, buttonText: etl4ButtonText, active: true },
        { id: 5, title: "ETL 5", description: "Декабрь 2025", icon: "/images/icon-etl-001.png", onClick: onToggleETL5, buttonText: etl5ButtonText || "Скоро", active: false },
        { id: 6, title: "ETL 6", description: "скоро...", icon: "/images/icon-etl-002.png", onClick: onToggleETL6, buttonText: etl6ButtonText || "Скоро", active: false },
        { id: 7, title: "ETL 7", description: "скоро...", icon: "/images/icon-etl-003.png", onClick: onToggleETL7, buttonText: etl7ButtonText || "Скоро", active: false },
        { id: 8, title: "ETL 8", description: "скоро...", icon: "/images/icon-etl-004.png", onClick: onToggleETL8, buttonText: etl8ButtonText || "Скоро", active: false }
    ];

    useEffect(() => {
        // Функция для выбора случайной аватарки и анимации
        const animateRandomAvatar = () => {
            // Выбираем случайную аватарку только из активных карточек
            const activeCards = cards.filter(card => card.active);
            if (activeCards.length === 0) return;

            const randomCardIndex = Math.floor(Math.random() * activeCards.length);
            const randomCardId = activeCards[randomCardIndex].id;

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
                    {cards.map(card => {
                        // Стили для неактивных карточек
                        const cardStyle = {
                            width: "98%",
                            backgroundColor: card.active ? "#162938" : "#2a2a2a",
                            filter: card.active ? "none" : "grayscale(0.8) brightness(0.7)",
                            transition: "all 0.3s ease",
                            position: "relative"
                        };

                        const avatarStyle = {
                            ...getAnimationStyle(card.active ? card.id : null),
                            opacity: card.active ? 1 : 0.6
                        };

                        return (
                            <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
                                <Card style={cardStyle}>
                                    {!card.active && (
                                        <div style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 2,
                                            pointerEvents: "none"
                                        }}>
                                            <div style={{
                                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                color: "white",
                                                padding: "4px 10px",
                                                borderRadius: "4px",
                                                fontWeight: "bold"
                                            }}>
                                                СКОРО
                                            </div>
                                        </div>
                                    )}
                                    <Meta
                                        avatar={
                                            <Avatar
                                                shape="square"
                                                size={128}
                                                src={card.icon}
                                                style={avatarStyle}
                                            />
                                        }
                                        title={<span style={{color: "white"}} className="rubik-mono-one-regular">{card.title}</span>}
                                        description={
                                        <>
                                        <span style={{color: card.active ? "white" : "#aaaaaa"}}>{card.description}</span>
                                            <Button
                                                disabled={!card.active}
                                                onClick={card.active ? card.onClick : undefined}
                                                variant="solid"
                                                block
                                                style={{
                                                    cursor: card.active ? "pointer" : "not-allowed",
                                                    opacity: card.active ? 1 : 0.6
                                                }}
                                            >
                                                {card.buttonText}
                                            </Button>
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Layout.Content>
        </Layout>
    );
};

export default EtlLink;