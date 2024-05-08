import React from "react";
import styled from "styled-components";
import FoodBox from "../../components/FoodBox";

const FoodForm = () => {
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
