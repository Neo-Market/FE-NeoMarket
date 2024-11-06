import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGavel, FaExchangeAlt, FaWallet } from 'react-icons/fa';
import axios from 'axios';
import '../css/Home.css';
import { FadeLoader } from 'react-spinners';
import { useSpring, animated } from 'react-spring';

const Home = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/home`);
        setPosts(response.data);
      } catch (err) {
        setError('포스트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

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

  const handleCardClick = (post) => {
    if (post.postType === '경매') {
      navigate(`/auction/${post.postId}`);
    } else if (post.postType === '중고') {
      navigate(`/used/${post.postId}`);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FadeLoader color={'#4D607B'} loading={loading} size={50} />
      </div>
    );
  }
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home">
      <div className="hero-section">
        <animated.div style={fadeIn} className="hero-content">
          <h1 className="neo-market-title">🛍️ Neo Market</h1>
          <animated.p style={popIn}>
            경매와 중고 거래를 한 곳에서 편리하게!
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

      <div className="home-recent-products">
        <h2 className="home-section-title">최근 등록된 상품</h2>
        <div className="home-product-list">
          {posts.map((post) => (
            <div
              key={post.postId}
              className="home-product-item"
              onClick={() => handleCardClick(post)}
            >
              <div className="home-product-image">
                <img
                  src={post.imgUrl || '/placeholder-image.jpg'}
                  alt={post.postTitle}
                />
              </div>
              <div className="home-product-content">
                <h3>{post.postTitle}</h3>
                <p className="home-product-price">
                  {post.price.toLocaleString()}원
                </p>
                <p className="home-product-seller">{post.nickname}</p>
                <span className="home-product-type">{post.postType}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
