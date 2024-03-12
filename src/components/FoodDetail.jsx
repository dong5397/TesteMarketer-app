// FoodDetail.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FoodIndex from "./FoodIndex";
import Modal from "react-modal";
import Review from "./Review";

function FoodDetail({ selectedRestaurant }) {
  const [isModalOpen, setDetailModalOpen] = useState(false);
  const [isReviewOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (selectedRestaurant && selectedRestaurant.restaurants_id) {
        try {
          const response = await fetch(
            `https://teste-backend.fly.dev/api/v1/restaurants/${selectedRestaurant.restaurants_id}/reviews`
          );
          if (response.ok) {
            const data = await response.json();
            setReviews(data);
          } else {
            // 요청이 실패하면 빈 배열을 리뷰 목록으로 설정하거나 오류 처리
            console.error("Failed to fetch reviews:", response.statusText);
            setReviews([]);
          }
        } catch (error) {
          console.error("Error fetching reviews:", error.message);
          setReviews([]);
        }
      } else {
        // 선택된 레스토랑이 없는 경우
        console.warn("No selected restaurant to fetch reviews");
        setReviews([]);
      }
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
  // FoodDetail.jsx에 리뷰 등록 함수 수정
  const handleReviewSubmit = async (reviewText) => {
    try {
      const response = await fetch(
        `https://teste-backend.fly.dev/api/v1/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurants_id: selectedRestaurant.restaurants_id, // 수정된 부분
            review_text: reviewText,
            review_date: new Date().toISOString().slice(0, 10),
            user_id: 1,
          }),
        }
      );

      if (!response.ok) {
        // 여기서 response 상태에 따라 다른 처리를 할 수 있습니다.
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`
        );
      }

      const newReview = await response.json();
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setReviewModalOpen(false);
    } catch (error) {
      console.error("Error submitting review:", error.message);
      alert("리뷰 제출에 실패했습니다. 다시 시도해주세요.");
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
        <div key={selectedRestaurant.restaurants_id}>
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
        {selectedRestaurant && (
          <FoodIndex
            key={selectedRestaurant.restaurants_id}
            restaurant={selectedRestaurant}
          />
        )}
        {reviews.map((review) => (
          <div key={review.restaurant_id}>
            <ReviewText>리뷰: {review.review_text}</ReviewText>
            <button onClick={() => handleReviewDelete(review.restaurant_id)}>
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
        {selectedRestaurant && (
          <Review
            key={selectedRestaurant.restaurants_id}
            onSubmit={handleReviewSubmit}
          />
        )}
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

  outline: none;
  padding: 20px;
`;
