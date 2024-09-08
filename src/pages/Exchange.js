import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Exchange.css';
import {
  FaExchangeAlt,
  FaWallet,
  FaUniversity,
  FaArrowRight,
} from 'react-icons/fa';

const Exchange = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const [exchangeAmount, setExchangeAmount] = useState('');
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

  useEffect(() => {
    if (user) {
      const timer = setInterval(() => {
        setAnimatedBalance((prev) => {
          const diff = user.point - prev;
          const increment = Math.ceil(diff / 10);
          return Math.min(prev + increment, user.point);
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [user]);

  const handleExchange = async () => {
    // 환전 금액이 올바른지 확인
    if (exchangeAmount <= 0 || exchangeAmount > user.point) {
      alert('환전 금액이 올바르지 않습니다.');
      return;
    }

    try {
      // 서버에 환전 요청 보내기
      await axios.post('/api/users/exchange', {
        userId: user.id, // 유저 ID 전달
        amount: parseInt(exchangeAmount), // 환전할 금액
      });

      // 성공 메시지 및 마이페이지로 이동
      alert('환전이 성공적으로 완료되었습니다.');
      navigate('/mypage');
    } catch (error) {
      // 서버에서 오는 응답 코드에 따른 오류 처리
      if (error.response) {
        const { status } = error.response;

        if (status === 400) {
          alert('잘못된 요청입니다. 입력값을 확인해주세요.');
        } else if (status === 402) {
          alert('잔액이 부족합니다.');
        } else if (status === 404) {
          alert('유저를 찾을 수 없습니다.');
        } else if (status === 500) {
          alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
          alert('환전 중 알 수 없는 오류가 발생했습니다.');
        }
      } else {
        console.error('Error during exchange:', error);
        alert('환전 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <div className="error">User information not available</div>;

  return (
    <div className="exchange-container">
      <h2 className="exchange-title">
        <FaExchangeAlt /> 환전하기
      </h2>
      <div className="exchange-card">
        <div className="exchange-info">
          <div className="info-item">
            <FaWallet className="info-icon" />
            <div>
              <h3>보유 포인트</h3>
              <p>{animatedBalance.toLocaleString()} P</p>
            </div>
          </div>
          <div className="info-item">
            <FaUniversity className="info-icon" />
            <div>
              <h3>환전 계좌</h3>
              <p>
                {user.accountNumber} ({user.bankName})
              </p>
            </div>
          </div>
        </div>
        <div className="exchange-input-container">
          <input
            type="number"
            value={exchangeAmount}
            onChange={(e) => setExchangeAmount(e.target.value)}
            placeholder="환전할 포인트를 입력하세요"
            className="exchange-input"
          />
          <span className="input-addon">P</span>
        </div>
        <button className="exchange-button" onClick={handleExchange}>
          환전하기 <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Exchange;
