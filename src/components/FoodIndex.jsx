import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 16px;
`;

const Title = styled.h2`
  font-size: 50px;
  color: #333;
  margin-bottom: 8px;
`;

const InfoText = styled.p`
  font-size: 50px;
  color: #666;
  margin-bottom: 4px;
`;

function FoodIndex({ selectedRestaurant }) {
  return (
    <div>
      <Title>{selectedRestaurant.name}</Title>
      <InfoText>주소: {selectedRestaurant.road_address_name}</InfoText>
      <InfoText>전화번호: {selectedRestaurant.phone}</InfoText>
      <InfoText>영업 시간: {selectedRestaurant.opening_hours}</InfoText>
      <Image src={selectedRestaurant.photo} alt="식당 사진" />
    </div>
  );
}

export default FoodIndex;
