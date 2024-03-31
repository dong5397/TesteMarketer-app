import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FoodDetail from "../components/FoodDetail";

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
        <RestaurantDetails>
          <FoodDetail selectedRestaurant={selectedRestaurant} />
        </RestaurantDetails>
      )}
    </Container>
  );
};

export default FoodBox;

const Container = styled.div`
  display: inline-block;
  justify-content: space-around;
  gap: 20px;
`;

const BaseBox = styled.div`
  width: 300px;
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
`;