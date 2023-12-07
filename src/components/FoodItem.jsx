import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import FoodDetail from "../page/FoodDetail"; // FoodDetail 컴포넌트를 import합니다.

// 이후 코드...

const FoodItem = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get(
          "https://dapi.kakao.com/v2/local/search/keyword.json",
          {
            headers: {
              Authorization: "KakaoAK 92be558050bf327c8f008ccd01021afd",
            },
            params: {
              query: "대전 맛집",
            },
          }
        );

        setRestaurants(response.data.documents);
      } catch (error) {
        console.error(error);
      }
    };

    getRestaurants();
  }, []);

  return (
    <Container>
      {restaurants.map((restaurant) => (
        <Card
          key={restaurant.id}
          onClick={() => handleRestaurantClick(restaurant)}
        >
          <h2>{restaurant.place_name}</h2>

          {selectedRestaurant && selectedRestaurant.id === restaurant.id && (
            <RestaurantDetails>
              <FoodDetail selectedRestaurant={selectedRestaurant} />{" "}
            </RestaurantDetails>
          )}
        </Card>
      ))}
    </Container>
  );
};

export default FoodItem;

const Container = styled.div`
  padding: 0 3rem 3rem;
`;

const Card = styled.div`
  background-color: #f1f1f1;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 500px; /* 가로 길이 조정 */
  cursor: pointer;
`;

const RestaurantDetails = styled.div`
  background-color: #fff;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
`;
