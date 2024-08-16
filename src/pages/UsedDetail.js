import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import '../css/UsedDetail.css';

const UsedDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/used/${id}`); // 백엔드 API 호출
        setItem(response.data); // 응답 데이터를 상태에 저장
      } catch (err) {
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching used post details:', err);
      } finally {
        setLoading(false); // 로딩 상태 업데이트
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="no-data">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="used-detail">
      <div className="image-gallery">
        {item.pictures.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${item.title} - 이미지 ${index + 1}`}
          />
        ))}
      </div>
      <div className="item-info">
        <h1>{item.title}</h1>
        <p className="price">{item.price.toLocaleString()}원</p>
        <p className="status">진행중</p> {/* 상태는 예시로 처리했습니다. */}
        <div className="meta-info">
          <span>카테고리: {item.category}</span>
          <span>•</span>
          <span>조회수: {item.views}</span>
          <span>•</span>
          <span>작성 시간: {new Date(item.createTime).toLocaleString()}</span>
          <span>•</span>
          <span>작성자: {item.nickname}</span>
        </div>
        <div className="content">{item.content}</div>
      </div>
    </div>
  );
};

export default UsedDetail;
