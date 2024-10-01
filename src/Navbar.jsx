import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // استيراد ملف CSS للتنسيق
import LogoutButton from './LogoutButton';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          MyApp
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/home" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <LogoutButton className="navbar-link" /> {/* إضافة زر تسجيل الخروج */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;