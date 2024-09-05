// ServiceFoods.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RestaurantCard from "./RestaurantCard";
import { DeviceFrameset } from "react-device-frameset";
import { useRecoilValue } from "recoil";
import { filteredRestaurantsState } from "../state/surveyAtoms"; // 필터링된 식당 상태 가져오기

const ServiceFoods = () => {
  const navigate = useNavigate();
  const filteredRestaurants = useRecoilValue(filteredRestaurantsState); // 필터링된 식당 목록 가져오기

  const handleBackClick = () => {
    navigate("/service");
  };

  return (
    <ServiceContainer>
      <Layout>
        <BackButton onClick={handleBackClick}>다시 설정 하기</BackButton>
        <Form>
          <DeviceFrameset
            device="iPad Mini"
            color="black"
            width="100%"
            height="auto"
          >
            <Container>
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant, index) => (
                  <CardWrapper key={index}>
                    <RestaurantCard restaurant={restaurant} />
                  </CardWrapper>
                ))
              ) : (
                <p>필터링된 식당이 없습니다.</p>
              )}
            </Container>
          </DeviceFrameset>
        </Form>
      </Layout>
    </ServiceContainer>
  );
};

export default ServiceFoods;

const ServiceContainer = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1200px;
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  flex-direction: column;
`;

const Form = styled.div`
  flex: 1;
  max-width: 1000px;
  width: 100%;
`;

const Container = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 5px solid black;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 800px;
  overflow-y: auto;
`;

const CardWrapper = styled.div`
  flex: 1 1 calc(50% - 20px);
  box-sizing: border-box;
  margin: 10px;
  max-width: 350px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #67ab49;
  border: 2px solid #050505;
  border-radius: 5px;
  font-size: 14px;
  color: black;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #14892c;
    border-color: #050505;
  }
`;
