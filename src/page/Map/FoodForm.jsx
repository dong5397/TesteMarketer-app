import React from "react";
import styled from "styled-components";
import FoodBox from "../../components/FoodBox";

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
  width: 420px;
  height: 10%;
`;
