import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Used.css';

const Used = () => {
  const [items, setItems] = useState([
    { id: 1, title: '중고 노트북', price: 300000, seller: 'user1' },
    { id: 2, title: '소파', price: 150000, seller: 'user2' },
    { id: 3, title: '자전거', price: 80000, seller: 'user3' },
  ]);

  const navigate = useNavigate();

  const handleCardClick = (usedId) => {
    navigate(`/used/${usedId}`);
  };

  return (
    <div className="used-items">
      <h1>중고 물품 목록</h1>
      <div className="item-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
            onClick={() => handleCardClick(item.id)}
          >
            <h2>{item.title}</h2>
            <p>가격: {item.price}원</p>
            <p>판매자: {item.seller}</p>
            <button>연락하기</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Used;
