import React, { useState } from "react";
import styled from "styled-components";

const DirectionsFinderModal = ({ showModal, closeModal }) => {
  const [origin, setOrigin] = useState(""); // 출발지 상태
  const [destination, setDestination] = useState(""); // 도착지 상태

  const handleFindDirections = () => {
    if (!origin || !destination) {
      alert("출발지와 도착지를 입력해주세요.");
      return;
    }

    // 여기에 출발지(origin)와 도착지(destination)를 가지고 길찾기 API를 호출하는 로직 추가
    console.log("출발지:", origin, "도착지:", destination);
    closeModal(); // 모달 닫기
  };

  if (!showModal) {
    return null; // 모달이 안보일 때는 아무것도 렌더링하지 않음
  }

  return (
    <ModalContainer>
      <ModalContent>
        <h2>길찾기</h2>
        <label>
          출발지:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="출발지를 입력하세요"
          />
        </label>
        <label>
          도착지:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="도착지를 입력하세요"
          />
        </label>
        <Buttons>
          <button onClick={handleFindDirections}>길찾기</button>
          <button onClick={closeModal}>닫기</button>
        </Buttons>
      </ModalContent>
    </ModalContainer>
  );
};

export default DirectionsFinderModal;

// 스타일링 컴포넌트
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
