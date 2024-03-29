import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";

Modal.setAppElement("#root");

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetch("https://makterteste.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(Array.isArray(data.data) ? data.data : [data.data]);
      });
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalIsOpen(true);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurants_name && restaurant.address
      ? restaurant.restaurants_name.includes(searchTerm)
      : false
  );

  return (
    <Container>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="음식점 검색"
      />

      {filteredRestaurants.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        filteredRestaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.restaurants_id}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <h2>{restaurant.restaurants_name}</h2>
            <p>{restaurant.address}</p>
            <p>{restaurant.phone}</p>
          </RestaurantItem>
        ))
      )}

      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {selectedRestaurant && (
          <div>
            <h1>{selectedRestaurant.restaurants_name}</h1>
            <h2>주소: {selectedRestaurant.address}</h2>
            <h2>전화번호: {selectedRestaurant.phone}</h2>
            <h2>영업 시간: {selectedRestaurant.opening_hours}</h2>
            <ModalImage
              src={selectedRestaurant.image}
              alt={selectedRestaurant.restaurants_name}
            />
          </div>
        )}
      </StyledModal>
    </Container>
  );
};

export default RestaurantList;

const Container = styled.div`
  margin-left: 20px;
`;

const RestaurantItem = styled.div`
  cursor: pointer;
`;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 20%;
  left: 10%;

  width: 20%;
  height: 30%;
  background: white;
  border-radius: 4px;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalImage = styled.img`
  width: 80%;
  height: auto;
`;
