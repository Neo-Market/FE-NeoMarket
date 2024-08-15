import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Exchange.css';

function Exchange() {
  const location = useLocation();
  const navigate = useNavigate();

  // 상태값의 기본값을 정의합니다.
  const [exchangeAmount, setExchangeAmount] = useState('');

  // location.state가 존재하는지 여부를 확인하고, 존재하지 않을 경우 기본값을 설정합니다.
  const neoPayBalance = location.state ? location.state.neoPayBalance : 0;
  const accountNumber = location.state
    ? location.state.accountNumber
    : '정보 없음';
  const bankName = location.state ? location.state.bankName : '정보 없음';

  // 상태 값이 제대로 전달되었는지 콘솔로 확인합니다.
  console.log('Location state:', location.state);

  const handleExchange = () => {
    if (exchangeAmount <= 0 || exchangeAmount > neoPayBalance) {
      alert('환전 금액이 올바르지 않습니다.');
      return;
    }

    const isSuccess = true;
    if (isSuccess) {
      alert('환전이 성공적으로 완료되었습니다.');
      location.state.neoPayBalance -= exchangeAmount;
    } else {
      alert('환전이 실패하였습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="exchange-container">
      <h2 className="exchange-title">환전하기</h2>
      <div className="exchange-balance">
        <h3>총 보유 포인트: {neoPayBalance.toLocaleString()} 포인트</h3>
      </div>
      <div className="exchange-account">
        <h3>
          실명 계좌: {accountNumber} ({bankName})
        </h3>
      </div>
      <div className="exchange-input">
        <label>
          환전할 포인트:
          <input
            type="number"
            value={exchangeAmount}
            onChange={(e) => setExchangeAmount(e.target.value)}
            placeholder="환전할 포인트를 입력하세요"
            className="exchange-input-field"
          />
        </label>
      </div>
      <button className="exchange-button" onClick={handleExchange}>
        환전하기
      </button>
    </div>
  );
}

export default Exchange;
