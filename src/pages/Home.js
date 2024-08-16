import React from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaExchangeAlt, FaWallet } from 'react-icons/fa';
import '../css/Home.css';
import { useSpring, animated } from 'react-spring';

const Home = () => {
  const recentItems = [
    {
      id: 1,
      title: '빈티지 시계',
      price: 50000,
      type: 'auction',
      image:
        'https://neo-image.s3.ap-northeast-2.amazonaws.com/test/92244722452024014036143178.jpg',
    },
    {
      id: 2,
      title: 'MacBook Pro',
      price: 1200000,
      type: 'used',
      image:
        'https://neo-image.s3.ap-northeast-2.amazonaws.com/test/%E1%84%86%E1%85%A2%E1%86%A8%E1%84%87%E1%85%AE%E1%86%A8%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9.jpg',
    },
    {
      id: 3,
      title: '가죽 소파',
      price: 300000,
      type: 'auction',
      image:
        'https://neo-image.s3.ap-northeast-2.amazonaws.com/test/%E1%84%80%E1%85%A1%E1%84%8C%E1%85%AE%E1%86%A8%E1%84%89%E1%85%A9%E1%84%91%E1%85%A1.jpg',
    },
    {
      id: 4,
      title: '다이슨 청소기',
      price: 250000,
      type: 'used',
      image:
        'https://neo-image.s3.ap-northeast-2.amazonaws.com/test/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%86%AB+%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%89%E1%85%A9%E1%84%80%E1%85%B5.jpg',
    },
  ];

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 1000 },
  });

  const popIn = useSpring({
    from: { transform: 'scale(0.8)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: { tension: 300, friction: 10 },
    delay: 600,
  });

  return (
    <div className="home">
      <div className="hero-section">
        <animated.div style={fadeIn} className="hero-content">
          <h1>🛒 Neo Market에 오신 것을 환영합니다!</h1>
          <animated.p style={popIn}>
            경매와 중고 거래를 한 곳에서 편리하게
          </animated.p>
        </animated.div>
        <div className="drip-container">
          {[...Array(15)].map((_, index) => (
            <div
              key={index}
              className="drip"
              style={{
                left: `${index * 7}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
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
              <img src={item.image} className="item-image" />
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
