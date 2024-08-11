import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Auction.css';

const Auction = () => {
  const [auctions, setAuctions] = useState([
    {
      id: 1,
      title: '빈티지 시계',
      currentBid: 50000,
      endTime: '2024-08-15',
      type: 'auction',
    },
    {
      id: 2,
      title: 'MacBook Pro',
      currentBid: 1200000,
      endTime: '2024-08-20',
      type: 'used',
    },
    {
      id: 3,
      title: '가죽 소파',
      currentBid: 300000,
      endTime: '2024-08-18',
      type: 'auction',
    },
    {
      id: 4,
      title: '다이슨 청소기',
      currentBid: 250000,
      endTime: '2024-08-22',
      type: 'used',
    },
  ]);

  const navigate = useNavigate();

  const handleCardClick = (auctionId) => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="auction">
      <h1 className="auction-title">최근 등록된 상품</h1>
      <div className="auction-list">
        {auctions.map((auction) => (
          <div
            key={auction.id}
            className={`auction-item ${auction.type}`}
            onClick={() => handleCardClick(auction.id)}
          >
            <h2>{auction.title}</h2>
            <p className="price">{auction.currentBid.toLocaleString()}원</p>
            <span className="item-type">
              {auction.type === 'auction' ? '경매' : '중고'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auction;
