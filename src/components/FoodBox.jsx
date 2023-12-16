import React, { useState } from "react";
import restaurants from "../data/TestData";
import styled from "styled-components";
import FoodDetail from "../page/FoodDetail";

const FoodBox = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div>
      {restaurants.map((restaurant) => (
        <Box
          key={restaurant.id}
          onClick={() => handleRestaurantClick(restaurant)}
        >
          <h2>식당 이름: {restaurant.name}</h2>
          <p> 주소 : {restaurant.address}</p>

          {selectedRestaurant && selectedRestaurant.id === restaurant.id && (
            <RestaurantDetails>
              <FoodDetail selectedRestaurant={selectedRestaurant} />
            </RestaurantDetails>
          )}
          <img src={restaurant.Image} alt={restaurant.name} />
        </Box>
      ))}
    </div>
  );
};

export default FoodBox;

const Box = styled.div`
  width: 440px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 10px;
  h2,
  p,
  pre {
    font-size: 20px;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
  }
  img {
    /* Box 내부의 모든 img 태그에 적용됩니다 */
    max-width: 90%; /* 이미지의 최대 너비를 Box의 너비로 제한합니다 */
    height: auto; /* 너비에 맞춰 자동으로 높이를 조정합니다 */
  }
`;

const RestaurantDetails = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
`;
