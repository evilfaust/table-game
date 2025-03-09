import React from 'react';
import {Button, Divider, Layout} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const SecondaryMenu = () => {
  const { isAuthenticated, isModerator, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/login'); // После выхода отправляем пользователя на страницу входа
  };

  return (
    <Layout>
      <Layout.Content style={{ padding: "10px", textAlign: "center" }}>
        <Button type="primary" onClick={() => navigate('/application-status')} style={{ marginRight: 8 }}>
          Статус заявки
        </Button>
        <Button type="primary" onClick={() => navigate('/team-application')} style={{ marginRight: 8 }}>
          Подать заявку
        </Button>
        {isModerator && (
          <Button onClick={() => navigate('/moderator')} color="purple" variant="solid" style={{ marginRight: 8 }}>
            Модераторская панель
          </Button>
        )}
        <Button color="danger" variant="outlined" onClick={handleLogout}>
          Выйти
        </Button>
         <Divider style={{ borderColor: "#FEA202", margin: "8px 0" }} />
      </Layout.Content>
    </Layout>
  );
};

export default SecondaryMenu;
