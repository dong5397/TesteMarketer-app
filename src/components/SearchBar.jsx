import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(Array.isArray(data.data) ? data.data : [data.data]);
        setFilteredRestaurants(
          Array.isArray(data.data) ? data.data : [data.data]
        );
      });
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.restaurants_name && restaurant.address
        ? restaurant.restaurants_name.includes(searchTerm)
        : false
    );
    setFilteredRestaurants(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalIsOpen(true);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="음식점 검색"
      />
      <SearchButton onClick={handleSearch}>검색</SearchButton>

      <StyledModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            zIndex: 9999,
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
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border-bottom: 2px solid #ddd;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 8px 0 0 8px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f1c40f;
  }
`;

const SearchButton = styled.button`
  padding: 12px 16px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
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

export default SearchBar;
