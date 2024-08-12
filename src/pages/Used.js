import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Used.css';

const Used = () => {
  const [items, setItems] = useState([
    { id: 1, title: '중고 노트북', price: 300000, seller: 'user1' },
    { id: 2, title: '소파', price: 150000, seller: 'user2' },
    { id: 3, title: '자전거', price: 80000, seller: 'user3' },
    { id: 4, title: '스마트폰', price: 200000, seller: 'user4' },
  ]);

  const navigate = useNavigate();

  const handleCardClick = (usedId) => {
    navigate(`/used-items/${usedId}`);
  };

  return (
    <div className="used">
      <h1 className="used-title">중고 물품 목록</h1>
      <div className="used-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="used-item"
            onClick={() => handleCardClick(item.id)}
          >
            <h2>{item.title}</h2>
            <p className="price">{item.price.toLocaleString()}원</p>
            <p className="seller">판매자: {item.seller}</p>
            <span className="item-type">중고</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Used;
