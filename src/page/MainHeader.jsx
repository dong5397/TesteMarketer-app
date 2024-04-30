import React from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // Search 컴포넌트 import 추가

function MainHeader() {
  return (
    <StyledHeader>
      <Container>
        <Cell className="left">
          <LogoLink to={"/"}>
            <Img src={logo} alt="Logo" />
          </LogoLink>
        </Cell>

        <NavigationBar />
      </Container>
    </StyledHeader>
  );
}

export default MainHeader;

const StyledHeader = styled.header`
  background-color: #ffffff;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px; /* 헤더 높이 조정 */
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌우 정렬을 위해 추가합니다. */
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  gap: rem;
`;

const LogoLink = styled(Link)`
  margin-right: auto; /* 로고를 헤더의 왼쪽으로 붙이기 위해 추가 */
`;

const Img = styled.img`
  width: 150px;
  cursor: pointer;
  display: block;
  transition: transform 0.3s; /* 호버 효과를 위한 트랜지션 추가 */
  &:hover {
    transform: scale(1.05); /* 호버할 때 조금씩 확대되는 효과 */
  }
`;

const SearchInput = styled.input`
  width: 300px; /* 검색 창 너비 조정 */
  margin-left: auto; /* 검색 창을 헤더의 오른쪽으로 옮깁니다. */
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #aaa;
  }
  &::placeholder {
    color: #999;
  }
`;
