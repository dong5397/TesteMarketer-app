import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FoodForm from "./FoodForm";
import FoodDetail from "../../components/FoodDetail";
import SearchBar from "../../components/SearchBar";
import KakaoMap from "../../page/Map/KaKaoMap";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mapMoveFunction, setMapMoveFunction] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && !isOpen) {
      setIsOpen(true);
    }
  };

  const handleMapMove = (latitude, longitude) => {
    console.log("Home: handleMapMove called with:", latitude, longitude);
    if (isNaN(latitude) || isNaN(longitude)) {
      console.error("Home: Invalid coordinates:", latitude, longitude);
      return;
    }
    if (mapMoveFunction) {
      mapMoveFunction(latitude, longitude);
    } else {
      console.error("MapMoveFunction이 정의되지 않았습니다.");
    }
  };

  useEffect(() => {
    if (mapMoveFunction) {
      console.log("Home: MapMoveFunction is set");
    }
  }, [mapMoveFunction]);

  return (
    <Container isOpen={isOpen} isSearchOpen={isSearchOpen}>
      <ToggleButton onClick={togglePanel}>{isOpen ? "<" : ">"}</ToggleButton>
      {isOpen && (
        <SearchButton isOpen={isSearchOpen} onClick={toggleSearch}>
          {isSearchOpen ? "닫기" : "검색"}
        </SearchButton>
      )}
      <Content>
        <FoodForm setSelectedRestaurant={setSelectedRestaurant} />
      </Content>
      {isSearchOpen && (
        <SearchContainer>
          <SearchBar />
        </SearchContainer>
      )}
      <KakaoMap setMapMoveFunction={setMapMoveFunction} />
      {selectedRestaurant && (
        <FoodDetail
          selectedRestaurant={selectedRestaurant}
          onMapMove={handleMapMove}
        />
      )}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: ${(props) => (props.isOpen ? "400px" : "50px")};
  height: 100%;
  position: fixed;
  top: 15%;
  left: 0;
  background-color: #f8f9fa;
  transition: width 0.5s, left 0.5s;
  overflow: hidden;
  z-index: 1000;
  border: 4px solid black;
  border-top-right-radius: 30px;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1%;
  background-color: #041c11;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid black;
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50px;
  left: 10px;
  background-color: #041c11;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid black;
`;

const Content = styled.div`
  padding: 10px;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 50px;
`;
