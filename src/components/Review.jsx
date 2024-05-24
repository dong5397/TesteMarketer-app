import React, { useState } from "react";
import styled from "styled-components";

function Review({ onSubmit, restaurant_id }) {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!reviewText.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurant_id,
          review_text: reviewText,
          review_date: new Date().toISOString().slice(0, 10), // 현재 날짜를 YYYY-MM-DD 형식으로 전송
          user_id: 1, // 실제 애플리케이션에서는 사용자 인증을 통해 얻은 사용자 ID를 사용해야 합니다.
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`
        );
      }

      const newReview = await response.json();
      onSubmit(newReview.data); // 서버로부터 받은 새 리뷰 데이터를 부모 컴포넌트에 전달
      setReviewText(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Error submitting review:", error.message);
      alert("리뷰 제출에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleTextChange = (event) => {
    setReviewText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <StyledTextarea
          name="review"
          placeholder="리뷰를 작성해주세요."
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
  margin: 10px 0;
  padding: 10px;
`;
