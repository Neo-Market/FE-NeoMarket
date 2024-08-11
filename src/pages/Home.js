import React from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaExchangeAlt, FaWallet } from 'react-icons/fa';
import '../css/Home.css';

const Home = () => {
  // 임시 데이터, 실제로는 API에서 가져와야 합니다
  const recentItems = [
    { id: 1, title: '빈티지 시계', price: 50000, type: 'auction' },
    { id: 2, title: 'MacBook Pro', price: 1200000, type: 'used' },
    { id: 3, title: '가죽 소파', price: 300000, type: 'auction' },
    { id: 4, title: '다이슨 청소기', price: 250000, type: 'used' },
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <h1>🛒 Neo Market에 오신 것을 환영합니다!</h1>
        <p>경매와 중고 거래를 한 곳에서 편리하게</p>
      </div>

      <div className="features-section">
        <Link to="/auction" className="feature">
          <FaGavel className="feature-icon" />
          <h2>실시간 경매</h2>
          <p>다양한 상품의 경매에 실시간으로 참여하세요.</p>
        </Link>
        <Link to="/used-items" className="feature">
          <FaExchangeAlt className="feature-icon" />
          <h2>중고 거래</h2>
          <p>원하는 물건을 저렴하게 구매하거나 판매하세요.</p>
        </Link>
        <Link to="/mypage/neopay" className="feature">
          <FaWallet className="feature-icon" />
          <h2>간편한 거래</h2>
          <p>네오페이로 안전하고 빠른 거래를 경험하세요.</p>
        </Link>
      </div>

      <div className="recent-items">
        <h2>최근 등록된 상품</h2>
        <div className="item-grid">
          {recentItems.map((item) => (
            <div key={item.id} className={`item-card ${item.type}`}>
              <h3>{item.title}</h3>
              <p>{item.price.toLocaleString()}원</p>
              <span className="item-type">
                {item.type === 'auction' ? '경매' : '중고'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
