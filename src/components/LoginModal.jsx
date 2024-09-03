import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

function LoginModal({ show, onClose, setAuth }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // 세션 쿠키를 포함하여 요청
      });

      const parseRes = await response.json();

      console.log("로그인 응답:", parseRes);

      if (parseRes.resultCode === "S-1") {
        localStorage.setItem("sessionId", parseRes.sessionId); // 세션 ID 저장
        setAuth(true);
        console.log("session", parseRes.sessionId);
        toast.success("로그인 성공!");
        onClose();
      } else {
        toast.error("로그인 실패!");
      }
    } catch (err) {
      console.error("로그인 에러:", err.message);
      toast.error("로그인 에러: " + err.message);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">로그인</button>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default LoginModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  max-width: 768px;
  max-height: 450px;
  width: 100%;
  height: 100%;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  position: relative;
  z-index: 1001;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      background: #333;
      color: white;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #555;
      }
    }
  }
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
`;
