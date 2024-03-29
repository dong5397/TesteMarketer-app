import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Main({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      localStorage.setItem("token", parseRes.token);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Container>
      <div>
        <h2>로그인</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <button type="submit">로그인</button>
          <div />
          <Link to={"/register"}>회원가입 하기</Link>
        </form>
      </div>
    </Container>
  );
}

export default Main;

const Container = styled.div``;
const RestPost = styled.div`
  display: flex;
  align-items: center;
`;
