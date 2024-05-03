import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import logo from "../../Images/logo.png";

function Header({ setAuth }) {
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          headers: { token: localStorage.token },
        });

        const parseRes = await response.json();
        console.log(parseRes);

        setName(parseRes.username); // 여기서 setName으로 상태 업데이트
      } catch (err) {
        console.error(err.message);
      }
    };

    getName();
  }, []);

  const logout_sucessfully = () => toast("로그아웃 성공!");

  const logout = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/v1/logout", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      localStorage.removeItem("token");
      setAuth(false);
      logout_sucessfully();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Link to={"/"}>
        <Img src={logo} alt="Logo" />
      </Link>

      <Cell>
        <UserName>안녕하세요, {name}님</UserName>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Cell>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  justify-content: space-between;
  align-items: center;
  margin: 0.1rem;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
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

const UserName = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #555;
  }
`;
