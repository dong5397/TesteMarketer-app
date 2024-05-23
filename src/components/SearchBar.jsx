import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import KakaoMap from "../page/Map/KaKaoMap";

Modal.setAppElement("#root");

const SearchBar = ({ onRestaurantClick }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://makterbackendtest.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        if (data.resultCode === "F-1") {
          setError(data.msg);
        } else {
          setRestaurants(Array.isArray(data.data) ? data.data : [data.data]);
        }
      })
      .catch((error) => {
        setError("에러 발생");
      });
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalIsOpen(true);
  };

  const filteredRestaurants = restaurants
    ? restaurants.filter((restaurant) =>
        restaurant.restaurants_name && restaurant.address
          ? restaurant.restaurants_name.includes(searchTerm)
          : false
      )
    : [];

  return (
    <Container>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="음식점 검색"
      />
      {error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          {filteredRestaurants.length === 0 ? (
            <NoResultMessage>검색 결과가 없습니다.</NoResultMessage>
          ) : (
            <RestaurantContainer>
              {filteredRestaurants.map((restaurant) => (
                <RestaurantItem
                  key={restaurant.restaurants_id}
                  onClick={() => handleRestaurantClick(restaurant)}
                >
                  <RestaurantName>{restaurant.restaurants_name}</RestaurantName>
                  <RestaurantDetail>
                    주소: {restaurant.address}
                  </RestaurantDetail>
                  <RestaurantDetail>
                    전화번호: {restaurant.phone}
                  </RestaurantDetail>
                </RestaurantItem>
              ))}
            </RestaurantContainer>
          )}
        </>
      )}

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
            <CloseButton onClick={() => setModalIsOpen(false)}>X</CloseButton>
          </ModalContent>
        )}
      </StyledModal>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s ease;
  margin-left: 20px;

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
  margin-left: 15px;
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: 1px solid #eee;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
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
  width: 300px;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 30px;
  border: 5px solid black;
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

const ErrorMessage = styled.p`
  font-size: 18px;
  color: red;
`;
