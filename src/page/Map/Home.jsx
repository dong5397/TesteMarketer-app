import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodForm from "./FoodForm";
import SearchBar from "../../components/Home/SearchBar";
import FavoriteRestaurants from "../../components/Home/FavoriteRestaurants";
import { useRecoilState } from "recoil";
import {
  isOpenState,
  isSearchOpenState,
  selectedRestaurantState,
} from "../../state/mapAtoms";
import FoodDetail from "../../components/Home/FoodDetail";

const Home = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(isSearchOpenState);
  const [showFavorites, setShowFavorites] = useState(false);
  const selectedRestaurant = useRecoilState(selectedRestaurantState)[0];

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Window width tracking state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resizing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    setIsSearchOpen(false);
    setShowFavorites(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && !isOpen) {
      setIsOpen(true);
    }
    setShowFavorites(false);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites && !isOpen) {
      setIsOpen(true);
    }
    setIsSearchOpen(false);
  };

  return (
    <Container $isOpen={isOpen}>
      <ToggleButton onClick={togglePanel}>
        {isOpen
          ? windowWidth <= 481
            ? "˅"
            : "<"
          : windowWidth <= 481
          ? "^"
          : ">"}
      </ToggleButton>

      {isOpen && (
        <>
          <SearchButton onClick={toggleSearch}>
            {isSearchOpen ? "닫기" : "검색"}
          </SearchButton>
          <LikeButton onClick={toggleFavorites}>
            {showFavorites ? "닫기" : "선호식당"}
          </LikeButton>
        </>
      )}

      <Content>
        <FavoritesHeader>인기 식당</FavoritesHeader>
        <FoodForm />
      </Content>

      {isSearchOpen && (
        <SearchContainer>
          <SearchBar />
        </SearchContainer>
      )}

      {showFavorites && (
        <FavoritesContainer>
          <FavoritesHeader>선호 식당</FavoritesHeader>
          <FavoriteRestaurants />
        </FavoritesContainer>
      )}

      {selectedRestaurant && <FoodDetail />}
    </Container>
  );
};

export default Home;

// Styled Components
const Container = styled.div`
  width: ${(props) => (props.$isOpen ? "450px" : "50px")};
  height: 100%;
  position: fixed;
  top: 15%;
  left: 0;
  background-color: #f8f9fa;
  transition: width 0.5s, left 0.5s, height 0.5s, bottom 0.5s;
  overflow: hidden;
  z-index: 1000;
  border: 4px solid black;
  border-top-right-radius: 30px;

  @media screen and (max-width: 481px) {
    width: 100%;
    height: ${(props) => (props.$isOpen ? "170px" : "50px")};
    top: auto;
    bottom: 60px;
    left: 0;
    border: 4px solid black;
    border-top-right-radius: 0;
    border-top-left-radius: 30px;
    transition: height 0.5s;
  }
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
  @media screen and (max-width: 481px) {
    top: 10px;
    right: 5px;
    left: auto;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 80px;
  left: 10px;
  background-color: #041c11;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid black;
`;

const LikeButton = styled.button`
  position: absolute;
  top: 130px;
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
  padding-left: 50px;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 50px;
`;

const FavoritesContainer = styled.div`
  position: absolute;
  top: 170px;

  width: calc(100% - 20px);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  overflow-y: auto;
  max-height: 700px;
`;
const FavoritesHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 2px solid #ccc;
  font-family: "Arial", sans-serif;
  background-color: #e7e986;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
