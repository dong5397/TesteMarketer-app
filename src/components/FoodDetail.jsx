import React, { useState, useEffect } from "react";
import FoodIndex from "./FoodIndex";
import Modal from "react-modal";
import styled from "styled-components";
import Review from "./Review";

function FoodDetail({ selectedRestaurant }) {
  const [isModalOpen, setDetailModalOpen] = useState(false);
  const [isReviewOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        `https://teste-backend.fly.dev/api/v1/restaurants/${selectedRestaurant.id}/reviews`
      );
      const data = await response.json();
      setReviews(data);
    };

    fetchReviews();
  }, [selectedRestaurant]);

  // 모달: useState 의 상태를 false에서 true로 바꿈
  const handleDetailClick = () => {
    setDetailModalOpen(true);
  };

  // 리뷰: useState 의 상태를 false에서 true로 바꿈
  const handleReviewClick = () => {
    setReviewModalOpen(true);
  };

  // 리뷰 등록
  const handleReviewSubmit = async (reviewText) => {
    const response = await fetch(
      `https://teste-backend.fly.dev/api/v1/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant_id: selectedRestaurant.id,
          review_text: reviewText,
          user_id: 1, // 사용자 인증 시스템이 없으므로 임시로 1을 사용
        }),
      }
    );

    if (response.ok) {
      const newReview = await response.json();
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setReviewModalOpen(false);
    }
  };

  // 리뷰 삭제
  const handleReviewDelete = async (reviewId) => {
    const response = await fetch(
      `https://teste-backend.fly.dev/api/v1/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    }
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
      {/* 식당 정보를 보기위한 모달 */}
      <StyledModal
        isOpen={isModalOpen}
        onRequestClose={() => setDetailModalOpen(false)}
        contentLabel="Selected Restaurant"
      >
        {selectedRestaurant && <FoodIndex restaurant={selectedRestaurant} />}
        {reviews.map((review, index) => (
          <div key={index}>
            <ReviewText>리뷰: {review.text}</ReviewText>
            <button onClick={() => handleReviewDelete(review.id)}>
              삭제하기
            </button>
          </div>
        ))}
      </StyledModal>
      {/* 리뷰 작성을 하기위한 모달 */}
      <StyledModal
        isOpen={isReviewOpen}
        onRequestClose={() => setReviewModalOpen(false)}
      >
        {selectedRestaurant && <Review onSubmit={handleReviewSubmit} />}
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
  top: 40%;
  left: 10%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 700px;
  background: white;
  border: 1px solid #ccc;
  overflow: auto;
  webkitoverflowscrolling: touch;
  borderradius: 4px;
  outline: none;
  padding: 20px;
`;
