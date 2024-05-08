import React from "react";
import styled from "styled-components";
import ReviewItem from "./ReviewItem";

function ReviewList({ reviews }) {
  return (
    <ReviewListContainer>
      <ul>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
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

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;
