import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css'; // Sử dụng bản reset của Ant Design
import { Provider } from 'react-redux';
import store from './redux/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './Route';
import { login } from './redux/authSlice';

// Khôi phục trạng thái từ localStorage khi tải lại trang
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

if (token && user) {
  try {
    // Lưu thông tin vào Redux store
    store.dispatch(login({ token, user: JSON.parse(user) }));
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

reportWebVitals();
