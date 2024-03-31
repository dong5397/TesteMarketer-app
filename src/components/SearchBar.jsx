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
    fetch("http://localhost:3000/api/v1/restaurants")
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
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="음식점 검색"
      />
      <RestaurantContainer>
        {filteredRestaurants.length === 0 ? (
          <NoResultMessage>검색 결과가 없습니다.</NoResultMessage>
        ) : (
          filteredRestaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.restaurants_id}
              onClick={() => handleRestaurantClick(restaurant)}
            >
              <RestaurantName>{restaurant.restaurants_name}</RestaurantName>
              <RestaurantDetail>주소: {restaurant.address}</RestaurantDetail>
              <RestaurantDetail>전화번호: {restaurant.phone}</RestaurantDetail>
            </RestaurantItem>
          ))
        )}
      </RestaurantContainer>

      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            zIndex: 9999, // 모달 창이 화면의 맨 앞에 표시되도록 설정
          },
        }}
      >
        {selectedRestaurant && (
          <ModalContent>
            <ModalTitle>{selectedRestaurant.restaurants_name}</ModalTitle>
            <DetailItem>주소: {selectedRestaurant.address}</DetailItem>
            <DetailItem>전화번호: {selectedRestaurant.phone}</DetailItem>
            <DetailItem>
              영업 시간: {selectedRestaurant.opening_hours}
            </DetailItem>
            <ModalImage
              src={selectedRestaurant.image}
              alt={selectedRestaurant.restaurants_name}
            />
          </ModalContent>
        )}
      </StyledModal>
    </Container>
  );
};

export default RestaurantList;

const Container = styled.div`
  margin-left: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f1c40f;
  }
`;

const RestaurantContainer = styled.div``;

const NoResultMessage = styled.p`
  font-size: 18px;
  color: #999;
`;

const RestaurantItem = styled.div`
  cursor: pointer;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 16px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
`;

const RestaurantName = styled.h2`
  margin-bottom: 8px;
  font-size: 20px;
`;

const RestaurantDetail = styled.p`
  margin-bottom: 4px;
  font-size: 16px;
`;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.h1`
  margin-bottom: 12px;
  font-size: 24px;
`;

const DetailItem = styled.p`
  margin-bottom: 8px;
  font-size: 18px;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 20px;
`;