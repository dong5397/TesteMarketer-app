import React from "react";
import styled from "styled-components";
import FoodBox from "../../components/FoodBox";

const FoodForm = ({ handleMapMove }) => {
  return (
    <FormContainer>
      <FoodBox handleMapMove={handleMapMove} />
    </FormContainer>
  );
};

export default FoodForm;

const FormContainer = styled.div`
  width: 420px;
  height: 10%;
`;