import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Used.css';
import { FadeLoader } from 'react-spinners';
import { ShoppingBag } from 'lucide-react';

const Auction = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/auction/list');
        setItems(response.data);
      } catch (err) {
        setError('경매 물품을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCardClick = (auctionId) => {
    navigate(`/auction/${auctionId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FadeLoader color={'#4D607B'} loading={loading} size={50} />
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="used">
      <h1 className="used-title">경매 물품 목록</h1>
      <div className="used-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="used-item"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="used-item-image">
              <img
                src={item.picture || '/placeholder-image.jpg'}
                alt={item.title}
              />
            </div>
            <div className="used-item-content">
              <h2>{item.title}</h2>
              <p className="price">{item.currentPrice}원</p>
              <p className="seller">판매자: {item.nickname}</p>
              <span className="item-type">
                <ShoppingBag size={14} /> 경매
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auction;
