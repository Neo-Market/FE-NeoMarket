import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/MyPage.css';

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [neoPayBalance, setNeoPayBalance] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        // 현재 로그인한 사용자의 ID를 가져오는 API 호출
        const currentUserResponse = await axios.get('/api/users/me');
        const userId = currentUserResponse.data.id;
        console.log(currentUserResponse);
        console.log(currentUserResponse.data);
        console.log(currentUserResponse.data.id);

        // 사용자 정보를 가져오는 API 호출
        const userInfoResponse = await axios.get(`/api/users/${userId}`);
        const userData = userInfoResponse.data;

        setUser(userData);
        setNeoPayBalance(userData.point || 0);
        setIsAdmin(userData.isAdmin || false); // 백엔드에서 isAdmin 필드를 제공한다고 가정
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('Failed to load user information');
        setLoading(false);
      }
    };

    fetchUserInfo();

    // 위시리스트 데이터 설정 (실제 API 호출로 대체 가능)
    setWishlist([
      { id: 1, title: '빈티지 시계', price: 50000, type: 'auction' },
      { id: 2, title: '가죽 소파', price: 200000, type: 'used' },
      { id: 3, title: 'MacBook Pro', price: 1500000, type: 'used' },
      { id: 4, title: '다이아몬드 반지', price: 300000, type: 'auction' },
    ]);
  }, []);

  const handleWishlistItemClick = (itemId, type) => {
    navigate(`/${type === 'auction' ? 'auction' : 'used-items'}/${itemId}`);
  };

  const exchangeOnClick = () => {
    navigate('/exchange', {
      state: {
        neoPayBalance: neoPayBalance,
        accountNumber: user.accountNumber,
        bankName: user.bankName,
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user information available</div>;

  return (
    <div className="mypage">
      <h1>마이페이지</h1>
      <div className="user-info">
        <h2>환영합니다, {user.name}님!</h2>
        <p>이메일: {user.email}</p>
        <p>닉네임: {user.nickname}</p>
        <p>주소: {user.address}</p>
        <p>은행: {user.bankName}</p>
        <p>계좌번호: {user.accountNumber}</p>
      </div>
      <div className="neopay-section">
        <h3>네오페이 잔액</h3>
        <p className="balance">{neoPayBalance.toLocaleString()}원</p>
        <div className="neopay-actions">
          <button
            onClick={() => navigate('/charge')}
            className="btn btn-charge"
          >
            충전
          </button>
          <button onClick={exchangeOnClick} className="btn btn-withdraw">
            환전
          </button>
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
