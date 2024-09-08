import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Edit, Eye, Clock, User, Grid, Save } from 'lucide-react';
import '../css/UsedEdit.css';

const UsedEdit = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/used/${id}`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/used/${id}`, item);
      navigate(`/used/${id}`);
    } catch (err) {
      setError('게시글 수정 중 오류가 발생했습니다.');
      console.error('Error updating used post:', err);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === item.pictures.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? item.pictures.length - 1 : prevIndex - 1,
    );
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="no-data">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="used-edit">
      <form onSubmit={handleSubmit}>
        <div className="image-gallery">
          <img
            src={item.pictures[currentImageIndex]}
            alt={`${item.title} - 이미지 ${currentImageIndex + 1}`}
          />
          <div className="image-navigation">
            <button type="button" onClick={prevImage} className="nav-button">
              <Grid className="h-4 w-4" />
            </button>
            <span>
              {currentImageIndex + 1} / {item.pictures.length}
            </span>
            <button type="button" onClick={nextImage} className="nav-button">
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="item-info">
          <input
            type="text"
            name="title"
            value={item.title}
            onChange={handleInputChange}
            className="title-input"
          />
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleInputChange}
            className="price-input"
          />
          <div className="status-container">
            <span className="status">진행중</span>
            <div className="action-buttons">
              <button type="submit" className="save-button">
                <Save className="mr-2 h-4 w-4" /> 저장
              </button>
            </div>
          </div>
          <div className="meta-info">
            <span>
              <Grid className="inline mr-1" />
              <input
                type="text"
                name="category"
                value={item.category}
                onChange={handleInputChange}
                className="category-input"
              />
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
          <textarea
            name="content"
            value={item.content}
            onChange={handleInputChange}
            className="content-input"
          />
        </div>
      </form>
    </div>
  );
};

export default UsedEdit;
