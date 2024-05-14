import React from "react";
import styled from "styled-components";

function ReviewItem({ review }) {
  const { review_id, username, review_contents, review_date, hashtag, rating } =
    review;

  return (
    <ReviewItemContainer>
      <Username>{username}</Username>
      <Content>{review_contents}</Content>
      <Date>{review_date}</Date>
      <HashTagsContainer>
        <HashTag>#{hashtag}</HashTag>
      </HashTagsContainer>
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

const Content = styled.p`
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
