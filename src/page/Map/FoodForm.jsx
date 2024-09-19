import React from "react";
import styled from "styled-components";
import FoodBox from "../../components/Home/FoodBox";

const FoodForm = () => {
  // 선택된 레스토랑이 있어도 `FoodBox`가 렌더링되도록 설정
  return (
    <FormContainer>
      <FoodBox />
    </FormContainer>
  );
};

export default FoodForm;

const FormContainer = styled.div`
  width: 350px;
  height: 10%;
  @media screen and (max-width: 481px) {
    width: 380px;
    height: 40px;
  }
`;
