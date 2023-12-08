import React, { useState } from "react";
import styled from "styled-components";
import restaurants from "../data/TestData";
import RangeSlider from "../components/Services/RangeSlider";

// Service 컴포넌트 정의
const Service = () => {
  // 각 맛에 대한 상태 초기값 설정
  const [taste, setTaste] = useState({
    sweet: 0,
    salty: 0,
    sour: 0,
    bitter: 0,
  });

  // 식당을 찾는 함수
  const findRestaurant = () => {
    let closestRestaurant = null;
    let closestDistance = Infinity;

    for (const restaurant of restaurants) {
      const distance = Object.keys(taste).reduce(
        (sum, key) => sum + Math.abs(restaurant.taste[key] - taste[key]),
        0
      );

      // 현재 식당과 사용자의 맛 선호도 간의 차이(distance)가 현재까지의 최소거리보다 작으면 현재식당 업데이트.
      // 현재까지의 최소 거리보다 작으면 업데이트
      if (distance < closestDistance) {
        closestRestaurant = restaurant;
        closestDistance = distance;
      }
    }

    // 찾은 식당 정보를 alert로 띄우기
    if (closestRestaurant) {
      alert(`가장 유사한 식당: ${closestRestaurant.name}`);
    } else {
      alert("가장 가까운 식당을 찾을 수 없습니다.");
    }

    return closestRestaurant;
  };

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    const closestRestaurant = findRestaurant();
    // 결과 표시: 모달 또는 다른 UI 컴포넌트를 사용하여 식당 세부 정보 표시
    console.log("결과:", closestRestaurant);
  };

  // 맛 저장 함수
  const handleSave = (tasteKey, value) => {
    setTaste((taste) => ({ ...taste, [tasteKey]: value }));
  };

  // Service 컴포넌트 UI
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
    </Container>
  );
};

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
  padding: 10px;
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
export default Service;
