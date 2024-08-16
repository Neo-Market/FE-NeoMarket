import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/MyPage.css';
import {
  FaMapMarkerAlt,
  FaUniversity,
  FaCreditCard,
  FaWallet,
  FaExchangeAlt,
  FaHeart,
  FaCog,
} from 'react-icons/fa';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [neoPayBalance, setNeoPayBalance] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUser(response.data);
        setNeoPayBalance(response.data.point || 0);
        setIsAdmin(response.data.isAdmin || false);
      } catch (err) {
        console.error('Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <div className="error">User information not available</div>;

  return (
    <div className="mypage">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.picture ? (
              <img src={user.picture} alt={user.name} />
            ) : (
              <span>{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="profile-info">
            <h2>{user.nickname}님, 안녕하세요!</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-item">
            <FaMapMarkerAlt className="icon" />
            <span>{user.address}</span>
          </div>
          <div className="detail-item">
            <FaUniversity className="icon" />
            <span>{user.bankName}</span>
          </div>
          <div className="detail-item">
            <FaCreditCard className="icon" />
            <span>{user.accountNumber}</span>
          </div>
        </div>
      </div>

      <div className="balance-card">
        <FaWallet className="balance-icon" />
        <div className="balance-info">
          <h3>네오페이 잔액</h3>
          <p className="balance">{neoPayBalance.toLocaleString()}원</p>
        </div>
      </div>

      <div className="action-grid">
        <button onClick={() => navigate('/charge')} className="action-button">
          <FaExchangeAlt className="icon" />
          <span>충전하기</span>
        </button>
        <button onClick={() => navigate('/exchange')} className="action-button">
          <FaExchangeAlt className="icon" />
          <span>환전하기</span>
        </button>
        <Link to={`/wishlist/${user.id}`} className="action-button">
          <FaHeart className="icon" />
          <span>위시리스트</span>
        </Link>
        {isAdmin && (
          <Link to="/admin/auction-dashboard" className="action-button admin">
            <FaCog className="icon" />
            <span>관리자 대시보드</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MyPage;
