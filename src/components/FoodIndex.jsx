// FoodIndex.jsx
import React from "react";
import styled from "styled-components";

function FoodIndex({ restaurant }) {
  return (
    <Container>
      <Title>{restaurant.restaurants_name}</Title>
      <InfoContainer>
        <InfoLabel>주소:</InfoLabel>
        <InfoText>{restaurant.address}</InfoText>
      </InfoContainer>
      <InfoContainer>
        <InfoLabel>전화번호:</InfoLabel>
        <InfoText>{restaurant.phone}</InfoText>
      </InfoContainer>
      <InfoContainer>
        <InfoLabel>영업 시간:</InfoLabel>
        <InfoText>{restaurant.opening_hours}</InfoText>
      </InfoContainer>
      <InfoContainer>
        <InfoLabel>맛:</InfoLabel>
        <InfoText>{restaurant.taste_level}</InfoText>
      </InfoContainer>
      <InfoContainer>
        <InfoLabel>별 점:</InfoLabel>
        <InfoText>{restaurant.rating}</InfoText>
      </InfoContainer>
    </Container>
  );
}

export default FoodIndex;

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  background: linear-gradient(to right, #f7df1e, #f1c40f); /* 그라데이션 배경 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  transition: transform 0.3s ease-in-out; /* 호버 효과 */
  &:hover {
    transform: translateY(-5px); /* 호버 효과 */
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 12px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* 텍스트 그림자 효과 */
  transition: color 0.3s ease-in-out; /* 호버 효과 */
  &:hover {
    color: #f1c40f; /* 호버 효과 */
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const InfoLabel = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-right: 10px;
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #555;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* 텍스트 그림자 효과 */
  transition: transform 0.3s ease-in-out; /* 호버 효과 */
  &:hover {
    transform: translateX(5px); /* 호버 효과 */
  }
`;