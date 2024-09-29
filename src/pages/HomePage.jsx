import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage({ onLogout }) {
  return (
    <div className='d-flex'>
      <Navbar onLogout={onLogout} />
      <div className="w-100">
        <Outlet />
      </div>
    </div>
  );
}

export default HomePage;
