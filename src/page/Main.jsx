import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Main({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [userName, setUserName] = useState("");

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const login_sucessfully = () => toast("로그인 성공!");

  const login_fail = () => toast("로그인 실패!");

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
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        // 사용자 이름 가져오기
        const userResponse = await fetch("http://localhost:3000/dashboard/", {
          method: "GET",
          headers: { token: parseRes.token },
        });
        const userData = await userResponse.json();
        setUserName(userData.user_name);

        setAuth(true);
        login_sucessfully();
      } else {
        setAuth(false);
        login_fail();
      }
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
      {/* 사용자 이름을 헤더에 전달 */}
      {userName && <Header setAuth={setAuth} userName={userName} />}
    </Container>
  );
}

export default Main;

const Container = styled.div``;
