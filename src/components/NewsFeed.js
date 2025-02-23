
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, Alert, Layout, Modal } from 'antd';

const { Meta } = Card;
const { Content } = Layout;

const NewsFeed = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const proxyUrl = 'http://localhost:3050/fetch-news';
        const response = await fetch(`${proxyUrl}?groupId=218883068&count=50`); // Загружаем больше, чем 20
        const data = await response.json();

        if (data.response) {
          const filteredNews = data.response.items
            .filter(item => item.text && item.text.trim() !== '') // Убираем репосты
            .slice(0, 20); // Оставляем только 20 последних

          setNews(filteredNews);
        } else {
          setError('Ошибка при загрузке новостей.');
        }
      } catch {
        setError('Ошибка при подключении к API.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNews(null);
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Ошибка" description={error} type="error" />;

  return (
    <Layout style={{ background: 'transparent' }}>
      <Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Новости EMCO.TECH.SPORT</h2>

        <Row gutter={[16, 16]}>
          {news.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => openModal(item)}
                cover={
                  item.attachments?.[0]?.photo ? (
                    <img
                      alt="cover"
                      src={item.attachments[0].photo.sizes.slice(-1)[0].url}
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                  ) : null
                }
              >
                <Meta
                  title={item.text.length > 50 ? item.text.substring(0, 50) + '...' : item.text}
                  description={new Date(item.date * 1000).toLocaleString()}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Модальное окно */}
        <Modal
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
          width={600}
        >
          {selectedNews && (
            <div style={{ textAlign: 'center' }}>
              {selectedNews.attachments?.[0]?.photo && (
                <img
                  alt="cover"
                  src={selectedNews.attachments[0].photo.sizes.slice(-1)[0].url}
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }}
                />
              )}
              <h2 style={{ marginTop: '15px' }}>{selectedNews.text}</h2>
              <p style={{ textAlign: 'justify', marginTop: '10px' }}>{selectedNews.text}</p>
              <a
                href={`https://vk.com/wall${selectedNews.owner_id}_${selectedNews.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', marginTop: '10px', color: '#1890ff' }}
              >
                Читать полностью на VK
              </a>
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default NewsFeed;


// import React, { useState, useEffect } from 'react';
// import { Card, Row, Col, Spin, Alert, Layout, Modal } from 'antd';
//
// const { Meta } = Card;
// const { Content } = Layout;
//
// const NewsFeed = () => {
//   const [loading, setLoading] = useState(true);
//   const [news, setNews] = useState([]);
//   const [error, setError] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedNews, setSelectedNews] = useState(null);
//
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const proxyUrl = 'http://localhost:3050/fetch-news';
//         const response = await fetch(`${proxyUrl}?groupId=218883068&count=20`);
//         const data = await response.json();
//
//         if (data.response) {
//           setNews(data.response.items);
//         } else {
//           setError('Ошибка при загрузке новостей.');
//         }
//       } catch {
//         setError('Ошибка при подключении к API.');
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchNews();
//   }, []);
//
//   const openModal = (newsItem) => {
//     setSelectedNews(newsItem);
//     setModalVisible(true);
//   };
//
//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedNews(null);
//   };
//
//   if (loading) return <Spin size="large" />;
//   if (error) return <Alert message="Ошибка" description={error} type="error" />;
//
//   return (
//     <Layout style={{ background: 'transparent' }}>
//       <Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//         <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Новости EMCO.TECH.SPORT</h2>
//
//         <Row gutter={[16, 16]}>
//           {news.map((item) => (
//             <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
//               <Card
//                 hoverable
//                 onClick={() => openModal(item)}
//                 cover={
//                   item.attachments?.[0]?.photo ? (
//                     <img
//                       alt="cover"
//                       src={item.attachments[0].photo.sizes.slice(-1)[0].url}
//                       style={{ maxHeight: '200px', objectFit: 'cover' }}
//                     />
//                   ) : null
//                 }
//               >
//                 <Meta
//                   title={item.text ? item.text.substring(0, 50) + '...' : 'Без заголовка'}
//                   description={new Date(item.date * 1000).toLocaleString()}
//                 />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//
//         {/* Модальное окно */}
//         <Modal
//           open={modalVisible}
//           onCancel={closeModal}
//           footer={null}
//           width={600}
//         >
//           {selectedNews && (
//             <div style={{ textAlign: 'center' }}>
//               {selectedNews.attachments?.[0]?.photo && (
//                 <img
//                   alt="cover"
//                   src={selectedNews.attachments[0].photo.sizes.slice(-1)[0].url}
//                   style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px' }}
//                 />
//               )}
//               <h2 style={{ marginTop: '15px' }}>{selectedNews.text || 'Без заголовка'}</h2>
//               <p style={{ textAlign: 'justify', marginTop: '10px' }}>{selectedNews.text}</p>
//               <a
//                 href={`https://vk.com/wall${selectedNews.owner_id}_${selectedNews.id}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ display: 'block', marginTop: '10px', color: '#1890ff' }}
//               >
//                 Читать полностью на VK
//               </a>
//             </div>
//           )}
//         </Modal>
//       </Content>
//     </Layout>
//   );
// };
//
// export default NewsFeed;

// import React, { useState, useEffect } from 'react';
// import { Card, Row, Col, Spin, Alert, Layout } from 'antd';
//
// const { Meta } = Card;
// const { Content } = Layout;
//
// const NewsFeed = () => {
//   const [loading, setLoading] = useState(true);
//   const [news, setNews] = useState([]);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const proxyUrl = 'http://localhost:3050/fetch-news';
//         const response = await fetch(`${proxyUrl}?groupId=218883068&count=20`);
//         const data = await response.json();
//
//         if (data.response) {
//           setNews(data.response.items);
//         } else {
//           setError('Ошибка при загрузке новостей.');
//         }
//       } catch {
//         setError('Ошибка при подключении к API.');
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchNews();
//   }, []);
//
//   if (loading) return <Spin size="large" />;
//   if (error) return <Alert message="Ошибка" description={error} type="error" />;
//
//   return (
//     <Layout style={{ background: 'transparent' }}>
//       <Content style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//         <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Новости EMCO.TECH.SPORT</h2>
//
//         <Row gutter={[16, 16]}>
//           {news.map((item) => (
//             <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
//               <Card
//                 hoverable
//                 cover={
//                   item.attachments?.[0]?.photo ? (
//                     <img
//                       alt="cover"
//                       src={item.attachments[0].photo.sizes.slice(-1)[0].url}
//                       style={{ maxHeight: '200px', objectFit: 'cover' }}
//                     />
//                   ) : null
//                 }
//               >
//                 <Meta
//                   title={item.text ? item.text.substring(0, 50) + '...' : 'Без заголовка'}
//                   description={new Date(item.date * 1000).toLocaleString()}
//                 />
//                 <a href={`https://vk.com/wall${item.owner_id}_${item.id}`} target="_blank" rel="noopener noreferrer">
//                   Читать полностью
//                 </a>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Content>
//     </Layout>
//   );
// };
//
// export default NewsFeed;






// import React, { useState, useEffect } from 'react';
// import { Card, List, Spin, Alert } from 'antd';
//
// const { Meta } = Card;
//
// const NewsFeed = () => {
//   const [loading, setLoading] = useState(true);
//   const [news, setNews] = useState([]);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     // Замените на ваш access token и ID паблика
//     // const token = 'c4d4f584c4d4f584c4d4f5840bc7fe5167cc4d4c4d4f584a36db98e432a664fd219abb6';
//     const token = '30f306b730f306b730f306b77133d9a24b330f330f306b7574a494babdcc21eca852617';
//     const groupId = '218883068'; // Например, -123456789
//     const count = 5; // Количество постов для загрузки
//
//     const fetchNews = async () => {
//       try {
//         const response = await fetch(`https://api.vk.com/method/wall.get?owner_id=-${groupId}&count=${count}&access_token=${token}&v=5.131`);
//         const data = await response.json();
//
//         if (data.response) {
//           setNews(data.response.items);
//         } else {
//           setError('Ошибка при загрузке новостей.');
//         }
//       } catch (error) {
//         setError('Ошибка при подключении к API.');
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchNews();
//   }, []);
//
//   if (loading) {
//     return <Spin size="large" />;
//   }
//
//   if (error) {
//     return <Alert message="Ошибка" description={error} type="error" />;
//   }
//
//   return (
//     <div>
//       <h2>Новости EMCO.TECH.SPORT</h2>
//       <List
//         itemLayout="vertical"
//         size="large"
//         dataSource={news}
//         renderItem={(item) => (
//           <List.Item
//             key={item.id}
//             actions={[<a href={`https://vk.com/wall${item.owner_id}_${item.id}`} target="_blank" rel="noopener noreferrer">Читать</a>]}
//           >
//             <Card
//               hoverable
//               cover={item.attachments && item.attachments[0] ? <img alt="cover" src={item.attachments[0].photo.sizes[3].url} /> : null}
//             >
//               <Meta title={item.text || 'Без заголовка'} description={new Date(item.date * 1000).toLocaleString()} />
//             </Card>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };
//
// export default NewsFeed;
