// AuctionDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/AuctionDetail.css';

const AuctionDetail = () => {
  const { id } = useParams();
  // 서버에서 경매 상세 정보를 가져오는 로직이 필요합니다.
  const auction = {
    id: 1,
    title: '빈티지 가죽 자켓',
    description: '아주 멋진 빈티지 가죽 자켓입니다. 상태가 좋습니다.',
    startPrice: 50000,
    currentPrice: 65000,
    endDate: '2024-08-15',
    category: '패션',
    views: 120,
    seller: 'John Doe',
    status: '진행 중',
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
    ],
  };

  return (
    <div className="auction-detail">
      <div className="auction-images">
        {auction.images.map((image, index) => (
          <img key={index} src={image} alt={`${auction.title} ${index + 1}`} />
        ))}
      </div>
      <div className="auction-info">
        <h1 className="auction-title">{auction.title}</h1>
        <p className="auction-description">{auction.description}</p>
        <div className="auction-meta">
          <div>
            <span className="meta-label">시작가격:</span> {auction.startPrice}원
          </div>
          <div>
            <span className="meta-label">현재가격:</span> {auction.currentPrice}
            원
          </div>
          <div>
            <span className="meta-label">마감기한:</span> {auction.endDate}
          </div>
          <div>
            <span className="meta-label">카테고리:</span> {auction.category}
          </div>
          <div>
            <span className="meta-label">조회수:</span> {auction.views}
          </div>
          <div>
            <span className="meta-label">판매자:</span> {auction.seller}
          </div>
          <div>
            <span className="meta-label">상태:</span> {auction.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
