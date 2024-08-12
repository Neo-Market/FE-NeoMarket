import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/MyPage.css';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [neoPayBalance, setNeoPayBalance] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // API 호출 시뮬레이션
    setUser({ name: '홍길동' });
    setNeoPayBalance(50000);
    setWishlist([
      { id: 1, title: '빈티지 시계', price: 50000, type: 'auction' },
      { id: 2, title: '가죽 소파', price: 200000, type: 'used' },
      { id: 3, title: 'MacBook Pro', price: 1500000, type: 'used' },
      { id: 4, title: '다이아몬드 반지', price: 300000, type: 'auction' },
    ]);
    setIsAdmin(true);
  }, []);

  const handleWishlistItemClick = (itemId, type) => {
    navigate(`/${type === 'auction' ? 'auction' : 'used-items'}/${itemId}`);
  };

  return (
    <div className="mypage">
      <h1>마이페이지</h1>
      {user && (
        <div className="user-info">
          <h2>환영합니다, {user.name}님!</h2>
        </div>
      )}
      <div className="neopay-section">
        <h3>네오페이 잔액</h3>
        <p className="balance">{neoPayBalance.toLocaleString()}원</p>
        <div className="neopay-actions">
          <button className="btn btn-charge">충전</button>
          <button className="btn btn-withdraw">환전</button>
        </div>
      </div>
      <div className="wishlist-section">
        <h3>위시리스트</h3>
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="wishlist-item"
              onClick={() => handleWishlistItemClick(item.id, item.type)}
            >
              <h4>{item.title}</h4>
              <p className="price">{item.price.toLocaleString()}원</p>
              <span className={`item-type ${item.type}`}>
                {item.type === 'auction' ? '경매' : '중고'}
              </span>
            </div>
          ))}
        </div>
      </div>
      {isAdmin && (
        <div className="admin-section">
          <h3>관리자 기능</h3>
          <Link to="/admin/auction-dashboard" className="btn btn-admin">
            경매 대시보드
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPage;
