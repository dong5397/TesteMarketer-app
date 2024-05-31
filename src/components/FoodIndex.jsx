// FoodIndex.jsx
import React from "react";
import styled from "styled-components";

function FoodIndex({ restaurant }) {
  return (
    <Card>
      <Title>{restaurant.restaurants_name}</Title>
      <Info>
        <Label>주소:</Label>
        <Text>{restaurant.address}</Text>
      </Info>
      <Info>
        <Label>전화번호:</Label>
        <Text>{restaurant.phone}</Text>
      </Info>
      <Info>
        <Label>영업 시간:</Label>
        <Text>{restaurant.opening_hours}</Text>
      </Info>
      <Info>
        <Label>맛:</Label>
        <Text>{restaurant.taste_level}</Text>
      </Info>
      <Info>
        <Label>별 점:</Label>
        <Text>{restaurant.rating}</Text>
      </Info>
    </Card>
  );
}

export default FoodIndex;

const Card = styled.div`
  padding: 25px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 30px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease;
  &:hover {
    color: #e67e22;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Label = styled.span`
  font-size: 18px;
  color: #555;
  font-weight: 600;
`;

const Text = styled.span`
  font-size: 18px;
  color: #777;
  text-align: right;
  transition: color 0.3s ease, transform 0.3s ease;
  &:hover {
    color: #3498db;
    transform: translateX(5px);
  }
`;
