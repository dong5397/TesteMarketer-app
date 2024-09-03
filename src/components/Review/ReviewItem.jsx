import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRecoilState } from "recoil";
import { reviewsState } from "../../state/reviewAtoms";
import RatingStars from "./RatingStars";

function ReviewItem({ review }) {
  const {
    review_id,
    username,
    review_contents,
    review_date,
    hashtags,
    rating,
  } = review;

  const [reviews, setReviews] = useRecoilState(reviewsState);
  const [isClicked, setIsClicked] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${year}-${month}-${day}`;
  };

  const reviewDeleteHandler = (event) => {
    event.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      // 리뷰 삭제 후 상태 업데이트
      setReviews(reviews.filter((r) => r.review_id !== review_id));
    }, 500);
  };

  return (
    <ReviewItemContainer>
      <Username>{username}</Username>
      <RatingStars rating={rating} />
      <Content>{review_contents}</Content>
      <Date>{formatDate(review_date)}</Date>
      <HashTagsContainer>
        {hashtags.map((hashtag, index) => (
          <HashTag key={index}>#{hashtag}</HashTag>
        ))}
      </HashTagsContainer>
      <ActionButtonsContainer>
        <DeleteButton isClicked={isClicked} onClick={reviewDeleteHandler}>
          <TrashIcon icon={faTrash} size="2xl" />
        </DeleteButton>
      </ActionButtonsContainer>
    </ReviewItemContainer>
  );
}

export default ReviewItem;

const ReviewItemContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: #f6f5f2;
  padding: 20px;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 34px;
`;

const Content = styled.div`
  font-size: 22px;
`;

const Date = styled.span`
  color: gray;
  font-size: 18px;
`;

const HashTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const HashTag = styled.p`
  background-color: #fcffe0;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  margin: 5px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  border-radius: 100px;
  padding: 10px;
  background-color: ${({ isClicked }) => (isClicked ? "red" : "white")};
  transition: transform 0.3s ease;
  animation: ${({ isClicked }) => (isClicked ? bounceAnimation : "none")} 0.5s;
`;

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-25px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const TrashIcon = styled(FontAwesomeIcon)`
  color: ${({ isClicked }) => (isClicked ? "white" : "#ff0000")};
`;
