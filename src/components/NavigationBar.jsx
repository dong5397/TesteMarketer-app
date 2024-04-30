import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function NavigationBar() {
  return (
    <StyledNavigationBar>
      <Container>
        <NavLinkContainer>
          <NavLink to="/food">식당보기</NavLink>
          <NavLink to="/service">맛 설정 모드</NavLink>
          <NavLink to="/rank">맛 집 랭킹</NavLink>
          <NavLink to="/cuminte">커뮤니티</NavLink>
        </NavLinkContainer>
      </Container>
    </StyledNavigationBar>
  );
}

export default NavigationBar;

const StyledNavigationBar = styled.nav`
  background-color: white;
  border-bottom: 1px solid white;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 링크 사이의 간격을 설정 */
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 30 60px;
  line-height: 50px;
  font-family: "Roboto", sans-serif;
  font-weight: bold; /* 폰트 두껍게 설정 */
  transition: color 0.3s ease, transform 0.3s ease; /* 트랜지션 효과 추가 */

  &:hover {
    transform: scale(1.5); /* 호버 시 약간의 스케일 변화 */
  }
`;
