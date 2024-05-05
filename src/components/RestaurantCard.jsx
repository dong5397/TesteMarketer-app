import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 300px;
  margin: 20px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  border: 5px solid black;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const Info = styled.p`
  margin: 10px 0;
`;

function RestaurantCard({ restaurant }) {
  return (
    <Card>
      <Image src={restaurant.image} alt={restaurant.restaurant_name} />
      <Content>
        <Title>{restaurant.restaurant_name}</Title>
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
