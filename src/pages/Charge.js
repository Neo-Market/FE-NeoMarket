import React from 'react';
import '../css/Charge.css';

function Charge() {
  const requestPay = (points, price) => {
    const { IMP } = window;
    const tIMP = process.env.REACT_APP_IMP;
    IMP.init(tIMP); // 자신의 가맹점 식별코드로 변경
    IMP.request_pay(
      {
        pg: 'html5_inicis', // KG이니시스 PG 파라미터 값
        pay_method: 'card', // 결제 방법
        merchant_uid: `merchant_${new Date().getTime()}`, // 주문번호
        name: points + ' 포인트', // 상품 명
        amount: price, // 금액
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

  const packages = [
    { points: 100, price: 1000 },
    { points: 300, price: 3000 },
    { points: 500, price: 5000 },
    { points: 1000, price: 10000 },
    { points: 2000, price: 20000 },
    { points: 3000, price: 30000 },
    { points: 5000, price: 50000 },
    { points: 10000, price: 100000 },
  ];

  return (
    <div className="Charge">
      <h1>포인트 충전</h1>
      <div className="package-container">
        {packages.map((pkg) => (
          <div
            key={pkg.points}
            className="package"
            onClick={() => requestPay(pkg.points, pkg.price)}
          >
            <span className="points">{pkg.points} 포인트</span>
            <span className="price">{pkg.price}원</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Charge;
