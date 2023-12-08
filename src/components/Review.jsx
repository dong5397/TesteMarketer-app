import React, { useState } from "react";
import styled from "styled-components";

function Review({ onSubmit, restaurantId }) {
  const [reviewText, setReviewText] = useState(
    localStorage.getItem(restaurantId) || ""
  );

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem(restaurantId, reviewText); // 리뷰 텍스트를 로컬 스토리지에 저장
    onSubmit(reviewText);
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
