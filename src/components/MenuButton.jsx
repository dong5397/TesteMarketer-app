import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <Button onClick={handleClick}>
        <MenuIcon />
      </Button>
      <MenuList isOpen={isOpen}>
        <MenuItem>
          <MenuLink to="/sub1">로그인</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/sub2">내정보</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/sub3">개발자들</MenuLink>
        </MenuItem>
      </MenuList>
    </Container>
  );
}

export default MenuButton;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const MenuIcon = styled(FaBars)`
  font-size: 24px;
  color: #333333;
`;

const MenuList = styled.div`
  position: absolute;
  right: 100%; // 메뉴가 버튼의 왼쪽에서 시작하도록 설정합니다.
  background-color: #ffffff;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  flex-direction: row;
  align-items: flex-start; // 왼쪽 정렬을 위해 flex-start로 수정합니다.
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.li`
  margin-right: 20px;
  margin-bottom: 20px;
  list-style: none;
`;

const MenuLink = styled(Link)`
  color: #333333;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  display: inline;
  &:hover {
    color: #007bff;
  }
`;
//위의 코드에서는 `MenuList` 컴포넌트의 `align-items` 속성을 `flex-start`로 수정하여 메뉴 항목들이 왼쪽으로 정렬되도록 변경되었습니다.

//이렇게 코드를 수정하시면 메뉴 버튼을 눌렀을 때 메뉴가 왼쪽으로 나타날 것입니다. 필요에 따라 추가적인 스타일링을 적용하시면 됩니다. 만약 여전히 원하는 결과를 얻지 못하신다면, 코드와 함께 원하시는 메뉴 버튼의 모습을 자세히 설명해주시면 더 도움을 드릴 수 있을 것입니다.
