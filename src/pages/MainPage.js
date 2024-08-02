import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>메인 페이지</p>
    </div>
  );
};

export default MainPage;
