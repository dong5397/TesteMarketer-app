import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function NavigationBar() {
  return (
    <div>
      <NavLink to="/food">식당보기</NavLink>
      <NavLink to="/service">맛 설정 모드</NavLink>
      <NavLink to="/cuminte">커뮤니티</NavLink>
    </div>
  );
}

export default NavigationBar;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 10px 20px; /* 링크 내부 패딩 */
  font-family: "Roboto", sans-serif;
  font-weight: bold; /* 폰트 두껍게 설정 */
  transition: color 0.3s ease, transform 0.3s ease; /* 트랜지션 효과 추가 */

  &:hover {
    color: #666; /* 호버 시 색상 변경 */
    transform: scale(1.1); /* 호버 시 약간의 스케일 변화 */
  }
`;
