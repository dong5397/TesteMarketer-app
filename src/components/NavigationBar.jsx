import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function NavigationBar() {
  return (
    <StyledNavigationBar>
      <Container>
        <div>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/search">검색</NavLink>
          <NavLink to="/service">맛 설정 모드</NavLink>
          <NavLink to="/rank">맛 집 랭킹</NavLink>
          <NavLink to="/cuminte">커뮤니티</NavLink>
        </div>
      </Container>
    </StyledNavigationBar>
  );
}

export default NavigationBar;

const StyledNavigationBar = styled.nav`
  background-color: #808080; // 변경된 부분
  border-bottom: 2px solid #fff; // 변경된 부분
  display: flex;
  justify-content: flex-start;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px; // 변경된 부분
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #ffffff; // 변경된 부분
  text-decoration: none;
  padding: 0 40px; // 변경된 부분
  line-height: 70px; // 변경된 부분
  transition: color 0.3s ease;

  &:hover {
    color: #f1c40f;
  }
`;
