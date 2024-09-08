import React, { useState, useEffect } from 'react';
import '../css/Charge.css';
import { FaCoins, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Charge = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/info`);
        setUser(response.data);
        setAnimatedBalance(response.data.point || 0);
      } catch (err) {
        console.error('Error fetching user info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const requestPay = () => {
    if (!selectedPackage) return;

    const { IMP } = window;
    const tIMP = process.env.REACT_APP_IMP;
    IMP.init(tIMP);

    // 결제 요청
    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `merchant_${new Date().getTime()}`,
        name: selectedPackage.points + ' 포인트',
        amount: selectedPackage.price,
        buyer_email: user.email,
        buyer_name: user.name,
        buyer_tel: user.phone,
        buyer_addr: user.address,
        buyer_postcode: user.postcode,
      },
      async function (rsp) {
        if (rsp.success) {
          console.log('결제 성공', rsp);
          try {
            // 결제 성공 시 서버로 충전 요청
            await axios.post('/api/users/charge', {
              userId: user.id, // 실제 유저 ID를 사용
              point: selectedPackage.points, // 충전할 포인트
              imp_uid: rsp.imp_uid, // 결제 고유 번호
              merchant_uid: rsp.merchant_uid, // 상점 거래 고유 번호
            });
            alert('충전이 완료되었습니다!');
          } catch (error) {
            console.error('충전 요청 중 오류 발생:', error);
            alert('충전 중 오류가 발생했습니다. 다시 시도해 주세요.');
          }
        } else {
          alert('결제에 실패하였습니다. 에러 내용: ' + rsp.error_msg);
        }
      },
    );
  };

  const packages = [
    { points: 100, price: 100 },
    { points: 300, price: 3000 },
    { points: 500, price: 5000 },
    { points: 1000, price: 10000 },
    { points: 2000, price: 20000 },
    { points: 3000, price: 30000 },
    { points: 5000, price: 50000 },
    { points: 10000, price: 100000 },
  ];

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <div className="error">User information not available</div>;

  return (
    <div className="charge">
      <h1>
        <FaCoins /> 포인트 충전
      </h1>
      <div className="package-container">
        {packages.map((pkg) => (
          <div
            key={pkg.points}
            className={`package ${selectedPackage === pkg ? 'selected' : ''}`}
            onClick={() => setSelectedPackage(pkg)}
          >
            <span className="points">{pkg.points} 포인트</span>
            <span className="price">{pkg.price.toLocaleString()}원</span>
          </div>
        ))}
      </div>
      <button
        className={`charge-button ${!selectedPackage ? 'disabled' : ''}`}
        onClick={requestPay}
        disabled={!selectedPackage}
      >
        {selectedPackage
          ? `${selectedPackage.points} 포인트 충전하기`
          : '충전할 포인트를 선택하세요'}
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Charge;
