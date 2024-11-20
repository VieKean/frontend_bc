// redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    // Kiểm tra nếu 'user' tồn tại trong localStorage và đảm bảo không bị lỗi parse
    user: (() => {
      const user = localStorage.getItem('user');
      try {
        return user ? JSON.parse(user) : null;
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        return null;
      }
    })(),
    isAuthenticated: localStorage.getItem('token') ? true : false,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
