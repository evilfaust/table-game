// src/components/TelegramAuth.js
import React, { useEffect, useState } from 'react';
import { Button, Layout, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import pb from '../pb';

const TelegramAuth = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!pb.authStore.token);

  // Функция загрузки виджета Telegram
  const loadTelegramWidget = () => {
    const container = document.getElementById('telegram-auth-container');
    if (container) {
      container.innerHTML = ''; // очищаем контейнер
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.async = true;
      script.setAttribute('data-telegram-login', 'EtsRegistrationBot'); // замените на имя вашего бота
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '5');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-request-access', 'write');
      container.appendChild(script);
    }
  };

  useEffect(() => {
    // При монтировании пробуем загрузить данные аутентификации из localStorage
    const storedAuth = localStorage.getItem('pb_auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        pb.authStore.token = authData.token;
        pb.authStore.model = authData.model;
        setIsAuthenticated(!!pb.authStore.token);
      } catch (error) {
        console.error('Ошибка загрузки аутентификации из localStorage', error);
      }
    }
    // Если пользователь не аутентифицирован, загружаем виджет
    if (!pb.authStore.token) {
      loadTelegramWidget();
    }

    window.onTelegramAuth = async function (user) {
      console.log('Telegram user data:', user);
      try {
        const fakeEmail = `${user.id}@telegram.local`;
        const password = user.id.toString();

        let authData;
        try {
          authData = await pb.collection('users').authWithPassword(fakeEmail, password);
        } catch (loginError) {
          await pb.collection('users').create({
            email: fakeEmail,
            password: password,
            passwordConfirm: password,
            telegramId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            photoUrl: user.photo_url,
          });
          authData = await pb.collection('users').authWithPassword(fakeEmail, password);
        }
        // Сохраняем данные аутентификации в localStorage вручную
        localStorage.setItem('pb_auth', JSON.stringify({ token: pb.authStore.token, model: pb.authStore.model }));
        setIsAuthenticated(true);
        message.success(`Авторизация успешна: ${user.first_name} ${user.last_name}`);
        // После успешной авторизации можно перейти на страницу подачи заявки, или просто показать навигацию
      } catch (error) {
        message.error('Ошибка при авторизации через Telegram');
        console.error(error);
      }
    };
  }, [navigate]);

  const logout = () => {
    pb.authStore.clear();
    localStorage.removeItem('pb_auth');
    setIsAuthenticated(false);
    message.success("Вы вышли из системы");
    // После выхода загружаем виджет заново, чтобы пользователь мог войти под другим аккаунтом
    loadTelegramWidget();
  };

  const renderNavigation = () => (
    <Layout>
      <Layout.Content style={{ padding: "10px", width: isMobile ? "97%" : "80%", margin: "0 auto" }}>
        <h2>Добро пожаловать!</h2>
        <Button type="primary" onClick={() => navigate('/application-status')} style={{ marginRight: 8 }}>
          Статус заявки
        </Button>
        <Button type="primary" onClick={() => navigate('/team-application')} style={{ marginRight: 8 }}>
          Подать заявку
        </Button>
        <Button onClick={() => navigate('/moderator')} style={{ marginRight: 8 }}>
          Модераторская панель
        </Button>
        <Button danger onClick={logout}>
          Выйти
        </Button>
      </Layout.Content>
    </Layout>
  );

  return (
    <>
      <div id="telegram-auth-container" style={{ padding: "10px", width: isMobile ? "97%" : "80%", margin: "0 auto" }}></div>
      {isAuthenticated ? renderNavigation() : <h2>Войдите через Telegram для регистрации</h2>}
    </>
  );
};

export default TelegramAuth;
