import React from 'react';
import styled from 'styled-components';

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #757575;
  border: 1px solid #dadce0;
  border-radius: 4px;
  padding: 0 16px;
  height: 40px;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  white-space: nowrap;
  min-width: 180px;

  &:hover {
    box-shadow:
      0 1px 2px 0 rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
  }

  &:active {
    background-color: #f1f3f4;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const GoogleLogo = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

const GoogleLoginComponent = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  // 로그인 처리 함수
  const handleGoogleLogin = () => {
    window.location.href = `${apiUrl}/oauth2/authorization/google`;
  };

  return (
    <GoogleButton onClick={handleGoogleLogin}>
      <GoogleLogo
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google logo"
      />
      Google로 로그인
    </GoogleButton>
  );
};

export default GoogleLoginComponent;
