import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FoodDetail from "../components/FoodDetail";

const FoodBox = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    fetch("https://maktertest.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(Array.isArray(data.data) ? data.data : [data.data]);
      });
  }, []);

  useEffect(() => {
    if (selectedRestaurantId) {
      fetch(
        `https://maktertest.fly.dev/api/v1/restaurants/${selectedRestaurantId}`
      )
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
    <div>
      {restaurants.map((restaurant, index) => (
        <Box
          key={index}
          onClick={() => handleRestaurantClick(restaurant.restaurants_id)}
        >
          <h2>식당 이름: {restaurant.restaurants_name}</h2>
          <p>주소: {restaurant.address}</p>
          <img src={restaurant.image} alt={restaurant.restaurants_name} />
        </Box>
      ))}
      {selectedRestaurant && (
        <RestaurantDetails>
          <FoodDetail selectedRestaurant={selectedRestaurant} />
        </RestaurantDetails>
      )}
    </div>
  );
};
export default FoodBox;

const BaseBox = styled.div`
  width: 450px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;

  background-color: #fff;
`;

const Box = styled(BaseBox)`
  margin-left: 10px;

  p {
    font-size: 20px;
    padding: 10px;
  }

  img {
    max-width: 90%;
    height: auto;
  }
`;

const RestaurantDetails = styled(BaseBox)`
  border-color: #ccc;
`;
