import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import HeroSection from './components/HeroSection';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import EsportAbout from './components/EsportAbout';
import { Row, Col } from 'antd';
import TableCS2 from './components/TableCS2';
import TableDOTA2 from './components/TableDOTA2';
// import { Divider } from 'antd';

// Проверяем, существует ли элемент с id="root"
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Ошибка: элемент с id="root" не найден. Убедитесь, что он есть в index.html.');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Layout>
      <Navbar />
      <HeroSection />
      <Layout.Content style={{
        padding: "10px",
        width: "80%",
        margin: "0 auto"
      }}>
      <EsportAbout />
      </Layout.Content>
      <Layout.Content style={{
        padding: "5px 0px",
        width: "97%",
        margin: "0 auto"
      }}>
        {/* <Divider style={{ margin: '2px 0' }} /> */}
        <Row gutten={[16, 16]}>
          <Col sm={24} xs={24}  md={24} lg={12} style={{padding: "0px 10px"}}>
            <TableCS2 />
          </Col>
          <Col sm={24} xs={24}  md={24} lg={12} style={{padding: "0px 10px"}}>
            <TableDOTA2 />
          </Col>
        </Row>
        {/* <App /> */}
      </Layout.Content>
    </Layout>
  );
}

// Запуск измерения производительности
reportWebVitals();
