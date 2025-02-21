import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import HeroSection from './components/HeroSection';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import EsportAbout from './components/EsportAbout';

import { Divider } from 'antd';

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
        padding: "20px",
        width: "80%",
        margin: "0 auto"
      }}>
        <EsportAbout />
        <Divider style={{ margin: '2px 0' }} />
        <App />
      </Layout.Content>
    </Layout>
  );
}

// Запуск измерения производительности
reportWebVitals();
