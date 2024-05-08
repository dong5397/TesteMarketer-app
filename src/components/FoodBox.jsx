import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FoodDetail from "./FoodDetail";
import { useNavigate } from "react-router-dom";

const FoodBox = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const modalRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const sortedRestaurants = Array.isArray(data.data)
          ? data.data.sort((a, b) => b.rating - a.rating)
          : [data.data];
        setRestaurants(sortedRestaurants);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedRestaurantId) {
      fetch(`http://localhost:3000/api/v1/restaurants/${selectedRestaurantId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setSelectedRestaurant(data.data);
          setIsModalOpen(true);
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [selectedRestaurantId]);

  const handleRestaurantClick = (id, event) => {
    const { clientX, clientY } = event;
    setSelectedRestaurantId(id);
    setModalPosition({ x: clientX, y: clientY });
  };

  const handleCloseDetails = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(null);
    setSelectedRestaurantId(null);
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
            onClick={(event) =>
              handleRestaurantClick(restaurant.restaurants_id, event)
            }
          >
            <h2>식당 이름: {restaurant.restaurants_name}</h2>
            <p>주소: {restaurant.address}</p>
            <p>평점: {restaurant.rating}</p>
            <Image src={restaurant.image} alt={restaurant.restaurants_name} />
          </Box>
        ))}
      {isModalOpen && (
        <RestaurantDetails
          ref={modalRef}
          style={{ top: modalPosition.y, left: modalPosition.x }}
        >
          <CloseButton onClick={handleCloseDetails}>X</CloseButton>
          <FoodDetail selectedRestaurant={selectedRestaurant} />
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
  margin-left: calc(10% + 20px); /* 여백 추가 */
  overflow-y: auto; /* 스크롤바 추가 */
  max-height: calc(90vh - 40px); /* 최대 높이 지정 */
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

const RestaurantDetails = styled(BaseBox)`
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
