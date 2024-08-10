import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>🛒 Neo Market에 오신 것을 환영합니다!</h1>
      <div className="home-links">
        <Link to="/auction" className="home-link">
          <div className="home-link-box">
            <h2>경매 바로가기</h2>
            <p>다양한 상품의 경매에 참여해보세요.</p>
          </div>
        </Link>
        <Link to="/used-items" className="home-link">
          <div className="home-link-box">
            <h2>중고 거래 바로가기</h2>
            <p>원하는 물건을 저렴하게 구매하거나 판매해보세요.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
