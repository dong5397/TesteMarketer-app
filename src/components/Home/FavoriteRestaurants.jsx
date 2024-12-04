import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function FavoriteRestaurants() {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteRestaurants = async () => {
      try {
        const response = await fetch(
          "https://maketerbackend.fly.dev/api/v1/restaurants/getlikes",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const text = await response.text(); // 응답 본문을 텍스트로 변환
        console.log("서버 응답 본문:", text);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch favorite restaurants. Status: ${response.status}`
          );
        }

        const data = JSON.parse(text); // JSON으로 파싱
        if (data.resultCode === "S-1") {
          setFavoriteRestaurants(data.data);
        } else {
          console.error("Failed to fetch favorite restaurants:", data.msg);
          setError(data.msg || "Unknown error occurred");
        }
      } catch (error) {
        console.error("Error fetching favorite restaurants:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRestaurants();
  }, []);

  const handleRestaurantClick = (restaurant) => {
    navigate(`/review/${restaurant.restaurants_id}`, { state: { restaurant } });
  };

  return (
    <Container>
      {loading ? (
        <Message>Loading...</Message>
      ) : error ? (
        <ErrorBox>{`Error: ${error}`}</ErrorBox>
      ) : favoriteRestaurants.length > 0 ? (
        favoriteRestaurants.map((restaurant) => (
          <Box
            key={restaurant.restaurants_id}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <Image src={restaurant.image} alt={restaurant.restaurants_name} />
            <Details>
              <h2>{restaurant.restaurants_name}</h2>
              <p>주소: {restaurant.address}</p>
              <p className="rating">평점: {restaurant.rating}</p>
            </Details>
          </Box>
        ))
      ) : (
        <Message>저장된 선호 식당이 없습니다.</Message>
      )}
    </Container>
  );
}

export default FavoriteRestaurants;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin: 20px;
  max-height: calc(90vh - 40px);
  padding: 10px;

  @media screen and (max-width: 481px) {
    flex-wrap: nowrap;
    overflow-x: auto; /* Enables horizontal scrolling */
    overflow-y: hidden; /* Prevents vertical scrolling */
    white-space: nowrap; /* Keeps children in a single line */
    margin: 0px;
    gap: 0px;
    max-height: calc(40vh);
  }
`;

const Box = styled.div`
  width: 300px;
  padding: 15px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 481px) {
    width: 240px;
    margin-right: 15px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  h2 {
    font-size: 18px;
    margin: 0;
    color: #333;

    @media screen and (max-width: 481px) {
      font-size: 16px;
    }
  }

  p {
    font-size: 14px;
    margin: 0;
    color: #666;

    @media screen and (max-width: 481px) {
      font-size: 12px;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;

  @media screen and (max-width: 481px) {
    height: 55px;
  }
`;

const Message = styled.div`
  font-size: 16px;
  color: #999;
  margin-top: 20px;
  text-align: center;
`;

const ErrorBox = styled.div`
  font-size: 16px;
  color: red;
  margin-top: 20px;
  text-align: center;
`;
