import React from "react";
import styled from "styled-components";
import ReviewItem from "./ReviewItem";

function ReviewList({ reviews, OnDelete }) {
  return (
    <ReviewListContainer>
      <ul>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} OnDelete={OnDelete} />
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
