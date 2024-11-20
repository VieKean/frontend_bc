import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Đảm bảo đã nhập phần JS của Bootstrap
import Navbar from './Navbar';

const AppHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-2">
        <a href="/" className="d-flex align-items-center text-decoration-none">
          <img
            src="http://localhost:8888/images/logo.jpg"
            alt="logo BÁO GEAR"
            className="rounded-circle"
            style={{ width: '80px', height: '80px' }}
          />
          <span className="ms-3 fw-bold fs-4" style={{ color: '#254753' }}>
            BÁO GEAR
          </span>
        </a>
        <div className="d-flex align-items-center">
          <span className="me-3">Tổng đài hỗ trợ/ Hotline: 0949 068 911</span>
          {isAuthenticated ? (
            <div className="dropdown">
              <button
                className="btn btn-link dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Xin chào, {user?.fullname || 'User'}!
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <Link className="dropdown-item" to="/account">Tài khoản của tôi</Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline-primary">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
      <Navbar />
    </header>
  );
};

export default AppHeader;
