import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import FoodIndex from "./FoodIndex";
import Review from "./Review";

Modal.setAppElement("#root");

function FoodDetail({ selectedRestaurant }) {
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (selectedRestaurant.restaurants_id) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/v1/restaurants/${selectedRestaurant.restaurants_id}/reviews`
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

  const handleDetailModalOpen = () => {
    setDetailModalOpen(true);
  };

  const handleReviewModalOpen = () => {
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (reviewText) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/reviews`, {
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
      });

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
      `http://localhost:3000/api/v1/reviews/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.review_id !== reviewId)
      );
    }
  };

  return (
    <div>
      {selectedRestaurant && (
        <div key={selectedRestaurant.restaurants_id}>
          <p>
            세부 정보:{" "}
            <Button onClick={handleDetailModalOpen}>세부 정보 보기</Button>
          </p>
          <p>
            리뷰 작성하기:{" "}
            <Button onClick={handleReviewModalOpen}>리뷰 작성하기</Button>
          </p>
        </div>
      )}
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={() => setDetailModalOpen(false)}
        contentLabel="Selected Restaurant"
        style={{
          overlay: {
            zIndex: 1000,
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
          <CloseButton onClick={() => setDetailModalOpen(false)}>
            닫기
          </CloseButton>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isReviewModalOpen}
        onRequestClose={() => setReviewModalOpen(false)}
        style={{
          overlay: {
            zIndex: 1000,
          },
        }}
      >
        <Review
          onSubmit={handleReviewSubmit}
          onCancel={() => setReviewModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default FoodDetail;

const ModalContent = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  position: relative;
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

const CloseButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;
