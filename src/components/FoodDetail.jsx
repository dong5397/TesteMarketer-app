import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import FoodIndex from "./FoodIndex";
import Review from "./Review";

Modal.setAppElement("#root");

function FoodDetail({ selectedRestaurant }) {
  const [isModalOpen, setDetailModalOpen] = useState(false);
  const [isReviewOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (selectedRestaurant?.restaurants_id) {
        try {
          const response = await fetch(
            `https://maktertest.fly.dev/api/v1/restaurants/${selectedRestaurant.restaurants_id}/reviews`
          );
          if (response.ok) {
            const data = await response.json();
            setReviews(data.data);
          } else {
            console.error("Failed to fetch reviews:", response.statusText);
            setReviews([]);
          }
        } catch (error) {
          console.error("Error fetching reviews:", error.message);
          setReviews([]);
        }
      } else {
        console.warn("No selected restaurant to fetch reviews");
        setReviews([]);
      }
    };

    fetchReviews();
  }, [selectedRestaurant]);

  const handleDetailClick = () => {
    setDetailModalOpen(true);
  };

  const handleReviewClick = () => {
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (reviewText) => {
    try {
      const response = await fetch(
        `https://maktertest.fly.dev/api/v1/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurants_id: selectedRestaurant.restaurants_id,
            review_text: reviewText,
            review_date: new Date().toISOString().slice(0, 10),
            user_id: 1,
          }),
        }
      );

      if (!response.ok) {
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

  const handleReviewDelete = async (reviewId) => {
    const response = await fetch(
      `https://maktertest.fly.dev/api/v1/reviews/${reviewId}`,
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
            <Button onClick={handleDetailClick}>세부 정보 보기</Button>
          </p>
          <p>
            리뷰 작성하기:{" "}
            <Button onClick={handleReviewClick}>리뷰 작성하기</Button>
          </p>
        </div>
      )}
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
          <ReviewContainer key={review.review_id}>
            <ReviewText>리뷰: {review.review_text}</ReviewText>
            <Button onClick={() => handleReviewDelete(review.review_id)}>
              삭제하기
            </Button>
          </ReviewContainer>
        ))}
      </StyledModal>
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

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  padding: 20px;
`;

const ReviewContainer = styled.div`
  margin-top: 20px;
`;

const ReviewText = styled.p`
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
`;

const Button = styled.button`
  background-color: #f1c40f;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e67e22;
  }
`;