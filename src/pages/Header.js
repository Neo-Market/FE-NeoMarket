import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li className="logo">
            <Link to="/">Neo Market</Link>
          </li>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/auction">경매</Link>
          </li>
          <li>
            <Link to="/used-items">중고 거래</Link>
          </li>
          <li className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/mypage">MyPage</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
