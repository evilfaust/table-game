import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { Spin } from 'antd';

const PrivateRoute = ({ children, moderatorOnly = false }) => {
  const { loading, isAuthenticated, currentUser } = useAuth();

  if (loading) {
    return <Spin />;
  }

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
//
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../utils/AuthContext';
//
// const PrivateRoute = ({ children, moderatorOnly = false }) => {
//   const { isAuthenticated, currentUser } = useAuth();
//
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }
//
//   if (moderatorOnly && !currentUser?.isModerator) {
//     return <Navigate to="/" />;
//   }
//
//   return children;
// };
//
// export default PrivateRoute;
