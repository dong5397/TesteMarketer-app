import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 300px;
  max-height: 400px;
  margin: 20px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  border: 5px solid black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin: 0 0 10px;
  font-size: 24px;
  color: #333;
`;

const Info = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #666;
`;

function RestaurantCard({ restaurant }) {
  return (
    <Card>
      <Image src={restaurant.image} alt={restaurant.restaurants_name} />
      <Content>
        <Title>{restaurant.restaurants_name}</Title>
        <Info>주소: {restaurant.address}</Info>
        <Info>전화번호: {restaurant.phone}</Info>
        <Info>영업 시간: {restaurant.opening_hours}</Info>
        <Info>평점: {restaurant.rating}</Info>
        <Info>음식 종류: {restaurant.food_type}</Info>
      </Content>
    </Card>
  );
}

export default RestaurantCard;
