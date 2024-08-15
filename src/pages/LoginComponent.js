import React, { useState } from 'react';
import styled from 'styled-components';

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  color: #757575;
  border: 1px solid #dadce0;
  border-radius: 4px;
  padding: 0 16px;
  height: 40px;
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

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

const LoadingSpinner = styled.div`
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.p`
  color: #d93025;
  font-size: 13px;
  margin-top: 8px;
`;

const LoginComponent = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError(null);

    try {
      window.location.href = `${API_BASE_URL}/api/login`;
    } catch (error) {
      console.error('Error initiating Google login:', error);
      setError('로그인 초기화 중 오류가 발생했습니다. 다시 시도해 주세요.');
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <GoogleButton onClick={handleGoogleLogin} disabled={isLoading}>
          <GoogleLogo
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
          />
          Google로 로그인
        </GoogleButton>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default LoginComponent;
