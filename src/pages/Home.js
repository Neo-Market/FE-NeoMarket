import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGavel, FaExchangeAlt, FaWallet } from 'react-icons/fa';
import axios from 'axios';
import '../css/Home.css';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        axios
          .get('/api/home')
          .then((response) => setPosts(response.data))
          .catch((error) => console.error('Error fetching data:', error));
      } catch (err) {
        console.error('Error fetching home info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

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
          {posts.map((post) => (
            <div key={post.postId} className={`item-card ${post.postType}`}>
              <h3>{post.postTitle}</h3>
              <p>{post.price}원</p>
              <span className="item-type">{post.postType}</span>
              <img src={post.imgUrl} className="item-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
