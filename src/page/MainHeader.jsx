import React from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import logo from "../../images/logo.png";

import { Link } from "react-router-dom";

function MainHeader() {
  return (
    <StyledHeader>
      <Container>
        <LogoLink to={"/"}>
          <Img src={logo} alt="Logo" />
        </LogoLink>

        <Cell>
          <NavigationBar />
        </Cell>
      </Container>
    </StyledHeader>
  );
}

export default MainHeader;

const StyledHeader = styled.header`
  background-color: #ffffff;
`;

const Container = styled.div`
  max-width: 20000px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoLink = styled(Link)`
  margin-right: auto;
`;

const Img = styled.img`
  width: 150px;
  cursor: pointer;
  display: block;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
