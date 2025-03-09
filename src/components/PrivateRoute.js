// src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const PrivateRoute = ({ children, moderatorOnly = false }) => {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (moderatorOnly && !currentUser?.isModerator) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

// // src/components/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
//
// // Пример простой проверки. Реализуйте свою логику аутентификации (например, используя Context или Redux)
// const PrivateRoute = ({ children }) => {
//   // Здесь должен быть ваш механизм проверки аутентификации
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Пример, заменить на реальную проверку
//
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };
//
// export default PrivateRoute;
