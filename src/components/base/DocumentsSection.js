import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Avatar, Button, Spin, message } from 'antd';
import pb from '../../pb'; // Замените './pb' на актуальный путь к файлу с коннектором

const { Title } = Typography;
const { Meta } = Card;

const DocumentsSection = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Получаем данные коллекции DocumentsSection из PocketBase
        const result = await pb.collection('DocumentsSection').getList(1, 30);
        setDocuments(result.items);
      } catch (error) {
        console.error('Ошибка при загрузке документов:', error);
        message.error('Не удалось загрузить документы');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <Row justify="center" style={{ marginTop: 50 }}>
        <Spin size="large" />
      </Row>
    );
  }

  return (
    <div className="section">
      <div className="container">
        {/* Заголовок */}
        <Row justify="center" gutter={[16, 16]}>
          <Col lg={24} md={24} xs={24} style={{ textAlign: 'center', marginBottom: 16 }}>
            <Title level={2}>Нормативные документы</Title>
          </Col>
        </Row>

        {/* Карточки документов */}
        <Row gutter={[16, 16]}>
          {documents.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={12} lg={12}>
              <Card style={{ width: "100%" }}>
                <Meta
                  avatar={<Avatar shape="square" size={64} src={item.avatar} />}
                  title={item.title}
                  description={
                    <>
                      <p>{item.description}</p>
                      <Button
                        block
                        variant="solid"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'block', marginTop: '8px' }}
                      >
                        Смотреть
                      </Button>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default DocumentsSection;


// import React from 'react';
// import {Row, Col, Typography, Card, Avatar, Button} from 'antd';
//
// const { Title } = Typography;
// const { Meta } = Card;
//
// // Компонент документов
// const DocumentsSection = () => {
//   // Данные для карточек
//   const documentsData = [
//     {
//       title: "Общие положения",
//       avatar: "/images/icon010.png",
//       description: "",
//       button: {
//         text: "Смотреть",
//         href: "https://emcotech.site/assets/emcotech/esport/doc/esl1/emco-tech-sports-esl.pdf",
//       },
//     },
//     {
//       title: "Правила DOTA 2",
//       avatar: "/images/icon028.png",
//       description: "",
//       button: {
//         text: "Смотреть",
//         href: "https://emcotech.site/assets/emcotech/esport/doc/esl1/reglament-esl-dota-2.pdf",
//       },
//     },
//     {
//       title: "Правила CS 2",
//       avatar: "/images/icon035.png",
//       description: "",
//       button: {
//         text: "Смотреть",
//         href: "https://emcotech.site/assets/emcotech/esport/doc/esl1/reglament-cs-2.pdf",
//       },
//     },
//   ];
//
//   return (
//     <div className="section">
//       <div className="container">
//         {/* Заголовок */}
//         <Row justify="center" gutter={[16, 16]}>
//           <Col lg={24} md={24} xs={24} style={{ textAlign: 'center', marginBottom: 16 }}>
//             <Title level={2}>Нормативные документы</Title>
//           </Col>
//         </Row>
//
//         {/* Карточки через map */}
//         <Row gutter={[16, 16]}>
//           {documentsData.map((item, index) => (
//             <Col key={index} xs={24} sm={12} md={12} lg={12}>
//               <Card style={{ width: "100%" }}>
//                 <Meta
//                   avatar={<Avatar shape="square" size={64} src={item.avatar} />}
//                   title={item.title}
//                   description={
//                     <>
//                       <p>{item.description}</p>
//                       <Button
//                           block
//                           variant="solid"
//                           href={item.button.href}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           style={{ display: 'block', marginTop: '8px' }}
//                       >
//                         {item.button.text}
//                       </Button>
//                     </>
//                   }
//                 />
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// };
//
// export default DocumentsSection;
