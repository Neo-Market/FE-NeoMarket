import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaGavel, FaExchangeAlt, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import '../css/Header.css';
import GoogleLoginComponent from './GoogleLoginComponent';

const Header = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/users/info`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setUser(null);
        } else {
          console.error('Error fetching user info:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMyPageClick = () => {
    navigate('/mypage');
    setShowDropdown(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/logout`);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSellClick = () => {
    const userId = localStorage.getItem('userId');
    // userId가 없으면 로그인이 필요한 상태임
    if (!userId) {
      alert('판매하기 위해서는 로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 리다이렉트
      return;
    }

    // userId가 있으면 게시글 생성 페이지로 이동
    navigate('/create-post');
  };

  return (
    <header className="header">
      <nav>
        <NavLink to="/" className="logo">
          Neo Market
        </NavLink>
        <div className="nav-links-container">
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
              <NavLink to="/used">
                <FaExchangeAlt /> 중고 거래
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="auth-links">
          <button onClick={handleSellClick} className="sell-button">
            <FaPlus /> 판매하기
          </button>
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : user ? (
            <div className="user-profile">
              <div className="profile-image-container" onClick={toggleDropdown}>
                <img
                  src={user.picture}
                  alt="User Profile"
                  className="profile-image"
                />
              </div>
              {showDropdown && (
                <div className="dropdown">
                  <button onClick={handleMyPageClick}>마이페이지</button>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              )}
            </div>
          ) : (
            <GoogleLoginComponent />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
