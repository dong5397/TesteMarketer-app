import React from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";

import { Link } from "react-router-dom";

function MainHeader() {
  return (
    <StyledHeader>
      <Container>
        <Header />

        <NavigationBar />
      </Container>
    </StyledHeader>
  );
}

export default MainHeader;

const StyledHeader = styled.header`
  background: linear-gradient(#ac995e, #e7e78b);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;
