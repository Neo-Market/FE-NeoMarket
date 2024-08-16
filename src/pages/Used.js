import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Used.css';

const Used = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 페이지 로드 시 중고 물품 목록을 API로부터 가져옴
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/used/list');
        setItems(response.data); // 데이터를 상태에 저장
      } catch (err) {
        setError('중고 물품을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching used items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCardClick = (usedId) => {
    navigate(`/used-items/${usedId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
