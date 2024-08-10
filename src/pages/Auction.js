import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Auction.css';

const Auction = () => {
  const [auctions, setAuctions] = useState([
    { id: 1, title: '빈티지 시계', currentBid: 50000, endTime: '2024-08-15' },
    { id: 2, title: '그래픽 카드', currentBid: 300000, endTime: '2024-08-20' },
    { id: 3, title: '아트워크', currentBid: 100000, endTime: '2024-08-18' },
  ]);

  const navigate = useNavigate();

  const handleCardClick = (auctionId) => {
    navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="auction">
      <h1>현재 진행 중인 경매</h1>
      <div className="auction-list">
        {auctions.map((auction) => (
          <div
            key={auction.id}
            className="auction-item"
            onClick={() => handleCardClick(auction.id)}
          >
            <h2>{auction.title}</h2>
            <p>현재 입찰가: {auction.currentBid}원</p>
            <p>종료일: {auction.endTime}</p>
            <button>입찰하기</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auction;
