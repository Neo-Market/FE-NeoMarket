import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';
import axios from 'axios';

const Register = ({ userInfo }) => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      nickname,
      address,
      accountNumber,
      bankName,
    };

    axios
      .post(`${API_BASE_URL}/api/users`, formData, { withCredentials: true })
      .then((response) => {
        console.log('User created successfully:', response.data);

        // Location 헤더가 있는지 확인
        const location = response.headers.location;
        if (location) {
          // location에서 사용자 ID를 추출
          const userId = location.split('/').pop(); // URI의 마지막 부분을 ID로 간주

          // 사용자 ID를 로컬 스토리지에 저장
          localStorage.setItem('userId', userId);

          // 성공 시 홈페이지로 리다이렉트
          navigate('/');
        } else {
          console.error('Location header is missing');
        }
      })
      .catch((error) => {
        console.error('Error creating user:', error);

        // 사용자에게 오류 피드백을 제공 (예: alert이나 페이지 상태 업데이트)
        alert('회원가입 중 오류가 발생했습니다.');
      });
  };

  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={userInfo.name} disabled />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={userInfo.email} disabled />
        </div>
        <div className="form-group">
          <img
            src={userInfo.picture}
            alt="Profile"
            className="profile-picture"
          />
        </div>
        <div className="form-group">
          <label>Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
