import React, { useState } from "react";
import styled from "styled-components";

function Review({ onSubmit, restaurant_id }) {
  // restaurants_id를 restaurant_id로 수정
  const [reviewText, setReviewText] = useState("");

  // 폼 제출 이벤트 핸들러
  // Review.jsx에 리뷰 제출 함수 수정
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://teste-backend.fly.dev/api/v1/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            restaurant_id: restaurant_id, // restaurants_id를 restaurant_id로 수정
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
      onSubmit(newReview);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error.message);
      alert("리뷰 제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 리뷰 텍스트 변경 이벤트 핸들러
  const handleTextChange = (event) => {
    setReviewText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <StyledTextarea
          name="review"
          value={reviewText}
          onChange={handleTextChange}
        />
      </label>
      <button type="submit">리뷰 제출하기</button>
    </form>
  );
}

export default Review;

const StyledTextarea = styled.textarea`
  width: 300px;
  height: 200px;
`;
