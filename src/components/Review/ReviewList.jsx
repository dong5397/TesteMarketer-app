import React from "react";
import { useRecoilValue } from "recoil";
import { reviewsState } from "../../state/reviewAtoms"; // Import Recoil state
import styled from "styled-components";
import ReviewItem from "./ReviewItem";

function ReviewList() {
  const reviews = useRecoilValue(reviewsState); // Use Recoil to get the reviews

  return (
    <ReviewListContainer>
      <ul>
        {reviews.map((review) => (
          <ReviewItem key={review.review_id || review.id} review={review} />
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
