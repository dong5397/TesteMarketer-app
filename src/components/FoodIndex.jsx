import React from "react";
import styled from "styled-components";

function FoodIndex({ restaurant }) {
  return (
    <Card>
      <Title>{restaurant.restaurants_name}</Title>
      <ImageWrapper>
        <Img src={restaurant.image} alt={restaurant.restaurants_name} />
      </ImageWrapper>
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
        <Label>카테고리:</Label>
        <Text>{restaurant.category}</Text>
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
  width: 250px; /* Set a smaller width */
  height: 450px;
  padding: 15px; /* Reduced padding */
  border-radius: 10px; /* Adjusted border radius */
  border: solid 2px; /* Reduced border width */
  background: linear-gradient(135deg, #f0f0c3 0%, #e7e78b 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Reduced shadow size */
  transition: transform 0.4s ease, box-shadow 0.4s ease;
`;

const Title = styled.h2`
  font-size: 20px; /* Reduced font size */
  color: black;
  margin-bottom: 15px; /* Reduced margin */
  text-align: center;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  transition: color 0.3s ease;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px; /* Reduced margin */
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  max-width: 100px; /* Reduced max width */
  aspect-ratio: 1 / 1; /* Maintain square aspect ratio */
  border-radius: 10px; /* Adjusted border radius */
  border: solid 2px; /* Reduced border width */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* Reduced margin */
  padding: 8px 0; /* Reduced padding */
  border-bottom: 2px solid; /* Reduced border width */
  transition: background-color 0.3s ease;
`;

const Label = styled.span`
  font-size: 14px; /* Reduced font size */
  font-weight: bold;
  color: black;
`;

const Text = styled.span`
  font-size: 14px; /* Reduced font size */
  font-weight: bold;
  color: black;
  text-align: right;
  transition: color 0.3s ease, transform 0.3s ease;
`;
