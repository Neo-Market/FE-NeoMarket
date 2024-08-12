import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/UsedDetail.css';

const UsedDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // 실제 구현에서는 이 부분에서 서버로부터 데이터를 가져와야 합니다.
    // 여기서는 예시 데이터를 사용합니다.
    const fetchData = async () => {
      const dummyData = {
        id: 1,
        title: '아이폰 12 Pro 판매합니다',
        content: '1년 사용한 아이폰 12 Pro 판매합니다. 상태 좋습니다.',
        status: '진행중',
        price: 800000,
        category: '전자기기',
        views: 150,
        createdAt: '2023-08-10 14:30',
        author: '홍길동',
        images: [
          '/images/iphone1.jpg',
          '/images/iphone2.jpg',
          '/images/iphone3.jpg',
        ],
      };
      setItem(dummyData);
    };
    fetchData();
  }, [id]);

  if (!item) return <div className="loading">로딩 중...</div>;

  return (
    <div className="used-detail">
      <div className="image-gallery">
        {item.images.map((img, index) => (
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
        <p className="status">{item.status}</p>
        <div className="meta-info">
          <span>카테고리: {item.category}</span>
          <span>•</span>
          <span>조회수: {item.views}</span>
          <span>•</span>
          <span>작성 시간: {item.createdAt}</span>
          <span>•</span>
          <span>작성자: {item.author}</span>
        </div>
        <div className="content">{item.content}</div>
      </div>
    </div>
  );
};

export default UsedDetail;
