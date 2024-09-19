import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodForm from "./FoodForm";
import SearchBar from "../../components/Home/SearchBar";
import { useRecoilState } from "recoil";
import {
  isOpenState,
  isSearchOpenState,
  selectedRestaurantState,
} from "../../state/mapAtoms";
import FoodDetail from "../../components/Home/FoodDetail";
import DirectionsFinderModal from "../../components/Home/DirectionsFinderModal"; // 모달 import

const Home = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(isSearchOpenState);
  const selectedRestaurant = useRecoilState(selectedRestaurantState)[0];

  // 모달 상태 추가
  const [showModal, setShowModal] = useState(false);

  // 새로운 상태 추가: windowWidth
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 윈도우 크기를 추적하는 useEffect 추가
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // 모달 열기 함수
  const openModal = () => setShowModal(true);

  // 모달 닫기 함수
  const closeModal = () => setShowModal(false);

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

          {/* 길찾기 버튼 추가 */}
          <DirectionsButton onClick={openModal}>길찾기</DirectionsButton>
        </>
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

      {/* DirectionsFinder 모달 */}
      <DirectionsFinderModal showModal={showModal} closeModal={closeModal} />
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
    top: 10px; /* Adjusted for mobile */
    right: 5px; /* Align to the right on mobile */
    left: auto;
  }
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

const DirectionsButton = styled.button`
  position: absolute;
  top: 110px; /* SearchButton 아래에 위치하도록 조정 */
  left: 10px;
  background-color: #041c11;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid black;

  @media screen and (max-width: 481px) {
    top: 90px; /* 모바일에서도 검색 버튼 아래에 위치 */
    left: 10px;
  }
`;

const Content = styled.div`
  padding: 10px;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 50px;
`;
