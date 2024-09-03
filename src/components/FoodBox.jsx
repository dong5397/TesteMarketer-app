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
} from "../state/mapAtoms";
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
    fetch("https://makterbackend.fly.dev/api/v1/restaurants")
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
            <p>평점: {restaurant.rating}</p>
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
  display: block;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-left: calc(10% + 20px);
  overflow-y: auto;
  max-height: calc(90vh - 40px);
`;

const BaseBox = styled.div`
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid black;
`;

const Box = styled(BaseBox)`
  cursor: pointer;

  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(5px);
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

const RestaurantDetails = styled.div`
  border-color: #ccc;
  position: fixed;
  z-index: 9999999;
  width: 300px;
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
