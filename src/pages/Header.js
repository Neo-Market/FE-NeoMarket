import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaGavel, FaExchangeAlt, FaUser } from 'react-icons/fa';
import '../css/Header.css';
import LoginComponent from './LoginComponent';

function Header() {
  return (
    <header className="header">
      <nav>
        <NavLink to="/" className="logo">
          Neo Market
        </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink to="/" exact>
              <FaHome /> 홈
            </NavLink>
          </li>
          <li>
            <NavLink to="/auction">
              <FaGavel /> 경매
            </NavLink>
          </li>
          <li>
            <NavLink to="/used-items">
              <FaExchangeAlt /> 중고 거래
            </NavLink>
          </li>
        </ul>
        <div className="auth-links">
          <LoginComponent />
          <NavLink to="/mypage">
            <FaUser /> 마이페이지
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
