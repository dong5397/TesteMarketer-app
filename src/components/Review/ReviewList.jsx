import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewItem from "./ReviewItem";

function ReviewList({ reviews, onDelete }) {
  // 삭제 요청 후 로컬 상태를 갱신하기 위한 상태

  return (
    <ReviewListContainer>
      <ul>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} onDelete={onDelete} />
        ))}
      </ul>
    </ReviewListContainer>
  );
}

export default ReviewList;

const ReviewListContainer = styled.div`
  flex: 1;
  padding: 20px;
`;
