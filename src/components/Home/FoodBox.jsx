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
    selectedRestaurantFromButtonState // 수정된 부분
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useRecoilState(
    isDetailModalOpenState
  );
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [, setIsFromMapClick] = useRecoilState(isFromMapClickState); // 추가
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

  const handleRestaurantClick = (restaurant, event) => {
    setSelectedRestaurant(restaurant); // 클릭한 식당 정보를 상태에 저장
    setIsFromMapClick(false); // 식당 박스를 클릭한 경우 false로 설정
    const { clientX, clientY } = event;
    setModalPosition({ x: clientX, y: clientY });
    setIsDetailModalOpen(true);
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
            onClick={(event) => handleRestaurantClick(restaurant, event)}
          >
            <h2>식당 이름: {restaurant.restaurants_name}</h2>
            <p>주소: {restaurant.address}</p>
            <p className="rating">평점: {restaurant.rating}</p>
            <Image src={restaurant.image} alt={restaurant.restaurants_name} />
          </Box>
        ))}

      {isDetailModalOpen && (
        <RestaurantDetails
          ref={modalRef}
          style={{ top: `${modalPosition.y}px`, left: `${modalPosition.x}px` }}
        >
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
    overflow-x: auto; /* Enables horizontal scrolling */
    overflow-y: hidden; /* Prevents vertical scrolling */
    white-space: nowrap; /* Keeps children in a single line */
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
  flex-direction: column; /* Stack items vertically */
  align-items: flex-start; /* Align items to the start */
  gap: 5px; /* Add smaller space between elements */
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(5px);
  }

  @media screen and (max-width: 481px) {
    padding: 10px; /* Adjust padding for mobile */
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
`;
const LikeRestaurantDetails = styled.div`
  border-color: #ccc;
  position: fixed;
  z-index: 9999999;
  width: 300px;
`;
