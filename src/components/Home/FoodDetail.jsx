import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedRestaurantFromButtonState,
  isDetailModalOpenState,
  mapMoveFunctionState,
  selectedRestaurantState,
} from "../../state/mapAtoms";
import FoodIndex from "../Home/FoodIndex";
import { useNavigate } from "react-router-dom";

function FoodDetail() {
  const selectedRestaurant = useRecoilValue(selectedRestaurantFromButtonState);
  const setIsDetailModalOpen = useSetRecoilState(isDetailModalOpenState);
  const mapMoveFunction = useRecoilValue(mapMoveFunctionState); // Get the map move function
  const setSelectedRestaurant = useSetRecoilState(selectedRestaurantState); // 리뷰 상태 설정 함수
  const [showFoodIndex, setShowFoodIndex] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const handleShowFoodIndex = () => {
    setShowFoodIndex(true);
  };

  const handleDetailPost = () => {
    if (!selectedRestaurant || !selectedRestaurant.restaurants_id) {
      console.error("No selected restaurant or restaurant ID");
      return;
    }

    // reviewRestaurantState에 선택한 레스토랑 정보 저장
    setSelectedRestaurant(selectedRestaurant);

    // 리뷰 페이지로 이동
    navigate(`/review/${selectedRestaurant.restaurants_id}`);
  };

  const moveToMap = () => {
    if (selectedRestaurant && mapMoveFunction) {
      const { latitude, longitude } = selectedRestaurant;
      mapMoveFunction(latitude, longitude); // Call the map move function
    } else {
      console.error(
        "지도 이동 함수가 정의되지 않았거나 선택된 레스토랑이 없습니다."
      );
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsDetailModalOpen(false); // 모달 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDetailModalOpen]);

  return (
    <Container>
      <ButtonContainer ref={modalRef}>
        {selectedRestaurant && (
          <div key={selectedRestaurant.restaurants_id}>
            {showFoodIndex ? (
              <FoodIndex />
            ) : (
              <>
                <Button onClick={handleShowFoodIndex}>세부 정보 보기</Button>
                <Button onClick={handleDetailPost}>리뷰 작성하기</Button>
                <Button onClick={moveToMap}>지도로 이동</Button>
              </>
            )}
          </div>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default FoodDetail;

// 스타일 컴포넌트
// 스타일 컴포넌트
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 10px; /* 모바일에서 여백 조정 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  justify-content: center;
  gap: 15px; /* 버튼 간 간격 */
  border-radius: 10px;
  padding: 10px;

  @media screen and (max-width: 481px) {
    flex-direction: column; /* 모바일에서도 세로 정렬 */
    align-items: center;
    justify-content: center;
    width: 100%; /* 가로 전체 */
    height: auto;
    align-items: stretch; /* 버튼 크기를 동일하게 맞춤 */
  }
`;

const Button = styled.button`
  background-color: #d1d195;
  color: black;
  border: none;
  font-weight: bold;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  border: solid 1px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;

  &:hover {
    background-color: #b6b654;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #9d9d4d;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 481px) {
    width: 40%; /* 버튼 크기를 줄임 */
    padding: 8px 5px; /* 패딩 조정 */
    font-size: 10px; /* 폰트 크기 조정 */
    border-radius: 6px; /* 버튼 모서리 조정 */
  }
`;
