import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { reviewsState } from "../../state/reviewAtoms";
import ReviewItem from "./ReviewItem";

function ReviewList({ onDelete }) {
  const [reviews, setReviews] = useRecoilState(reviewsState);

  return (
    <ReviewListContainer>
      <ul>
        {reviews.map((review) => (
          <ReviewItem
            key={review.review_id}
            review={review}
            onDelete={onDelete}
          />
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
