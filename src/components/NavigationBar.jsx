import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function NavigationBar() {
  return (
    <StyledNavigationBar>
      <Container>
        <div>
          <NavLink to="/">홈</NavLink>
          <NavLink to="/about">검색</NavLink>
          <NavLink to="/services">맛 설정 모드</NavLink>
          <NavLink to="/contact">맛 집 랭킹</NavLink>
          <NavLink to="/cuminte">커뮤니티</NavLink>
        </div>
      </Container>
    </StyledNavigationBar>
  );
}

export default NavigationBar;

const StyledNavigationBar = styled.nav`
  background-color: #2c3e50;
  border-bottom: 1px solid #fff; /* 아래선 스타일 추가 */
  display: flex;
  justify-content: flex-start;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0 60px;
  line-height: 64px;
  transition: color 0.3s ease;

  &:hover {
    color: #f1c40f;
  }
`;
