import React, { useState, useEffect } from "react";
import FoodIndex from "../components/FoodIndex";
import Modal from "react-modal";
import styled from "styled-components";
import Review from "../components/Review";

function FoodDetail({ selectedRestaurant }) {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || []
  );
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleDetailClick = () => {
    setDetailModalOpen(true);
  };

  const handleReviewClick = () => {
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (reviewText) => {
    setReviews([...reviews, { id: nextId, text: reviewText }]);
    setNextId(nextId + 1);
    setReviewModalOpen(false);
  };

  const handleReviewDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <div>
      {selectedRestaurant && (
        <div>
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
        {selectedRestaurant && <FoodIndex restaurant={selectedRestaurant} />}
        {reviews.map((review) => (
          <div key={review.id}>
            <ReviewText>리뷰: {review.text}</ReviewText>
            <button onClick={() => handleReviewDelete(review.id)}>
              삭제하기
            </button>
          </div>
        ))}
      </StyledModal>

      <StyledModal
        isOpen={isReviewModalOpen}
        onRequestClose={() => setReviewModalOpen(false)}
        contentLabel="Write a Review"
      >
        <Review onSubmit={handleReviewSubmit} />
      </StyledModal>
    </div>
  );
}

export default FoodDetail;

const ReviewText = styled.p`
  font-size: 20px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
`;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 30%;
  left: 10%;
  transform: translate(-50%, -50%);
  width: 400px; // 변경된 부분
  height: 700px;
  background: white;
  border: 1px solid #ccc;
  overflow: auto;
  webkitoverflowscrolling: touch;
  borderradius: 4px;
  outline: none;
  padding: 20px;
`;
