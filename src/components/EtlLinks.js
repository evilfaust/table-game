import React, { useState, useEffect } from 'react';
import { Layout, Card, Avatar, Row, Col, Button } from 'antd';
import './contentlink.css'; // CSS для расширенного набора анимаций
const { Meta } = Card;

const EtlLink = ({
  onToggleTables,
  onToggleSchedule,
  onToggleDocuments,
  onToggleNewsFeed,
  tableButtonText,
  scheduleButtonText,
  documentsButtonText,
  newsButtonText
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
        { id: 1, title: "Турнирная таблица", icon: "/images/icon001.png", onClick: onToggleTables, buttonText: tableButtonText },
        { id: 2, title: "Календарь лиги", icon: "/images/icon002.png", onClick: onToggleSchedule, buttonText: scheduleButtonText },
        { id: 3, title: "Регламент и правила", icon: "/images/icon003.png", onClick: onToggleDocuments, buttonText: documentsButtonText },
        { id: 4, title: "Новости лиги", icon: "/images/icon004.png", onClick: onToggleNewsFeed, buttonText: newsButtonText },
        { id: 5, title: "Партнеры лиги", icon: "/images/icon005.png", link: "/about#partneri", buttonText: "Перейти к партнерам" },
        { id: 6, title: "Итоги ETL4", icon: "/images/icon006.png", link: "/etl4", buttonText: "Посмотреть итоги" },
        { id: 7, title: "Статистика", icon: "/images/icon007.png", link: "https://example.com/statistics", buttonText: "Открыть статистику" },
        { id: 8, title: "Киберкаст", icon: "/images/icon008.png", link: "https://example.com/cybercast", buttonText: "Смотреть трансляцию" }
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
            <Layout.Content>
                <Row gutter={[16, 16]} style={{ marginBottom: "20px", justifyContent: "center", marginTop: "20px" }}>
                    {cards.map(card => (
                        <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
                            <Card style={{ width: "98%" }}>
                                <Meta
                                    avatar={
                                        <Avatar
                                            shape="square"
                                            size={64}
                                            src={card.icon}
                                            style={getAnimationStyle(card.id)}
                                        />
                                    }
                                    title={card.title}
                                    description={
                                    card.link ? (
                                        <Button href={card.link} variant="solid" block target="_blank" rel="noopener noreferrer">
                                            {card.buttonText}
                                          </Button>
                                        ) : (
                                            <Button
                                            variant="solid"
                                            block
                                            onClick={card.onClick}
                                        >
                                            {card.buttonText}
                                        </Button>
                                        )
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
