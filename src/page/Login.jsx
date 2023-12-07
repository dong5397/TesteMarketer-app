import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import KakaoLogin from "../components/KakoLogin";

Modal.setAppElement("#root");

function Login() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Button onClick={openModal}>로그인</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Kakao Login Modal"
        style={modalStyles}
      >
        <Title>카카오 로그인</Title>
        <KakaoLogin />
        <CloseButton onClick={closeModal}>닫기</CloseButton>
      </Modal>
    </>
  );
}

export default Login;

const Button = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-bottom: 100px;
  font-size: 24px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #333333;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
`;

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    backgroundColor: "#ffffff",
    border: "none",
    padding: "20px",
    maxWidth: "400px",
    width: "100%",
    maxHeight: "80vh",
    overflow: "auto",
  },
};
