import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const MAX_RATING = 5; // 최대 평점 값

function RatingStars({ rating, onRate }) {
  const [hoverRating, setHoverRating] = useState(0); // 호버된 평점을 추적하는 상태

  // 별 위에 마우스를 올렸을 때 처리
  const handleMouseOver = (index) => {
    setHoverRating(index);
  };

  // 별 컨테이너에서 마우스가 떠났을 때 처리
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  // 별을 클릭하여 평점을 설정할 때 처리
  const handleClick = (index) => {
    onRate(index);
  };

  // 별 요소 배열 생성
  const stars = [];
  for (let i = 1; i <= MAX_RATING; i++) {
    stars.push(
      <StarIcon
        key={i}
        onClick={() => handleClick(i)}
        onMouseOver={() => handleMouseOver(i)}
        onMouseLeave={handleMouseLeave}
      >
        {rating >= i || hoverRating >= i ? (
          <FontAwesomeIcon icon={solidStar} size="2x" color="#F4CE14" />
        ) : (
          <FontAwesomeIcon icon={regularStar} size="2x" />
        )}
      </StarIcon>
    );
  }

  return <StarContainer>{stars}</StarContainer>;
}

export default RatingStars;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarIcon = styled.span`
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f1c40f; // 별 위에 호버할 때 노란색으로 변경
  }
`;
