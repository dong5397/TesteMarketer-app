import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



function Header({ setAuth }) {

  const [name, setName] = useState("")

  async function getName() {
    try {
      const response = await fetch("http://localhost:3000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      console.log(parseRes)

      setName(parseRes.user_name)
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName()
  },[])

  const logout_sucessfully = () => toast("로그아웃 성공!");

  function logout(e)  {
    e.preventDefault();
    localStorage.removeItem("token")
    setAuth(false);
    logout_sucessfully()
  }

  // props로 받은 userName을 사용하기 때문에, localStorage에서 다시 가져올 필요 없음
  return (
    <Container>
      <Cell className="left">
        <Link to={"/"}>
          <Img src="https://modo-phinf.pstatic.net/20150520_153/1432118386155aFLGK_JPEG/mosaBygLif.jpeg?type=f320_320" alt="Logo" />
        </Link>
      </Cell>
      
       
      <UserName>안녕하세요, {name}님</UserName>
      <button onClick={e => logout(e)}>Logout</button>
      
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.1rem;
  padding: 0.5rem 0;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  &.right {
    font-size: 1.3rem;
    cursor: pointer;
  }
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
  margin-left: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  align-self: center;
`;