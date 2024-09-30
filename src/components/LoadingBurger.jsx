import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger } from "@fortawesome/free-solid-svg-icons";

// 로고가 바운스되는 애니메이션 (fa-bounce 대신 직접 정의 가능)
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* 위로 이동 */
  }
`;

// 화면을 덮는 투명한 배경
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 투명한 검정 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 다른 요소 위에 표시되도록 */
`;

// 로고와 텍스트를 감싸는 컨테이너
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 햄버거 아이콘에 바운스 애니메이션 적용
const BurgerIcon = styled(FontAwesomeIcon)`
  font-size: 80px; /* 아이콘 크기 */
  color: #ffd43b; /* 아이콘 색상 */
  animation: ${bounce} 1s infinite; /* 바운스 애니메이션 적용 */
  margin-bottom: 20px; /* 텍스트와 간격 */
`;

// 로딩 텍스트 스타일
const LoadingText = styled.div`
  font-size: 24px;
  font-family: "GowunDodum-Regular", sans-serif;
  color: white; /* 텍스트 색상 */
  letter-spacing: 2px;
  animation: blink 1.5s infinite; /* 깜빡이는 애니메이션 */
`;

const LoadingBurger = () => {
  return (
    <Overlay>
      <LoadingContainer>
        <BurgerIcon icon={faBurger} />
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    </Overlay>
  );
};

export default LoadingBurger;
