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

    // 아임포트 초기화
    const { IMP } = window;
    const tIMP = process.env.REACT_APP_IMP;
    IMP.init(tIMP); // 자신의 가맹점 식별코드로 변경
  }, []);

  const requestPay = () => {
    const { IMP } = window;
    IMP.request_pay(
      {
        pg: 'html5_inicis', // KG이니시스 PG 파라미터 값
        pay_method: 'card', // 결제 방법
        merchant_uid: `merchant_${new Date().getTime()}`, // 주문번호
        name: '당근 10kg', // 상품 명
        amount: 200, // 금액
        buyer_email: 'gildong@gmail.com',
        buyer_name: '홍길동',
        buyer_tel: '010-4242-4242',
        buyer_addr: '서울특별시 강남구 신사동',
        buyer_postcode: '01181', // 쉼표 제거
      },
      function (rsp) {
        // 결제 결과에 따라 로직 수행
        if (rsp.success) {
          // 서버 검증 요청 부분
          console.log('결제 성공', rsp);
        } else {
          alert('결제에 실패하였습니다. 에러 내용: ' + rsp.error_msg);
        }
      },
    );
  };

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
          <button className="btn btn-charge" onClick={requestPay}>
            충전
          </button>
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
