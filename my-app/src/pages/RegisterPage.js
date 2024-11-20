import React from 'react';
import { Form, Input, Button, message } from 'antd';
import api from '../services/api';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const onFinish = async (values) => {
    try {
      // Add the role to the values since it's in the received data
      const dataToSend = {
        username: values.username,
        password: values.password,
        fullname: values.fullname,
        address: values.address,
        phonenumber: values.phonenumber,
        email: values.email,
        role: 'user', // Static value for role, as per the received data
      };

      // Gọi API đăng ký với data mới
      await api.post('/register', dataToSend);
      message.success('Registration successful! You can now log in.');

      // Điều hướng về trang đăng nhập
      window.location.href = '/login';
    } catch (error) {
      message.error('Registration failed! Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <Form name="register" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="fullname"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item
          name="phonenumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^[0-9]{10}$/, message: 'Please enter a valid phone number!' },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
        <p style={{ textAlign: 'center' }}><Link to="/login">Login</Link></p>
      </Form>
    </div>
  );
};

export default RegisterPage;
