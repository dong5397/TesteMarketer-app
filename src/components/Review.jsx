import React, { useState } from "react";
import styled from "styled-components";

function Review({ onSubmit }) {
  const [reviewText, setReviewText] = useState("");

  // 폼 제출 이벤트 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://teste-backend.fly.dev/api/v1/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          review_text: reviewText,
          user_id: 1, // 사용자 인증 시스템이 없으므로 임시로 1을 사용
        }),
      }
    );

    if (response.ok) {
      const newReview = await response.json();
      onSubmit(newReview);
      setReviewText("");
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
