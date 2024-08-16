import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Edit, Eye, Clock, User, Grid, DollarSign } from 'lucide-react';
import '../css/AuctionDetail.css';

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/auction/${id}`);
        setItem(response.data);
      } catch (err) {
        setError('경매 게시글을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching auction post details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 경매 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/auction/${id}`);
        navigate(`/auction`);
      } catch (err) {
        setError('경매 게시글 삭제 중 오류가 발생했습니다.');
        console.error('Error deleting auction post:', err);
      }
    }
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item)
    return <div className="no-data">경매 게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="detail">
      <div className="image-gallery">
        {item.pictureUrls.map((pic, index) => (
          <div key={index} className="image-container">
            <img src={pic} alt={`${item.title} - 이미지 ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="item-info">
        <h1>{item.title}</h1>
        <div className="price-info">
          <p className="price">시작가: {item.startPrice.toLocaleString()}원</p>
          <p className="current-price">
            현재가: {item.currentPrice.toLocaleString()}원
          </p>
        </div>
        <div className="status-container">
          <span className={`status status-${item.status}`}>
            {item.status === 0 ? '진행중' : '종료'}
          </span>
          <div className="action-buttons">
            <button onClick={handleDelete} className="delete-button">
              <Trash2 className="mr-2 h-4 w-4" /> 삭제
            </button>
          </div>
        </div>
        <div className="meta-info">
          <span>
            <Grid className="inline mr-1" /> {item.category}
          </span>
          <span className="deadline">
            <Clock className="inline mr-1" /> 마감:{' '}
            {new Date(item.deadline).toLocaleString()}
          </span>
          <span>
            <User className="inline mr-1" /> 판매자 ID: {item.userId}
          </span>
        </div>
        <div className="content">{item.content}</div>
      </div>
    </div>
  );
};

export default AuctionDetail;
