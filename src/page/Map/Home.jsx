import React, { useState } from "react";
import styled from "styled-components";
import FoodForm from "./FoodForm"; // FoodForm 컴포넌트를 import합니다.

import SearchBar from "../../components/SearchBar";

const Home = ({ onRestaurantClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창을 열고 닫는 상태를 관리합니다.

  const togglePanel = () => {
    setIsOpen(!isOpen);
    setIsSearchOpen(false); // 푸드폼 버튼을 누르면 검색창은 닫히도록 설정합니다.
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && !isOpen) {
      setIsOpen(true); // 검색 버튼을 누르면 패널이 함께 열리도록 설정합니다.
    }
  };

  return (
    <Container isOpen={isOpen} isSearchOpen={isSearchOpen}>
      <ToggleButton onClick={togglePanel}>{isOpen ? "<" : ">"}</ToggleButton>
      {isOpen && (
        <SearchButton isOpen={isSearchOpen} onClick={toggleSearch}>
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
  left: 50px; // 'right'를 'left'로 바꿉니다.
`;
