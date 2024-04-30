import React, { useState } from "react";
import styled from "styled-components";
import FoodForm from "./FoodForm"; // FoodForm 컴포넌트를 import합니다.

const Home = ({ onRestaurantClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container isOpen={isOpen}>
      <ToggleButton onClick={togglePanel}>
        {isOpen ? "닫기" : "푸드폼 열기"}
      </ToggleButton>
      <Content>
        {/* FoodForm 컴포넌트를 여기에 추가합니다. */}
        <FoodForm />
      </Content>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: ${(props) => (props.isOpen ? "400px" : "50px")};
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #f8f9fa;
  transition: width 0.5s;
  overflow: hidden;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: ${(props) => (props.isOpen ? "360px" : "10px")};
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: right 0.5s;
`;

const Content = styled.div`
  padding: 20px;
`;
