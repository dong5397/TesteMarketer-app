import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const MAX_RATING = 5; // Maximum rating value

function RatingStars({ rating, onRate }) {
  const [hoverRating, setHoverRating] = useState(0); // State to track hovered rating

  // Handle mouse hover over a star
  const handleMouseOver = (index) => {
    setHoverRating(index);
  };

  // Handle mouse leave from the star container
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  // Handle click on a star to set the rating
  const handleClick = (index) => {
    onRate(index);
  };

  // Generate an array of star elements
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
          <FontAwesomeIcon icon={solidStar} size="2x" />
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
    color: #f1c40f; // Yellow color when hovering over the star
  }
`;
