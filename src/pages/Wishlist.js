import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Wishlist.css';
import { FadeLoader } from 'react-spinners';
import { Heart } from 'lucide-react';

const Wishlist = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/users/${userId}/wish`,
          {
            withCredentials: true,
          },
        );
        setWishes(response.data);
      } catch (err) {
        setError('위시리스트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishList();
  }, [userId]);

  const handleCardClick = (wishId) => {
    navigate(`/wish/${wishId}`);
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
    <div className="wishlist">
      <h2 className="wishlist-title">내 위시리스트</h2>
      <div className="wishlist-list">
        {wishes.length > 0 ? (
          wishes.map((wish) => (
            <div
              key={wish.id}
              className="wishlist-item"
              onClick={() => handleCardClick(wish.id)}
            >
              <div className="wishlist-item-image">
                <img
                  src={wish.imgUrl || '/placeholder-image.jpg'}
                  alt={wish.postTitle}
                />
              </div>
              <div className="wishlist-item-content">
                <h3>{wish.postTitle}</h3>
                <p className="wishlist-item-price">
                  {wish.price.toLocaleString()}원
                </p>
                <p className="wishlist-item-seller">{wish.nickname}</p>
                <span className="wishlist-item-type">
                  <Heart size={12} /> 위시리스트
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-message">위시리스트가 비어 있습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
