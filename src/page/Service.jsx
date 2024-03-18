import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RangeSlider from "../components/Services/RangeSlider";

// 모달 컴포넌트
const Modal = ({ children, onClose }) => {
  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalBackground>
  );
};

// Service 컴포넌트
const Service = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [taste, setTaste] = useState({
    sweet: 0,
    salty: 0,
    sour: 0,
    bitter: 0,
  });

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://testbackmak.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(Array.isArray(data) ? data : [data]);
      });
  }, []);

  const findRestaurant = () => {
    if (restaurants.length === 0) {
      return null;
    }

    let closestRestaurant = restaurants[0];
    let minDiff = Infinity;

    for (let restaurant of restaurants) {
      let diff = 0;
      for (let tasteKey in taste) {
        diff += Math.abs(taste[tasteKey] - restaurant.taste_level); // 수정된 부분
      }
      if (diff < minDiff) {
        minDiff = diff;
        closestRestaurant = restaurant;
      }
    }
    return closestRestaurant;
  };

  const handleSearch = () => {
    const closestRestaurant = findRestaurant();
    setSelectedRestaurant(closestRestaurant);
    setIsModalOpen(true);
  };

  const handleSave = (tasteKey, value) => {
    setTaste((taste) => ({ ...taste, [tasteKey]: value }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Circle className="sweet">단맛</Circle>
      <StyledRangeSlider onSave={(value) => handleSave("sweet", value)} />
      <Circle className="salty">짠맛</Circle>
      <StyledRangeSlider onSave={(value) => handleSave("salty", value)} />
      <Circle className="sour">신맛</Circle>
      <StyledRangeSlider onSave={(value) => handleSave("sour", value)} />
      <Circle className="bitter">쓴맛</Circle>
      <StyledRangeSlider onSave={(value) => handleSave("bitter", value)} />
      <Btn className="search" onClick={handleSearch}>
        검색
      </Btn>
      {isModalOpen && selectedRestaurant && (
        <Modal onClose={handleCloseModal}>
          <h1>{selectedRestaurant.restaurants_name}</h1>
          <h2>주소: {selectedRestaurant.address}</h2>
          <h2>전화번호: {selectedRestaurant.phone}</h2>
          <h2>영업 시간: {selectedRestaurant.opening_hours}</h2>
          <h2>별 점: {selectedRestaurant.rating}</h2>
          <ModalImage
            src={selectedRestaurant.image}
            alt={selectedRestaurant.restaurants_name}
          />
        </Modal>
      )}
    </Container>
  );
};

// 나머지 스타일 컴포넌트...

export default Service;

const Circle = styled.h1`
  background-color: ${(props) => {
    if (props.className === "sweet") {
      return "#ffb6c1";
    } else if (props.className === "salty") {
      return "#87CEFA";
    } else if (props.className === "sour") {
      return "#90EE90";
    } else if (props.className === "bitter") {
      return "#CD853F";
    }
  }};

  color: #fff;
  border-radius: 50%;
  padding: 10%;
  margin-bottom: 10px;
  margin-left: 100px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  padding: 10%;
`;

const Container = styled.div`
  width: 18%;
  height: 100%;
  padding: 50px;
  margin-left: 30px;
  background-color: #f2f2f2;
  border-radius: 50px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 추가 */
  justify-content: center;
  gap: 10px; /* 컴포넌트 간 간격 추가 */
`;

// RangeSlider 스타일 조절
const StyledRangeSlider = styled(RangeSlider)`
  width: 80%;
  margin-bottom: 20px;
`;

// Button 스타일 만들어주기
const Btn = styled.button`
  padding: 20px;
  &.save {
    background-color: green;
    color: white;
  }

  &.search {
    background-color: gray;
    color: white;
  }
`;
// Service 컴포넌트를 내보냄
const ModalBackground = styled.div`
  position: fixed;
  top: 20px;
  left: 50px;
  width: 30%;
  height: 30%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;
const ModalImage = styled.img`
  width: 50%; // 이미지 크기를 조절합니다. 원하는 크기로 변경 가능합니다.
  height: 50%; // 높이를 자동으로 설정하여 이미지 비율을 유지합니다.
`;
