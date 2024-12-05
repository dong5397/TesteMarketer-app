import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  restaurantsState,
  selectedRestaurantFromButtonState, // 수정된 부분
  isDetailModalOpenState,
  loadingState,
  errorState,
  isFromMapClickState, // 추가
} from "../../state/mapAtoms";
import FoodDetail from "./FoodDetail";

const FoodBox = () => {
  const [restaurants, setRestaurants] = useRecoilState(restaurantsState);
  const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
    selectedRestaurantFromButtonState
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useRecoilState(
    isDetailModalOpenState
  );
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [, setIsFromMapClick] = useRecoilState(isFromMapClickState);
  const modalRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://maketerbackend.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        const sortedRestaurants = Array.isArray(data.data)
          ? data.data.sort((a, b) => b.rating - a.rating)
          : [data.data];
        setRestaurants(sortedRestaurants);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, [setRestaurants, setLoading, setError]);

  const handleRestaurantClick = (restaurant) => {
    if (selectedRestaurant?.id === restaurant.id && isDetailModalOpen) {
      setIsDetailModalOpen(false);
    } else {
      setSelectedRestaurant(restaurant);
      setIsFromMapClick(false);
      setIsDetailModalOpen(true);
    }
  };

  const handleCloseDetails = () => {
    setIsDetailModalOpen(false);
  };

  const handleContainerClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseDetails();
    }
  };

  return (
    <Container onClick={handleContainerClick}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading &&
        !error &&
        restaurants.map((restaurant, index) => (
          <Box
            key={index}
            onClick={() => handleRestaurantClick(restaurant)}
            onTouchStart={() => handleRestaurantClick(restaurant)}
          >
            <h2>식당 이름: {restaurant.restaurants_name}</h2>
            <p>주소: {restaurant.address}</p>
            <p className="rating">평점: {restaurant.rating}</p>
            <Image src={restaurant.image} alt={restaurant.restaurants_name} />
          </Box>
        ))}

      {isDetailModalOpen && (
        <RestaurantDetails ref={modalRef}>
          <FoodDetail />
        </RestaurantDetails>
      )}
    </Container>
  );
};

export default FoodBox;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-left: calc(0% + 20px);
  overflow-y: auto;
  max-height: calc(90vh - 40px);

  @media screen and (max-width: 481px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    margin-left: calc(10%);
    max-height: calc(40vh - 40px);
  }
`;

const BaseBox = styled.div`
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid black;

  @media screen and (max-width: 481px) {
    width: 80%;
    height: 200px;
    flex: 0 0 auto; /* Prevents shrinking and keeps the box in its width */
  }
`;

const Box = styled(BaseBox)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(5px);
  }

  @media screen and (max-width: 481px) {
    padding: 10px;
    gap: 0;
  }

  h2 {
    font-size: 20px;
    margin-bottom: 4px; /* Reduced margin for closer spacing */
    @media screen and (max-width: 481px) {
      font-size: 16px; /* Reduced font size for mobile */
      margin-bottom: 0;
    }
  }

  p {
    font-size: 16px;
    margin-bottom: 4px; /* Reduced margin for closer spacing */
    @media screen and (max-width: 481px) {
      margin-bottom: 0;
      font-size: 12px; /* Reduced font size for mobile */
    }
  }

  .rating {
    @media screen and (max-width: 481px) {
      margin-bottom: 0;
      display: none; /* Hide rating on mobile */
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover; /* Ensures the image is properly contained */
  margin-top: 8px; /* Add space above the image */

  @media screen and (max-width: 481px) {
    width: 100%; /* Full width for better view on mobile */
    height: 70%; /* Maintain aspect ratio */
    margin-bottom: 0; /* Add space below the image */
    margin-left: auto; /* Center image horizontally */
    margin-right: auto; /* Center image horizontally */
    margin-top: 2px;
  }
`;

const RestaurantDetails = styled.div`
  border-color: #ccc;
  position: fixed;
  z-index: 9999999;
  width: 300px;
  top: 50%; /* 화면 아래쪽으로 70% */
  left: 20%; /* 화면 오른쪽으로 70% */
  transform: translate(-50%, -50%); /* 위치 보정 */
  border-radius: 10px; /* 둥근 모서리 */

  padding: 20px; /* 내부 여백 */

  @media screen and (max-width: 768px) {
    top: 80%; /* 태블릿에서는 아래쪽으로 조금 더 이동 */
    left: 50%; /* 태블릿에서는 중앙 정렬 */
    width: 280px; /* 태블릿 크기 조정 */
    height: auto; /* 높이 자동 */
    max-height: 60%; /* 최대 높이 제한 */
  }
`;
