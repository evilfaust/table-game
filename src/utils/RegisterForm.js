import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const RegisterForm = ({ onRegister }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setLoading(true);
    
    // Проверка сложности пароля
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(values.password)) {
      message.error('Пароль должен содержать минимум 8 символов, включая буквы, цифры и специальный символ');
      setLoading(false);
      return;
    }
    
    // Имитация задержки для регистрации
    setTimeout(() => {
      const success = onRegister({
        username: values.username,
        password: values.password,
        email: values.email,
        fullName: values.fullName
      });
      
      if (success) {
        form.resetFields();
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        label="Имя и фамилия"
        name="fullName"
        rules={[{ required: true, message: 'Пожалуйста, введите ваше имя и фамилию' }]}
      >
        <Input placeholder="Иван Иванов" />
      </Form.Item>
      
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Пожалуйста, введите ваш email' },
          { type: 'email', message: 'Пожалуйста, введите корректный email' }
        ]}
      >
        <Input placeholder="example@email.com" />
      </Form.Item>
      
      <Form.Item
        label="Логин"
        name="username"
        rules={[
          { required: true, message: 'Пожалуйста, создайте логин' },
          { min: 4, message: 'Логин должен содержать минимум 4 символа' }
        ]}
      >
        <Input placeholder="user123" />
      </Form.Item>
      
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          { required: true, message: 'Пожалуйста, создайте пароль' },
          { min: 8, message: 'Пароль должен содержать минимум 8 символов' }
        ]}
      >
        <Input.Password placeholder="Минимум 8 символов, включая буквы, цифры и специальный символ" />
      </Form.Item>
      
      <Form.Item
        label="Подтверждение пароля"
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Пожалуйста, подтвердите пароль' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Повторите пароль" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;