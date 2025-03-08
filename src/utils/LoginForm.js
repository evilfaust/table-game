import React, { useState } from 'react';
import { Button, Form, Input, message, Tabs } from 'antd';
import RegisterForm from './RegisterForm';

const { TabPane } = Tabs;

const LoginForm = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  
  // Имитация базы данных пользователей (в реальном приложении это должно быть на сервере)
  const [usersDB, setUsersDB] = useState([
    { username: 'admin', password: 'Zxasqw12#', role: 'admin' }
  ]);

  const handleLogin = (values) => {
    setLoading(true);
    
    // Имитация задержки для аутентификации
    setTimeout(() => {
      const user = usersDB.find(
        user => user.username === values.username && user.password === values.password
      );
      
      if (user) {
        // Сохраняем информацию о пользователе в localStorage
        localStorage.setItem('currentUser', JSON.stringify({
          username: user.username,
          role: user.role,
          isAuthenticated: true
        }));
        
        onLogin(true); // Успешная аутентификация
        message.success('Успешный вход!');
      } else {
        message.error('Неверный логин или пароль');
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegister = (newUser) => {
    // Проверка существования пользователя
    if (usersDB.some(user => user.username === newUser.username)) {
      message.error('Пользователь с таким логином уже существует');
      return false;
    }
    
    // Добавление нового пользователя
    setUsersDB([...usersDB, { ...newUser, role: 'user' }]);
    
    message.success('Регистрация успешна! Теперь вы можете войти.');
    setActiveTab('login');
    return true;
  };

  return (
    <div className="auth-container">
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Вход" key="login">
          <Form onFinish={handleLogin} layout="vertical">
            <Form.Item
              label="Логин"
              name="username"
              rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        
        <TabPane tab="Регистрация" key="register">
          <RegisterForm onRegister={handleRegister} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LoginForm;

// import React, { useState } from 'react';
// import { Button, Form, Input, message } from 'antd';

// const LoginForm = ({ onLogin }) => {
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (values) => {
//     setLoading(true);
//     // Имитация задержки для аутентификации
//     setTimeout(() => {
//       if (values.username === 'admin' && values.password === 'Zxasqw12#') {
//         onLogin(true); // Успешная аутентификация
//         message.success('Успешный вход!');
//       } else {
//         message.error('Неверный логин или пароль');
//       }
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <Form onFinish={handleSubmit} layout="vertical">
//       <Form.Item
//         label="Логин"
//         name="username"
//         rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         label="Пароль"
//         name="password"
//         rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
//       >
//         <Input.Password />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" loading={loading}>
//           Войти
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default LoginForm;