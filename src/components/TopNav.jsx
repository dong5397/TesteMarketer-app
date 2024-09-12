import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUtensils,
  faPen,
  faCog,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TopNav = () => {
  return (
    <>
      <TopNavContainer>
        <NavItem to="/">
          <FontAwesomeIcon icon={faHome} />
          <span>홈</span>
        </NavItem>
        <NavItem to="/food">
          <FontAwesomeIcon icon={faUtensils} />
          <span>식당보기</span>
        </NavItem>
        <NavItem to="/review">
          <FontAwesomeIcon icon={faPen} />
          <span>리뷰작성</span>
        </NavItem>
        <NavItem to="/service">
          <FontAwesomeIcon icon={faCog} />
          <span>설문조사</span>
        </NavItem>
        <NavItem to="/profile">
          <FontAwesomeIcon icon={faUser} />
          <span>프로필</span>
        </NavItem>
      </TopNavContainer>
    </>
  );
};

export default TopNav;

const TopNavContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0; /* 화면 하단에 고정 */
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1); /* 위쪽 그림자 효과 */
  border-top: 1px solid #e0e0e0; /* 상단 테두리 */
  z-index: 1000;

  @media screen and (max-width: 768px) {
    justify-content: space-between; /* 모바일에서 아이템 간의 간격 조정 */
    padding: 0 10px; /* 모바일 레이아웃에 여백 추가 */
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;

  &:hover {
    color: #000;
  }

  svg {
    font-size: 20px; /* Icon size */
  }

  span {
    margin-top: 4px; /* Space between icon and text */
    font-size: 12px;
  }
`;
