import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Edit, Eye, Clock, User, Grid, Heart } from 'lucide-react';
import '../css/WishDetail.css';

const WishDetail = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/wish/${id}`);
        setItem(response.data);
      } catch (err) {
        setError('위시리스트 항목을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching wish item details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleRemove = async () => {
    if (window.confirm('정말로 이 항목을 위시리스트에서 제거하시겠습니까?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/wish/${id}`);
        navigate(`/wishlist`);
      } catch (err) {
        setError('위시리스트 항목 제거 중 오류가 발생했습니다.');
        console.error('Error removing wish item:', err);
      }
    }
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item)
    return <div className="no-data">위시리스트 항목을 찾을 수 없습니다.</div>;

  return (
    <div className="wish-detail">
      <div className="image-gallery">
        {item.pictures.map((pic, index) => (
          <div key={index} className="image-container">
            <img src={pic} alt={`${item.title} - 이미지 ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="item-info">
        <h1>{item.title}</h1>
        <p className="price">{item.price.toLocaleString()}원</p>
        <div className="status-container">
          <span className="status">위시리스트</span>
          <div className="action-buttons">
            <button onClick={handleRemove} className="remove-button">
              <Trash2 className="mr-2 h-4 w-4" /> 제거
            </button>
          </div>
        </div>
        <div className="meta-info">
          <span>
            <Grid className="inline mr-1" /> {item.category}
          </span>
          <span>
            <Eye className="inline mr-1" /> 조회수 {item.views}
          </span>
          <span>
            <Clock className="inline mr-1" />{' '}
            {new Date(item.addedTime).toLocaleString()}
          </span>
          <span>
            <User className="inline mr-1" /> {item.sellerNickname}
          </span>
          <span>
            <Heart className="inline mr-1" /> 위시리스트에 추가됨
          </span>
        </div>
        <div className="content">{item.description}</div>
      </div>
    </div>
  );
};

export default WishDetail;
