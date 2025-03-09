import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    console.log("[AuthContext] Проверка localStorage...");
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("[AuthContext] Найден пользователь в localStorage:", user);
      setIsAuthenticated(user.isAuthenticated);
      setCurrentUser(user);
      setIsModerator(user.isModerator || false);
    } else {
      console.log("[AuthContext] Пользователь не найден в localStorage");
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log("[AuthContext] Обновление состояния из localStorage:", user);
        setIsAuthenticated(user.isAuthenticated);
        setCurrentUser(user);
        setIsModerator(user.isModerator || false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (user) => {
    console.log("[AuthContext] Вход пользователя:", user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setIsAuthenticated(true);
    setCurrentUser(user);
    setIsModerator(user.isModerator || false);
  };

  const logout = () => {
    console.log("[AuthContext] Выход пользователя");
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsModerator(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, isModerator, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
