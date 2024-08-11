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
      <div className="image-gallery">
        {auction.images.map((image, index) => (
          <img key={index} src={image} alt={`${auction.title} ${index + 1}`} />
        ))}
      </div>
      <div className="auction-info">
        <h1>{auction.title}</h1>
        <p className="price">
          현재 입찰가: {auction.currentPrice.toLocaleString()}원
        </p>
        <p className="status">{auction.status}</p>
        <div className="meta-info">
          <span>카테고리: {auction.category}</span>
          <span>•</span>
          <span>조회수: {auction.views}</span>
          <span>•</span>
          <span>마감기한: {auction.endDate}</span>
          <span>•</span>
          <span>판매자: {auction.seller}</span>
        </div>
        <div className="content">
          <h2>상품 설명</h2>
          <p>{auction.description}</p>
        </div>
        <div className="auction-details">
          <p>
            <strong>시작가:</strong> {auction.startPrice.toLocaleString()}원
          </p>
          <button className="bid-button">입찰하기</button>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
