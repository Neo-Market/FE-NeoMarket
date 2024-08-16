import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Edit, Eye, Clock, User, Grid } from 'lucide-react';
import '../css/UsedDetail.css';

const UsedDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/used/${id}`);
        setItem(response.data);
      } catch (err) {
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching used post details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = () => {
    navigate(`/used/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/api/used/${id}`);
        navigate(`/used`);
      } catch (err) {
        setError('게시글 삭제 중 오류가 발생했습니다.');
        console.error('Error deleting used post:', err);
      }
    }
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="no-data">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="used-detail">
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
          <span className="status">진행중</span>
          <div className="action-buttons">
            <button onClick={handleEdit} className="edit-button">
              <Edit className="mr-2 h-4 w-4" /> 수정
            </button>
            <button onClick={handleDelete} className="delete-button">
              <Trash2 className="mr-2 h-4 w-4" /> 삭제
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
            {new Date(item.createTime).toLocaleString()}
          </span>
          <span>
            <User className="inline mr-1" /> {item.nickname}
          </span>
        </div>
        <div className="content">{item.content}</div>
      </div>
    </div>
  );
};

export default UsedDetail;
