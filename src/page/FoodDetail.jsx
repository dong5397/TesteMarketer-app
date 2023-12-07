import React, { useState } from "react";
import FoodIndex from "../components/FoodIndex";
import Modal from "react-modal";
import styled from "styled-components";
import Review from "../components/Review";

function FoodDetail({ selectedRestaurant }) {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [review, setReview] = useState(""); // 리뷰를 저장할 상태

  const handleDetailClick = () => {
    setDetailModalOpen(true);
  };

  const handleReviewClick = () => {
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (reviewText) => {
    setReview(reviewText);
    setReviewModalOpen(false);
  };

  return (
    <div>
      {selectedRestaurant && (
        <div>
          <p>{selectedRestaurant.road_address_name}</p>
          <p>{selectedRestaurant.phone}</p>
          <p>
            세부 정보:{" "}
            <button onClick={handleDetailClick}>세부 정보 보기</button>
          </p>
          <p>
            리뷰 작성하기:{" "}
            <button onClick={handleReviewClick}>리뷰 작성하기</button>
          </p>
        </div>
      )}
      <StyledModal
        isOpen={isDetailModalOpen}
        onRequestClose={() => setDetailModalOpen(false)}
        contentLabel="Selected Restaurant"
      >
        <FoodIndex selectedRestaurant={selectedRestaurant} />
        <p>리뷰: {review}</p> {/* 리뷰를 표시합니다 */}
      </StyledModal>
      <StyledModal
        isOpen={isReviewModalOpen}
        onRequestClose={() => setReviewModalOpen(false)}
        contentLabel="Write a Review"
      >
        <Review onSubmit={handleReviewSubmit} />{" "}
        {/* onSubmit prop을 전달합니다 */}
      </StyledModal>
    </div>
  );
}
export default FoodDetail;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 30%;
  left: 10%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 700px;
  background: white;
  border: 1px solid #ccc;
  overflow: auto;
  webkitoverflowscrolling: touch;
  borderradius: 4px;
  outline: none;
  padding: 20px;
`;
