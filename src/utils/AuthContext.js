import React, { createContext, useState, useEffect, useContext } from 'react';

// Создаем контекст аутентификации
const AuthContext = createContext();

// Провайдер контекста
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверяем состояние аутентификации при загрузке приложения
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem('currentUser');
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        
        if (user.isAuthenticated) {
          setIsAuthenticated(true);
          setCurrentUser(user);
        }
      }
      
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  // Функция для входа пользователя
  const login = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  // Функция для выхода пользователя
  const logout = () => {
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        loading,
        login,
        logout,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста аутентификации
export const useAuth = () => useContext(AuthContext);

export default AuthContext;