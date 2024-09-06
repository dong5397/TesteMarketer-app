// 파일: src/components/Review/ReviewList.jsx

import React from "react";
import { useRecoilState } from "recoil";
import { reviewsState } from "../../state/reviewAtoms"; // Recoil 상태 불러오기
import styled from "styled-components";
import ReviewItem from "./ReviewItem";

function ReviewList({ onDelete }) {
  const [reviews] = useRecoilState(reviewsState); // Recoil을 사용하여 상태 관리

  return (
    <ReviewListContainer>
      <ul>
        {reviews.map((review) => (
          // 고유한 key prop 추가
          <ReviewItem
            key={review.review_id || review.id}
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
