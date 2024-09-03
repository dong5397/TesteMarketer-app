import React, { useEffect } from "react";
import styled from "styled-components";
import FoodForm from "./FoodForm";
import SearchBar from "../../components/SearchBar";
import { useRecoilState } from "recoil";
import {
  isOpenState,
  isSearchOpenState,
  selectedRestaurantState,
} from "../../state/mapAtoms";
import FoodDetail from "../../components/FoodDetail";

const Home = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(isSearchOpenState);
  const selectedRestaurant = useRecoilState(selectedRestaurantState)[0];

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

  return (
    <Container $isOpen={isOpen}>
      <ToggleButton onClick={togglePanel}>{isOpen ? "<" : ">"}</ToggleButton>
      {isOpen && (
        <SearchButton onClick={toggleSearch}>
          {isSearchOpen ? "닫기" : "검색"}
        </SearchButton>
      )}
      <Content>
        <FoodForm />
      </Content>
      {isSearchOpen && (
        <SearchContainer>
          <SearchBar />
        </SearchContainer>
      )}
      {selectedRestaurant && (
        <FoodDetail triggerModal={false} /> // 모달이 아닌 일반 컴포넌트로 렌더링
      )}
    </Container>
  );
};

export default Home;

// Styled Components는 그대로 유지
const Container = styled.div`
  width: ${(props) => (props.$isOpen ? "400px" : "50px")};
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
