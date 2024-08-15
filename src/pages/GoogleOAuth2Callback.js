import React, { useEffect, useState } from 'react';
import Register from './Register';
import axios from 'axios';

const GoogleOAuth2Callback = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 서버로부터 구글 사용자 정보를 가져옴
    axios
      .get(`${API_BASE_URL}/api/session-user/info`, { withCredentials: true })
      .then((response) => {
        setUserInfo(response.data); // userInfo에 사용자 정보를 저장
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }, [API_BASE_URL]);

  if (!userInfo) {
    return <div>Loading...</div>; // 사용자 정보를 불러오는 동안 로딩 상태를 표시
  }

  return <Register userInfo={userInfo} />;
};

export default GoogleOAuth2Callback;
