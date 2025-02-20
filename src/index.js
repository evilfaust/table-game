import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
// import TeamsTable from './TeamsTable';
import HeroSection from './components/HeroSection';
import { Layout } from 'antd';
import Navbar from './components/Navbar';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Layout>
        <Navbar />
        <HeroSection />
        <Layout.Content style={{
          padding: "20px",
          width: "80%",     // Устанавливаем ширину контента на 80% экрана
          margin: "0 auto"  // Центрируем контент
        }}>
          <App />
        </Layout.Content>
      </Layout>
    </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

