import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function JoinmembershipDetail() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const response = await fetch(
        "https://makter-testbackend.fly.dev/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        alert("회원가입 성공: " + data.msg);
        closeModal();
      } else {
        throw new Error("회원가입 실패");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // 모달을 닫는 함수
  function closeModal() {
    setModalIsOpen(false);
    navigate("/"); // 홈으로 이동
  }

  return (
    <div>
      <CustomModal isOpen={modalIsOpen} contentLabel="회원가입 모달">
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="이름"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="이메일 주소"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <ActionButton type="submit">회원가입</ActionButton>
        </form>
      </CustomModal>
    </div>
  );
}

export default JoinmembershipDetail;

// 모달 스타일
const CustomModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px; // 너비 조정
  background: #f9f9f9; // 배경색 변경
  padding: 25px; // 패딩 조정
  border-radius: 15px; // 테두리 둥글기 조정
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const ActionButton = styled.button`
  display: block;
  width: 100%; // 버튼 너비를 input과 동일하게 조정
  padding: 12px 0; // 패딩 조정
  margin-top: 15px; // 마진 상단 조정
  border: none;
  border-radius: 7px; // 버튼 둥글기 조정
  background-color: #28a745; // 배경색 변경
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #218838; // 호버 색상 변경
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 12px; // 패딩 조정
  margin: 10px 0;
  border: 1px solid #ddd; // 테두리 색상 변경
  border-radius: 7px; // 입력창 둥글기 조정
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px; // 위치 조정
  right: 20px; // 위치 조정
  border: none;
  background-color: transparent;
  font-size: 24px; // 폰트 크기 조정
  cursor: pointer;
`;
