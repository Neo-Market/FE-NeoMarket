import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Used.css';
import { FadeLoader } from 'react-spinners';
import { ShoppingBag } from 'lucide-react';

const Used = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/used/list`);
        setItems(response.data);
      } catch (err) {
        setError('중고 물품을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleCardClick = (usedId) => {
    navigate(`/used/${usedId}`);
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
      <h2 className="used-title">중고 물품 목록</h2>
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
              <h3>{item.title}</h3>
              <p className="used-item-price">{item.price.toLocaleString()}원</p>
              <p className="used-item-seller">{item.nickname}</p>
              <span className="used-item-type">
                <ShoppingBag size={12} /> 중고
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Used;
