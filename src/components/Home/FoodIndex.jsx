import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import {
  selectedRestaurantFromButtonState,
  selectedRestaurantFromMapState,
  isFromMapClickState,
} from "../../state/mapAtoms";

function FoodIndex() {
  const isFromMapClick = useRecoilValue(isFromMapClickState);
  const restaurant = useRecoilValue(
    isFromMapClick
      ? selectedRestaurantFromMapState
      : selectedRestaurantFromButtonState
  );

  if (!restaurant) {
    return <p>선택된 레스토랑이 없습니다.</p>;
  }

  return (
    <Card>
      <Title>{restaurant.restaurants_name}</Title>
      <ImageWrapper>
        <Img src={restaurant.image} alt={restaurant.restaurants_name} />
      </ImageWrapper>
      <Info>
        <Label>주소:</Label>
        <Text>{restaurant.address}</Text>
      </Info>
      <Info>
        <Label>전화번호:</Label>
        <Text>{restaurant.phone}</Text>
      </Info>
      <Info>
        <Label>영업 시간:</Label>
        <Text>{restaurant.opening_hours}</Text>
      </Info>
      <Info>
        <Label>카테고리:</Label>
        <Text>{restaurant.category}</Text>
      </Info>
      <Info>
        <Label>별 점:</Label>
        <Text>{restaurant.rating}</Text>
      </Info>
    </Card>
  );
}

export default FoodIndex;

const Card = styled.div`
  width: 250px;
  height: auto;
  padding: 15px;
  border-radius: 10px;
  border: solid 2px;
  background: linear-gradient(135deg, #f0f0c3 0%, #e7e78b 100%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  @media screen and (max-width: 481px) {
    width: 90%; /* 모바일에서 전체 너비의 90%로 설정 */
    max-width: 300px; /* 최대 너비 제한 */
    height: auto;
    padding: 10px; /* 패딩 축소 */
    margin: 10px auto; /* 가운데 정렬을 위해 margin 설정 */
  }
`;

const Title = styled.h2`
  font-size: 20px;
  color: black;
  margin-bottom: 10px; /* 여백 축소 */
  text-align: center;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* 그림자 크기 축소 */
  transition: color 0.3s ease;

  @media screen and (max-width: 481px) {
    font-size: 16px; /* 모바일 폰트 크기 축소 */
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px; /* 여백 축소 */
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  max-width: 150px; /* 최대 너비 제한 */
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  border: solid 2px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 그림자 크기 축소 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media screen and (max-width: 481px) {
    max-width: 100px; /* 모바일에서 최대 너비 축소 */
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px; /* 여백 축소 */
  padding: 5px 0; /* 패딩 축소 */
  border-bottom: 1px solid; /* 테두리 두께 축소 */
  transition: background-color 0.3s ease;

  @media screen and (max-width: 481px) {
    flex-direction: column; /* 모바일에서 정보들을 세로로 배치 */
    align-items: flex-start; /* 왼쪽 정렬 */
    padding: 5px 0; /* 패딩 축소 */
  }
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: black;

  @media screen and (max-width: 481px) {
    font-size: 12px; /* 모바일 폰트 크기 축소 */
    margin-bottom: 2px; /* 정보 항목 사이의 간격 조절 */
  }
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: black;
  text-align: right;
  transition: color 0.3s ease, transform 0.3s ease;

  @media screen and (max-width: 481px) {
    font-size: 12px; /* 모바일 폰트 크기 축소 */
    text-align: left; /* 모바일에서 왼쪽 정렬 */
  }
`;
