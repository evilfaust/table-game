import React, { useState, useEffect } from 'react';
import { Layout, Card, Avatar, Row, Col, Button } from 'antd';

const { Meta } = Card;

const ContentLink = ({
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
        { id: 4, title: "Новости лиги", icon: "/images/icon004.png", onClick: onToggleNewsFeed, buttonText: newsButtonText }
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
                {/* CSS для расширенного набора анимаций */}
                <style jsx global>{`
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.2); }
                        100% { transform: scale(1); }
                    }
                    
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                        20%, 40%, 60%, 80% { transform: translateX(5px); }
                    }
                    
                    @keyframes rotate360 {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    @keyframes scale {
                        0% { transform: scale(1); }
                        50% { transform: scale(0.8); }
                        100% { transform: scale(1); }
                    }
                    
                    @keyframes flip {
                        0% { transform: perspective(400px) rotateY(0); }
                        100% { transform: perspective(400px) rotateY(360deg); }
                    }
                    
                    @keyframes swing {
                        20% { transform: rotate(15deg); }
                        40% { transform: rotate(-10deg); }
                        60% { transform: rotate(5deg); }
                        80% { transform: rotate(-5deg); }
                        100% { transform: rotate(0deg); }
                    }
                    
                    @keyframes wobble {
                        0% { transform: translateX(0%); }
                        15% { transform: translateX(-5%) rotate(-5deg); }
                        30% { transform: translateX(4%) rotate(3deg); }
                        45% { transform: translateX(-3%) rotate(-3deg); }
                        60% { transform: translateX(2%) rotate(2deg); }
                        75% { transform: translateX(-1%) rotate(-1deg); }
                        100% { transform: translateX(0%); }
                    }
                    
                    @keyframes jello {
                        0%, 100% { transform: scale3d(1, 1, 1); }
                        30% { transform: scale3d(1.25, 0.75, 1); }
                        40% { transform: scale3d(0.75, 1.25, 1); }
                        50% { transform: scale3d(1.15, 0.85, 1); }
                        65% { transform: scale3d(0.95, 1.05, 1); }
                        75% { transform: scale3d(1.05, 0.95, 1); }
                    }
                    
                    @keyframes flash {
                        0%, 50%, 100% { opacity: 1; }
                        25%, 75% { opacity: 0.5; }
                    }
                    
                    @keyframes rubberBand {
                        0% { transform: scale3d(1, 1, 1); }
                        30% { transform: scale3d(1.25, 0.75, 1); }
                        40% { transform: scale3d(0.75, 1.25, 1); }
                        50% { transform: scale3d(1.15, 0.85, 1); }
                        65% { transform: scale3d(0.95, 1.05, 1); }
                        75% { transform: scale3d(1.05, 0.95, 1); }
                        100% { transform: scale3d(1, 1, 1); }
                    }
                    
                    @keyframes tada {
                        0% { transform: scale(1) rotate(0deg); }
                        10%, 20% { transform: scale(0.9) rotate(-3deg); }
                        30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
                        40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
                        100% { transform: scale(1) rotate(0deg); }
                    }
                    
                    @keyframes heartBeat {
                        0% { transform: scale(1); }
                        14% { transform: scale(1.3); }
                        28% { transform: scale(1); }
                        42% { transform: scale(1.3); }
                        70% { transform: scale(1); }
                    }
                    
                    @keyframes slideUp {
                        0% { transform: translateY(10px); opacity: 0; }
                        100% { transform: translateY(0); opacity: 1; }
                    }
                    
                    @keyframes slideLeft {
                        0% { transform: translateX(10px); opacity: 0; }
                        100% { transform: translateX(0); opacity: 1; }
                    }
                `}</style>

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
                                        <Button
                                            variant="solid"
                                            block
                                            onClick={card.onClick}
                                        >
                                            {card.buttonText}
                                        </Button>
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

export default ContentLink;

// import React from 'react';
// import { Layout, Card, Avatar, Row, Col, Button } from 'antd';
//
// const { Meta } = Card;
//
// const ContentLink = ({
//   onToggleTables,
//   onToggleSchedule,
//   onToggleDocuments,
//     onToggleNewsFeed,
//   tableButtonText,
//   scheduleButtonText,
//   documentsButtonText,
//     newsButtonText
// }) => {
//     return (
//         <Layout>
//             <Layout.Content>
//                 <Row gutten={[16, 16]} style={{ marginBottom: "20px", justifyContent: "center", marginTop: "20px" }}>
//                     <Col xs={24} sm={12} md={8} lg={6}>
//                         <Card style={{ width: "98%" }}>
//                             <Meta
//                                 avatar={<Avatar shape="square" size={64} src="/images/icon001.png" />}
//                                 title="Турнирная таблица"
//                                 description={<Button variant="solid" block onClick={onToggleTables}>{tableButtonText}</Button>}
//                             />
//                         </Card>
//                     </Col>
//                     <Col xs={24} sm={12} md={8} lg={6}>
//                         <Card style={{ width: "98%" }}>
//                             <Meta
//                                 avatar={<Avatar shape="square" size={64} src="/images/icon002.png" />}
//                                 title="Календарь лиги"
//                                 description={<Button variant="solid" block onClick={onToggleSchedule}>{scheduleButtonText}</Button>}
//                             />
//                         </Card>
//                     </Col>
//                     <Col xs={24} sm={12} md={8} lg={6}>
//                         <Card style={{ width: "98%" }}>
//                             <Meta
//                                 avatar={<Avatar shape="square" size={64} src="/images/icon003.png" />}
//                                 title="Регламент и правила"
//                                 description={<Button variant="solid" block onClick={onToggleDocuments}>{documentsButtonText}</Button>}
//                             />
//                         </Card>
//                     </Col>
//                     <Col xs={24} sm={12} md={8} lg={6}>
//                         <Card style={{ width: "98%" }}>
//                             <Meta
//                                 avatar={<Avatar shape="square" size={64} src="/images/icon004.png" />}
//                                 title="Новости лиги"
//                                 description={<Button variant="solid" block onClick={onToggleNewsFeed}>{newsButtonText}</Button>}
//                             />
//                         </Card>
//                     </Col>
//                 </Row>
//             </Layout.Content>
//         </Layout>
//     );
// };
//
// export default ContentLink;
