// FoodForm.js
import React from "react";
import FoodBox from "../components/FoodBox";
import styled from "styled-components";

function FoodForm() {
  return (
    <FormContainer>
      <FoodBox />
    </FormContainer>
  );
}

export default FoodForm;

const FormContainer = styled.div`
  width: 400px;
  height: 10%;
`;
