import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import FoodIndex from "./FoodIndex";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function FoodDetail({ selectedRestaurant, handleMapMove }) {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();

  const handleDetailModalOpen = () => {
    setDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setDetailModalOpen(false);
  };

  const handleDetailPost = () => {
    if (!selectedRestaurant || !selectedRestaurant.restaurants_id) {
      console.error("No selected restaurant or restaurant ID");
      return;
    }

    navigate(`/review/${selectedRestaurant.restaurants_id}`, {
      state: {
        id: `${selectedRestaurant.restaurants_id}`,
        name: `${selectedRestaurant.restaurants_name}`,
        address: `${selectedRestaurant.address}`,
        phone: `${selectedRestaurant.phone}`,
        opening_hours: `${selectedRestaurant.opening_hours}`,
        rating: `${selectedRestaurant.rating}`,
        image: `${selectedRestaurant.image}`,
      },
    });
  };

  const moveToMap = () => {
    if (handleMapMove && selectedRestaurant) {
      console.log(selectedRestaurant.latitude, selectedRestaurant.longitude);
      handleMapMove(selectedRestaurant.latitude, selectedRestaurant.longitude);
    } else {
      console.error(
        "handleMapMove 함수가 정의되지 않았거나 selectedRestaurant가 없습니다."
      );
    }
  };

  return (
    <div>
      {selectedRestaurant && (
        <div key={selectedRestaurant.restaurants_id}>
          <p>
            <Button onClick={handleDetailModalOpen}>세부 정보 보기</Button>
          </p>
          <p>
            <Button onClick={handleDetailPost}>리뷰 작성하기</Button>
          </p>
          <p>
            <Button onClick={moveToMap}>지도로 이동</Button>
          </p>
        </div>
      )}
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={handleDetailModalClose}
        contentLabel="Selected Restaurant"
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "90%",
            maxWidth: "600px",
            margin: "0 auto",
            position: "relative",
          },
        }}
      >
        <ModalContent>
          {selectedRestaurant && <FoodIndex restaurant={selectedRestaurant} />}
          <ReviewList>
            {reviews.map((review) => (
              <ReviewContainer key={review.review_id}>
                <ReviewText>리뷰: {review.review_text}</ReviewText>
                <Button onClick={() => handleReviewDelete(review.review_id)}>
                  삭제하기
                </Button>
              </ReviewContainer>
            ))}
          </ReviewList>
          <CloseButton onClick={handleDetailModalClose}>닫기</CloseButton>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default FoodDetail;

const ModalContent = styled.div`
  width: 100%;
`;

const ReviewList = styled.div`
  margin-top: 20px;
`;

const ReviewContainer = styled.div`
  margin-bottom: 10px;
`;

const ReviewText = styled.p`
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
`;

const Button = styled.button`
  background-color: #d1d195;
  color: black;
  border: none;
  font-weight: bold;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b6b654;
  }
`;

const CloseButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
