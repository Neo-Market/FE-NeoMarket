import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Auction.css';
import { FadeLoader } from 'react-spinners';
import { ShoppingBag } from 'lucide-react';

const Auction = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auction/list`);
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
    <div className="auction">
      <h1 className="auction-title">경매 물품 목록</h1>
      <div className="auction-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="auction-item"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="auction-item-image">
              <img
                src={item.picture || '/placeholder-image.jpg'}
                alt={item.title}
              />
            </div>
            <div className="auction-item-content">
              <h3>{item.title}</h3>
              <p className="auction-item-price">{item.currentPrice}원</p>
              <p className="auction-item-seller">판매자: {item.nickname}</p>
              <span className="auction-item-type">
                <ShoppingBag size={12} /> 경매
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auction;
