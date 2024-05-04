import React from "react";
import styled, { keyframes } from "styled-components";

// 키프레임 정의
const danceAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

// 스타일된 이미지 컴포넌트
const DancingImage = styled.img`
  animation: ${danceAnimation} 2s linear infinite;
  width: 100px; /* 이미지의 너비 */
  height: auto; /* 이미지의 높이 자동 조정 */
`;

// 춤을 추는 이미지 컴포넌트
const DancingPhoto = ({ src, alt }) => {
  return <DancingImage src={`../../images/logo.png`} alt={alt} />;
};

export default DancingPhoto;
