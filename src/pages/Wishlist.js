import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Wishlist = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/used/list`);
        setWishlist(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setError('Failed to load wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleWishlistItemClick = (itemId, type) => {
    navigate(`/${type === 'auction' ? 'auction' : 'used-items'}/${itemId}`);
  };

  if (loading) return <div>Loading wishlist...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="wishlist-section">
      <h3>위시리스트</h3>
      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="wishlist-item"
            onClick={() => handleWishlistItemClick(item.id, item.type)}
          >
            <h4>{item.title}</h4>
            <p className="price">{item.price.toLocaleString()}원</p>
            <span className={`item-type ${item.type}`}>
              {item.type === 'auction' ? '경매' : '중고'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
