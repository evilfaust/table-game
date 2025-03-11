import React from 'react';
import { Button, Divider } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import '../components/base/Navbar.css'; // Используем стили Navbar для единообразия

const SecondaryMenu = () => {
  const { isAuthenticated, isModerator, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/login'); // Перенаправляем пользователя на страницу входа после выхода
  };

  const isActive = (path) => {
    // Если текущий путь равен или начинается с path, считаем кнопку активной
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="secondary-menu-container">
      <div className="secondary-desktop-menu">
        <Button
          type="text"
          ghost
          className={`rubik-mono-one-regular nav-bar-btn-sm ${isActive('/application-status') ? 'active' : ''}`}
          onClick={() => navigate('/application-status')}
        >
          Статус заявки
        </Button>
        <Button
          type="text"
          ghost
          className={`rubik-mono-one-regular nav-bar-btn-sm ${isActive('/team-application') ? 'active' : ''}`}
          onClick={() => navigate('/team-application')}
        >
          Подать заявку
        </Button>
        {isModerator && (
          <>
            <Button
              type="text"
              ghost
              className={`rubik-mono-one-regular nav-bar-btn-sm ${isActive('/moderator') ? 'active' : ''}`}
              onClick={() => navigate('/moderator')}
            >
              Модераторская панель
            </Button>
            <Button
              type="text"
              ghost
              className={`rubik-mono-one-regular nav-bar-btn-sm ${isActive('/moderatorstat') ? 'active' : ''}`}
              onClick={() => navigate('/moderatorstat')}
            >
              Статистика & аналитика
            </Button>
          </>
        )}
        <Button
          type="text"
          ghost
          className="rubik-mono-one-regular nav-bar-btn-sm"
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default SecondaryMenu;

