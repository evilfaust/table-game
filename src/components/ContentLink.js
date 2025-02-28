import React, { useState, useEffect } from 'react';
import { Layout, Card, Avatar, Row, Col, Button } from 'antd';
import { useMediaQuery } from 'react-responsive';
import './contentlink.css'; // CSS для расширенного набора анимаций
import { getLatestKibercastLink } from './getLatestKibercastLink';
const { Meta } = Card;

const ContentLink = ({
  onToggleTables,
  onToggleSchedule,
  onToggleDocuments,
  onToggleNewsFeed,
  tableButtonText,
  scheduleButtonText,
  documentsButtonText,
  newsButtonText,
  activeSection,
  showCards
}) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    
    // Получение ссылки на последний киберкаст
    const [kibercastLink, setKibercastLink] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchKibercastLink = async () => {
          try {
            setLoading(true);
            const result = await getLatestKibercastLink();
            
            if (result.success) {
              setKibercastLink(result);
              setError(null);
            } else {
              setError(result.error);
            }
          } catch (err) {
            setError('Произошла ошибка при получении ссылки');
          } finally {
            setLoading(false);
          }
        };
    
        fetchKibercastLink();
      }, []);
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
        { id: 1, section: 'tables', title: "Рейтинговая таблица", icon: "/images/icon001.png", onClick: onToggleTables, buttonText: tableButtonText, openInNewTab: false  },
        { id: 2, section: 'schedule', title: "Календарь лиги", icon: "/images/icon002.png", onClick: onToggleSchedule, buttonText: scheduleButtonText, openInNewTab: false  },
        { id: 3, section: 'documents', title: "Регламент и правила", icon: "/images/icon003.png", onClick: onToggleDocuments, buttonText: documentsButtonText, openInNewTab: false  },
        { id: 4, section: 'newsfeed', title: "Новости лиги", icon: "/images/icon004.png", onClick: onToggleNewsFeed, buttonText: newsButtonText, openInNewTab: false  },
        { id: 5, section: 'partners', title: "Партнеры лиги", icon: "/images/icon005.png", link: "/about#partneri", buttonText: "Перейти", openInNewTab: false  },
        { id: 6, section: 'etl', title: "Отчеты с ETL", icon: "/images/icon006.png", link: "/etl", buttonText: "Смотреть отчеты", openInNewTab: false  },
        { id: 7, section: 'stats', title: "Статистика", icon: "/images/icon007.png", link: "#", buttonText: "Открыть статистику", openInNewTab: true  },
        { id: 8, section: 'kibercast', title: "Киберкаст", icon: "/images/icon008.png", link: kibercastLink?.link || "#", buttonText: "Перейти к киберкасту", openInNewTab: true  }
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
    }, [cards]);

    // Получаем стиль анимации для текущей аватарки
    const getAnimationStyle = (cardId) => {
        if (animatingAvatar === cardId) {
            const animation = animations.find(a => a.name === animationType);
            return animation ? animation.style : {};
        }
        return {};
    };

    // Определяем, нужно ли показывать карточки
    const shouldShowCards = !isMobile || (isMobile && showCards);
    
    // Фильтруем карточки для отображения
    const visibleCards = shouldShowCards ? cards : [];

    return (
        <Layout>
            <Layout.Content>
                <Row gutter={[16, 16]} style={{ marginBottom: "20px", justifyContent: "center", marginTop: "20px" }}>
                    {visibleCards.map(card => {
                        // Проверяем, является ли это карточкой киберкаста и загружена ли ссылка
                        const isKibercast = card.id === 8;
                        const isKibercastLoading = isKibercast && loading;
                        const isKibercastError = isKibercast && error;
                        
                        return (
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
                                            isKibercastLoading ? (
                                                <Button variant="solid" block disabled>
                                                    Загрузка...
                                                </Button>
                                            ) : isKibercastError ? (
                                                <Button variant="solid" block disabled>
                                                    Нет актуального киберкаста
                                                </Button>
                                            ) : card.link ? (
                                                <Button 
                                                    href={card.link} 
                                                    variant="solid" 
                                                    block 
                                                    target={card.openInNewTab ? "_blank" : undefined}
                                                    rel={card.openInNewTab ? "noopener noreferrer" : undefined}
                                                >
                                                    {card.buttonText}
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="solid"
                                                    block
                                                    onClick={() => card.onClick(card.section)}
                                                >
                                                    {card.buttonText}
                                                </Button>
                                            )
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

export default ContentLink;


// import React, { useState, useEffect } from 'react';
// import { Layout, Card, Avatar, Row, Col, Button } from 'antd';
// import './contentlink.css'; // CSS для расширенного набора анимаций
// import { getLatestKibercastLink } from './getLatestKibercastLink';
// const { Meta } = Card;

// const ContentLink = ({
//   onToggleTables,
//   onToggleSchedule,
//   onToggleDocuments,
//   onToggleNewsFeed,
//   tableButtonText,
//   scheduleButtonText,
//   documentsButtonText,
//   newsButtonText
// }) => {
//     // Получение ссылки на последний киберкаст
//     const [kibercastLink, setKibercastLink] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     useEffect(() => {
//         const fetchKibercastLink = async () => {
//           try {
//             setLoading(true);
//             const result = await getLatestKibercastLink();
            
//             if (result.success) {
//               setKibercastLink(result);
//               setError(null);
//             } else {
//               setError(result.error);
//             }
//           } catch (err) {
//             setError('Произошла ошибка при получении ссылки');
//           } finally {
//             setLoading(false);
//           }
//         };
    
//         fetchKibercastLink();
//       }, []);
//     // Состояние для отслеживания текущей анимирующейся аватарки
//     const [animatingAvatar, setAnimatingAvatar] = useState(null);
//     // Состояние для отслеживания текущего типа анимации
//     const [animationType, setAnimationType] = useState(null);

//     // Расширенный массив с возможными анимациями
//     const animations = [
//         { name: 'pulse', style: { animation: 'pulse 1s' } },
//         { name: 'bounce', style: { animation: 'bounce 1s' } },
//         { name: 'shake', style: { animation: 'shake 0.5s' } },
//         { name: 'rotate', style: { animation: 'rotate360 1s' } },
//         { name: 'scale', style: { animation: 'scale 0.7s' } },
//         { name: 'flip', style: { animation: 'flip 1s' } },
//         { name: 'swing', style: { animation: 'swing 1s' } },
//         { name: 'wobble', style: { animation: 'wobble 1s' } },
//         { name: 'jello', style: { animation: 'jello 1s' } },
//         { name: 'flash', style: { animation: 'flash 1s' } },
//         { name: 'rubberBand', style: { animation: 'rubberBand 1s' } },
//         { name: 'tada', style: { animation: 'tada 1s' } },
//         { name: 'heartBeat', style: { animation: 'heartBeat 1.3s' } },
//         { name: 'slideUp', style: { animation: 'slideUp 1s' } },
//         { name: 'slideLeft', style: { animation: 'slideLeft 1s' } }
//     ];

//     // Данные о карточках
//     const cards = [
//         { id: 1, title: "Рейтинговая таблица", icon: "/images/icon001.png", onClick: onToggleTables, buttonText: tableButtonText, openInNewTab: false  },
//         { id: 2, title: "Календарь лиги", icon: "/images/icon002.png", onClick: onToggleSchedule, buttonText: scheduleButtonText, openInNewTab: false  },
//         { id: 3, title: "Регламент и правила", icon: "/images/icon003.png", onClick: onToggleDocuments, buttonText: documentsButtonText, openInNewTab: false  },
//         { id: 4, title: "Новости лиги", icon: "/images/icon004.png", onClick: onToggleNewsFeed, buttonText: newsButtonText, openInNewTab: false  },
//         { id: 5, title: "Партнеры лиги", icon: "/images/icon005.png", link: "/about#partneri", buttonText: "Перейти", openInNewTab: false  },
//         { id: 6, title: "Отчеты с ETL", icon: "/images/icon006.png", link: "/etl", buttonText: "Смотреть отчеты", openInNewTab: false  },
//         { id: 7, title: "Статистика", icon: "/images/icon007.png", link: "#", buttonText: "Открыть статистику", openInNewTab: true  },
//         { id: 8, title: "Киберкаст", icon: "/images/icon008.png", link: kibercastLink?.link || "#", buttonText: "Перейти к киберкасту", openInNewTab: true  }
//     ];

//     useEffect(() => {
//         // Функция для выбора случайной аватарки и анимации
//         const animateRandomAvatar = () => {
//             // Выбираем случайную аватарку
//             const randomCardIndex = Math.floor(Math.random() * cards.length);
//             const randomCardId = cards[randomCardIndex].id;

//             // Выбираем случайную анимацию
//             const randomAnimationIndex = Math.floor(Math.random() * animations.length);
//             const randomAnimation = animations[randomAnimationIndex];

//             // Устанавливаем анимацию
//             setAnimatingAvatar(randomCardId);
//             setAnimationType(randomAnimation.name);

//             // Сбрасываем анимацию через указанное время
//             setTimeout(() => {
//                 setAnimatingAvatar(null);
//                 setAnimationType(null);
//             }, 1000); // 1 секунда для анимации
//         };

//         // Устанавливаем интервал для случайной анимации
//         const intervalId = setInterval(animateRandomAvatar, 5000); // Каждые 5 секунд

//         // Очищаем интервал при размонтировании компонента
//         return () => clearInterval(intervalId);
//     }, [cards]);

//     // Получаем стиль анимации для текущей аватарки
//     const getAnimationStyle = (cardId) => {
//         if (animatingAvatar === cardId) {
//             const animation = animations.find(a => a.name === animationType);
//             return animation ? animation.style : {};
//         }
//         return {};
//     };

//     return (
//         <Layout>
//             <Layout.Content>
//                 <Row gutter={[16, 16]} style={{ marginBottom: "20px", justifyContent: "center", marginTop: "20px" }}>
//                     {cards.map(card => {
//                         // Проверяем, является ли это карточкой киберкаста и загружена ли ссылка
//                         const isKibercast = card.id === 8;
//                         const isKibercastLoading = isKibercast && loading;
//                         const isKibercastError = isKibercast && error;
                        
//                         return (
//                             <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
//                                 <Card style={{ width: "98%" }}>
//                                     <Meta
//                                         avatar={
//                                             <Avatar
//                                                 shape="square"
//                                                 size={64}
//                                                 src={card.icon}
//                                                 style={getAnimationStyle(card.id)}
//                                             />
//                                         }
//                                         title={card.title}
//                                         description={
//                                             isKibercastLoading ? (
//                                                 <Button variant="solid" block disabled>
//                                                     Загрузка...
//                                                 </Button>
//                                             ) : isKibercastError ? (
//                                                 <Button variant="solid" block disabled>
//                                                     Нет актуального киберкаста
//                                                 </Button>
//                                             ) : card.link ? (
//                                                 <Button 
//                                                     href={card.link} 
//                                                     variant="solid" 
//                                                     block 
//                                                     target={card.openInNewTab ? "_blank" : undefined}
//                                                     rel={card.openInNewTab ? "noopener noreferrer" : undefined}
//                                                 >
//                                                     {card.buttonText}
//                                                 </Button>
//                                             ) : (
//                                                 <Button
//                                                     variant="solid"
//                                                     block
//                                                     onClick={card.onClick}
//                                                 >
//                                                     {card.buttonText}
//                                                 </Button>
//                                             )
//                                         }
//                                     />
//                                 </Card>
//                             </Col>
//                         );
//                     })}
//                 </Row>
//             </Layout.Content>
//         </Layout>
//     );
// };

// export default ContentLink;
