import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888/api/v1', 
});

// Interceptor để tự động gắn token vào request nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
