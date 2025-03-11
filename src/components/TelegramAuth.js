import React, { useEffect, useState } from 'react';
import { Button, Layout, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../utils/AuthContext';
import pb from '../pb';

const TelegramAuth = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  console.log("[TelegramAuth] Компонент загружен. isAuthenticated:", isAuthenticated);

  const loadTelegramWidget = () => {
    if (widgetLoaded) return;
    console.log("[TelegramAuth] Загружаем Telegram виджет...");
    const container = document.getElementById('telegram-auth-container');
    if (container) {
      container.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?22';
      script.async = true;
      script.setAttribute('data-telegram-login', 'EtsRegistrationBot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-radius', '5');
      script.setAttribute('data-onauth', 'onTelegramAuth(user)');
      script.setAttribute('data-request-access', 'write');
      container.appendChild(script);
      setWidgetLoaded(true);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      loadTelegramWidget();
    }

    window.onTelegramAuth = async function (tgUser) {
      console.log("[TelegramAuth] Получены данные от Telegram:", tgUser);
      try {
        const fakeEmail = `${tgUser.id}@telegram.local`;
        const password = tgUser.id.toString();

        let authData;
        try {
          console.log("[TelegramAuth] Попытка входа в PocketBase...");
          authData = await pb.collection('users').authWithPassword(fakeEmail, password);
          console.log("[TelegramAuth] Успешный вход в PocketBase:", authData);
        } catch {
          console.log("[TelegramAuth] Пользователь не найден. Создаем нового...");
          await pb.collection('users').create({
            email: fakeEmail,
            password: password,
            passwordConfirm: password,
            telegramId: tgUser.id,
            firstName: tgUser.first_name,
            lastName: tgUser.last_name,
            username: tgUser.username,
            photoUrl: tgUser.photo_url,
          });
          authData = await pb.collection('users').authWithPassword(fakeEmail, password);
          console.log("[TelegramAuth] Новый пользователь создан и вошел:", authData);
        }

        if (!authData?.record) {
          console.error("[TelegramAuth] Ошибка: `record` не найден в ответе PocketBase", authData);
          message.error("Ошибка при получении данных пользователя.");
          return;
        }

        console.log("[TelegramAuth] Получаем обновленные данные пользователя...");
        const updatedUser = await pb.collection('users').getOne(authData.record.id);
        console.log("[TelegramAuth] Данные из PocketBase:", updatedUser);

        const userData = {
          id: updatedUser.id,
          firstName: updatedUser.firstName || "",
          lastName: updatedUser.lastName || "",
          username: updatedUser.username || "",
          isAuthenticated: true,
          isModerator: updatedUser.verified || false,
        };

        console.log("[TelegramAuth] Обновляем AuthContext и localStorage:", userData);
        login(userData);
        message.success(`Авторизация успешна: ${updatedUser.firstName}`);
        navigate('/');
      } catch (error) {
        console.error("[TelegramAuth] Ошибка при авторизации:", error);
        message.error('Ошибка при авторизации');
      }
    };
  }, [isAuthenticated]);

  return (
    <Layout>
      {!isAuthenticated ? (
        <div id="telegram-auth-container" style={{ textAlign: 'center' }}></div>
      ) : (
        <Layout.Content style={{ textAlign: 'center' }}>
          <h2>Добро пожаловать!</h2>
          <Button type="primary" onClick={() => navigate('/application-status')} style={{ marginRight: 8 }}>
            Статус заявки
          </Button>
          <Button type="primary" onClick={() => navigate('/team-application')} style={{ marginRight: 8 }}>
            Подать заявку
          </Button>
          {isAuthenticated && JSON.parse(localStorage.getItem('currentUser'))?.isModerator && (
            <Button onClick={() => navigate('/moderator')} style={{ marginRight: 8 }}>
              Модераторская панель
            </Button>
          )}
          <Button danger onClick={logout}>Выйти</Button>
        </Layout.Content>
      )}
    </Layout>
  );
};

export default TelegramAuth;
