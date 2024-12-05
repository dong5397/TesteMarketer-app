import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { reviewsState } from "../../state/reviewAtoms";
import RatingStars from "./RatingStars";
import { authState } from "../../state/userAtoms";

// bounceAnimation 애니메이션 정의
const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

function ReviewItem({ review }) {
  const {
    review_id,
    author_id,
    username,
    review_contents,
    review_date,
    hashtags,
    rating,
  } = review;
  const [reviews, setReviews] = useRecoilState(reviewsState);
  const auth = useRecoilValue(authState); // 현재 로그인된 사용자 정보 가져오기

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
    setTimeout(() => setIsClicked(false), 500);

    // Update the Recoil state to remove the review
    setReviews((prevReviews) =>
      prevReviews.filter((r) => r.review_id !== review_id)
    );
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
        {author_id === auth.userId && (
          <DeleteButton $isClicked={isClicked} onClick={reviewDeleteHandler}>
            <TrashIcon icon={faTrash} size="2xl" $isClicked={isClicked} />
          </DeleteButton>
        )}
      </ActionButtonsContainer>
    </ReviewItemContainer>
  );
}

export default ReviewItem;

// 스타일 컴포넌트 정의 생략...

const ReviewItemContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 20px;
  background-color: #f6f5f2;
  padding: 20px;

  @media screen and (max-width: 768px) {
    padding: 15px;
    margin-bottom: 15px;
  }
`;

const Username = styled.span`
  font-weight: bold;
  font-size: 34px;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

const Content = styled.div`
  font-size: 22px;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const Date = styled.span`
  color: gray;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const HashTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    margin-top: 5px;
  }
`;

const HashTag = styled.p`
  background-color: #fcffe0;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  margin: 5px;

  @media screen and (max-width: 768px) {
    padding: 3px 8px;
    margin: 3px;
    font-size: 14px;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    margin-top: 5px;
  }
`;

const DeleteButton = styled.button`
  border-radius: 100px;
  padding: 10px;
  background-color: ${({ $isClicked }) => ($isClicked ? "red" : "white")};
  transition: transform 0.3s ease;

  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`;

const TrashIcon = styled(FontAwesomeIcon)`
  color: #ff0000;
  ${({ $isClicked }) =>
    $isClicked &&
    css`
      color: white;
      animation: ${bounceAnimation} 0.5s;
    `}

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;
