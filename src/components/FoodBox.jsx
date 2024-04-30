import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FoodDetail from "./FoodDetail";
import Draggable from "react-draggable";

const FoodBox = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(Array.isArray(data.data) ? data.data : [data.data]);
      });
  }, []);

  useEffect(() => {
    if (selectedRestaurantId) {
      fetch(`http://localhost:3000/api/v1/restaurants/${selectedRestaurantId}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedRestaurant(data.data);
        });
    }
  }, [selectedRestaurantId]);

  const handleRestaurantClick = (Id) => {
    setSelectedRestaurantId(Id);
  };

  const handleCloseDetails = () => {
    setSelectedRestaurant(null);
    setSelectedRestaurantId(null);
  };

  return (
    <Container>
      {restaurants.map((restaurant, index) => (
        <Box
          key={index}
          onClick={() => handleRestaurantClick(restaurant.restaurants_id)}
        >
          <h2>식당 이름: {restaurant.restaurants_name}</h2>
          <p>주소: {restaurant.address}</p>
          <Image src={restaurant.image} alt={restaurant.restaurants_name} />
        </Box>
      ))}
      {selectedRestaurant && (
        <Draggable>
          <RestaurantDetails>
            <CloseButton onClick={handleCloseDetails}>X</CloseButton>
            <FoodDetail selectedRestaurant={selectedRestaurant} />
          </RestaurantDetails>
        </Draggable>
      )}
    </Container>
  );
};

export default FoodBox;

const Container = styled.div`
  display: block;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-left: calc(10% + 20px); /* 여백 추가 */
`;

const BaseBox = styled.div`
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Box = styled(BaseBox)`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const RestaurantDetails = styled(BaseBox)`
  border-color: #ccc;
  position: absolute;
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
