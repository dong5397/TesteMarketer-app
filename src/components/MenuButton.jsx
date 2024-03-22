import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchLoginStatus = async () => {
      try {
        const response = await fetch(
          "https://makterteste.fly.dev/api/v1/login/success",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIsLogin(true);
          setUser(data);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Error fetching login success data:", error);
        setIsLogin(false);
      }
    };
    fetchLoginStatus();
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const accessToken = () => {
    fetch("https://makterteste.fly.dev/api/v1/accesstoken", {
      method: "GET",
      credentials: "include",
    });
  };

  const refreshToken = () => {
    fetch("https://makterteste.fly.dev/api/v1/refreshtoken", {
      method: "GET",
      credentials: "include",
    });
  };

  const logout = () => {
    fetch("https://makterteste.fly.dev/api/v1/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          window.open("/", "_self");
        } else {
          throw new Error("Failed to logout");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <>
      <Container>
        <Button onClick={handleClick}>
          <MenuIcon />
        </Button>
        <MenuList isOpen={isOpen}>
          {!isLogin ? (
            <MenuItem>
              <MenuLink to="/Login">로그인</MenuLink>
            </MenuItem>
          ) : (
            <MenuItem>
              <MenuLink onClick={logout}>로그아웃</MenuLink>
            </MenuItem>
          )}
          <MenuItem>
            <MenuLink to="/Joinmembership">회원가입</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/sub3">개발자들</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink onClick={accessToken}>accessToken</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink onClick={refreshToken}>refreshToken</MenuLink>
          </MenuItem>
        </MenuList>
      </Container>
    </>
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
  font-size: 50px;
  color: #333333;
`;

const MenuList = styled.div`
  position: absolute;
  right: 100%; // 메뉴가 버튼의 왼쪽에서 시작하도록 설정합니다.
  background-color: #ffffff;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  display: ${(props) => (props.isOpen ? "flex" : "none")}; // 수정된 부분
  flex-direction: column;
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
