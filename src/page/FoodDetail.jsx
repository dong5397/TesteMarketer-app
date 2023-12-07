import React, { useState, useEffect } from "react"; // useEffect를 import
import FoodIndex from "../components/FoodIndex";
import Modal from "react-modal";
import styled from "styled-components";
import Review from "../components/Review";

const ReviewText = styled.p`
  font-size: 20px; // 폰트 크기를 20px로 설정합니다.
`;

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

function FoodDetail({ selectedRestaurant }) {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || [] // 로컬 스토리지에서 리뷰 데이터를 가져옵니다.
  );

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews)); // 리뷰 데이터를 로컬 스토리지에 저장합니다.
  }, [reviews]);

  const handleDetailClick = () => {
    setDetailModalOpen(true);
  };

  const handleReviewClick = () => {
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (reviewText) => {
    setReviews([...reviews, reviewText]); // 새로운 리뷰를 추가합니다.
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
        {reviews.map((review, index) => (
          <ReviewText key={index}>리뷰: {review}</ReviewText> // 모든 리뷰를 표시합니다.
        ))}
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
