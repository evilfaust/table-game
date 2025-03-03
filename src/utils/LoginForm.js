import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';

const LoginForm = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    // Имитация задержки для аутентификации
    setTimeout(() => {
      if (values.username === 'admin' && values.password === 'Zxasqw12#') {
        onLogin(true); // Успешная аутентификация
        message.success('Успешный вход!');
      } else {
        message.error('Неверный логин или пароль');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
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
        <Button type="primary" htmlType="submit" loading={loading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;