import React from 'react';
import { Form, Input, Button, message } from 'antd';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { Link, useNavigate  } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await api.post('/login', values); // Gọi API đăng nhập
      const { token, user } = response.data;
  
      // Lưu token và thông tin user vào localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin user dưới dạng chuỗi JSON
  
      // Dispatch thông tin người dùng vào Redux
      dispatch(login({ token, user }));
  
      // Hiển thị thông báo thành công
      message.success('Đăng nhập thành công!');
  
      // Điều hướng sang trang chính
      navigate('/');
    } catch (error) {
      message.error('Đăng nhập thất bại! Vui lòng kiểm tra lại tài khoản và mật khẩu.');
    }
  };
  

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Đăng nhập tài khoản</h2>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng điền vào tài khoản!' }]}
        >
          <Input placeholder="Tài khoản" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng điền vào mật khẩu!' }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
    Đăng nhập
  </Button>
</Form.Item>
<p style={{ textAlign: 'center' }}>
  Bạn chưa có tài khoản? <Link to="/register">Bấm vào đây</Link>
</p>
      </Form>
    </div>
  );
};

export default LoginPage;
