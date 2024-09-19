import React from "react";
import styled from "styled-components";
import DirectionsFinder from "./DirectionsFinder"; // DirectionsFinder 컴포넌트를 import

const DirectionsFinderModal = ({ showModal, closeModal }) => {
  if (!showModal) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <DirectionsFinder />
      </ModalContent>
    </ModalOverlay>
  );
};

export default DirectionsFinderModal;

// Styled components for the modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;
