// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AppHeader from './components/Header';
import AppFooter from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import './App.css';
function App() {
  return (
    <>
      <div className="header"><AppHeader /></div>
      <div className="breadcrumb"><Breadcrumb /></div>
      <div className="outlet">
        <Outlet />
      </div>
      <div className="footer"><AppFooter /></div>
    </>
  );
}

export default App;
