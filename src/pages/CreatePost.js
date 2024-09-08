import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/CreatePost.css';

const CreatePost = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [isAuction, setIsAuction] = useState(false); // 경매 또는 중고 선택
  const [title, setTitle] = useState(''); // 제목 상태 관리
  const [content, setContent] = useState(''); // 내용 상태 관리
  const [price, setPrice] = useState(''); // 가격 상태 관리
  const [startPrice, setStartPrice] = useState(''); // 경매 시작 가격
  const [deadline, setDeadline] = useState(''); // 경매 마감 시간
  const [category, setCategory] = useState(''); // 카테고리 상태 관리
  const [file, setFile] = useState(null); // 업로드할 파일 상태 관리

  const navigate = useNavigate();

  // 파일 업로드 함수
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // 파일을 상태로 저장
  };

  // 게시글 생성 함수
  const createPost = async () => {
    const userId = localStorage.getItem('userId'); // 사용자 ID를 localStorage에서 가져옴
    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login'); // 로그인 페이지로 리다이렉트
      return;
    }

    let postData;
    let apiUrl;

    if (isAuction) {
      // 경매 게시글 생성 데이터
      postData = {
        title,
        content,
        startPrice,
        currentPrice: startPrice, // 현재가는 시작가와 동일하게 설정
        deadline,
        category,
        userId,
      };
      apiUrl = `${API_BASE_URL}/api/auction`; // 경매 API URL
    } else {
      // 중고 게시글 생성 데이터
      postData = {
        title,
        content,
        price,
        category,
        userId,
      };
      apiUrl = `${API_BASE_URL}/api/used`; // 중고 상품 API URL
    }

    const formData = new FormData();
    formData.append('file', file); // 파일을 FormData에 추가
    formData.append(
      'createDto',
      new Blob([JSON.stringify(postData)], { type: 'application/json' }),
    );

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // 인증이 필요한 경우
      });

      console.log('게시글 생성 성공:', response.data);
      navigate(`/${isAuction ? 'auction' : 'used'}`); // 게시글 생성 후 적절한 페이지로 이동
    } catch (error) {
      console.error('게시글 생성 중 오류 발생:', error);
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('파일을 업로드해주세요.');
      return;
    }
    await createPost();
  };

  return (
    <div className="create-post-container">
      <h1>게시글 작성</h1>
      <div className="toggle-container">
        <button
          className={`toggle-button ${!isAuction ? 'active' : ''}`}
          onClick={() => setIsAuction(false)}
        >
          중고
        </button>
        <button
          className={`toggle-button ${isAuction ? 'active' : ''}`}
          onClick={() => setIsAuction(true)}
        >
          경매
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {isAuction ? (
          <>
            <input
              type="number"
              placeholder="시작 가격"
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
              required
            />
            <input
              type="datetime-local"
              placeholder="경매 마감 시간"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </>
        ) : (
          <input
            type="number"
            placeholder="가격"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="카테고리"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={handleFileUpload}
          accept="image/*"
          required
        />
        <button type="submit">게시글 작성</button>
      </form>
    </div>
  );
};

export default CreatePost;
