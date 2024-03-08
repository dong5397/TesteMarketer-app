// FoodIndex.jsx
import React from "react";
import styled from "styled-components";

function FoodIndex({ restaurant }) {
  return (
    <Container>
      <Title>{restaurant.restaurants_name}</Title>
      <InfoText>주소: {restaurant.address}</InfoText>
      <InfoText>전화번호: {restaurant.phone}</InfoText>
      <InfoText>영업 시간: {restaurant.opening_hours}</InfoText>
      <InfoText>맛: {restaurant.taste_level}</InfoText>
      <InfoText>별 점: {restaurant.rating}</InfoText>
    </Container>
  );
}

export default FoodIndex;

const Container = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 8px;
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 4px;
`;
