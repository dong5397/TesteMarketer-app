import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function LoginDetail() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const closeModal = () => {
    setModalIsOpen(false);
    navigate("/");
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    fetch("https://maktertest.fly.dev/api/v1/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.open("/", "_self");
        } else {
          throw new Error("로그인 실패");
        }
      })
      .catch((error) => {
        console.error("로그인 실패:", error);
        // 로그인 실패 처리
      });
  };

  const navigateToRegister = () => {
    navigate("/Joinmembership");
  };

  return (
    <div>
      <StyledModal isOpen={modalIsOpen} contentLabel="로그인 모달">
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h2>로그인</h2>
        <form onSubmit={handleLoginSubmit}>
          <Input
            type="text"
            id="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            id="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">로그인</Button>
          <div />
          <Button onClick={navigateToRegister}>회원가입 하기</Button>
        </form>
      </StyledModal>
    </div>
  );
}

export default LoginDetail;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  width: 400px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
`;
