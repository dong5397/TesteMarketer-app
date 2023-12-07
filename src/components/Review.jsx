import React, { useState } from "react";

function Review({ onSubmit }) {
  const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트를 관리할 상태 값

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(reviewText);
    setReviewText(""); // 리뷰 텍스트 초기화
  };

  // 리뷰 텍스트 변경 이벤트 핸들러
  const handleTextChange = (event) => {
    setReviewText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        리뷰:
        <textarea
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
