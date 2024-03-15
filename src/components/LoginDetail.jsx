import React, { useState, useRef } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function LoginDetail() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();

  function closeModal() {
    setModalIsOpen(false);
    navigate("/");
  }

  function navigateToRegister() {
    navigate("/Joinmembership");
  }

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  function create_token(e) {
    e.preventDefault(); // 폼 제출을 방지합니다.
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    fetch(`/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // 응답 상태가 OK가 아닌 경우 에러 처리
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json(); // 응답 본문을 JSON으로 변환
      })
      .then((data) => {
        if (data.data.resultCode === "S-1") {
          const token = data.data.token;
          const userName = data.data.userName;

          document.cookie = `token=${token};path=/`; // 쿠키에 토큰 저장
          localStorage.setItem("userName", userName); // 로컬 스토리지에 사용자 이름 저장

          alert("로그인 성공!");
          closeModal(); // 성공 후 모달 닫기
        } else {
          alert("로그인 실패: " + data.data.msg);
        }
      })
      .catch((error) => {
        alert("로그인 실패: " + error.message);
      });
  }

  return (
    <div>
      <StyledModal isOpen={modalIsOpen} contentLabel="로그인 모달">
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h2>로그인</h2>
        <form>
          {/* ref 속성을 추가하여 input 요소를 연결합니다. */}
          <Input
            type="text"
            id="email"
            placeholder="이메일 주소"
            ref={emailRef}
          />
          <Input
            type="password"
            id="password"
            placeholder="비밀번호"
            ref={passwordRef}
          />
          {/* 로그인 버튼에서 create_token 함수 호출 */}
          <Button type="submit" onClick={create_token}>
            로그인
          </Button>
          <div />
          <Button onClick={navigateToRegister}>회원가입 하기</Button>
        </form>
      </StyledModal>
    </div>
  );
}

export default LoginDetail;

// 스타일 컴포넌트 정의
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
