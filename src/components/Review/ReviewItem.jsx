import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

function ReviewItem({ review }) {
  const { review_id, username, review_contents, review_date, hashtag, rating } =
    review;

  const [isClicked, setIsClicked] = useState(false);

  const reviewDeleteHandler = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      // 삭제 로직을 여기에 추가하세요
    }, 500);
  };

  return (
    <ReviewItemContainer>
      <Username>{username}</Username>
      <Content>{review_contents}</Content>
      <Date>{review_date}</Date>
      <HashTagsContainer>
        <HashTag>#{hashtag}</HashTag>
      </HashTagsContainer>
      <DeleteButton isClicked={isClicked} onClick={reviewDeleteHandler}>
        <FontAwesomeIcon
          icon={faTrash}
          size="2xl"
          style={{ color: "#ff0000" }}
        />{" "}
      </DeleteButton>
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

const DeleteButton = styled.button`
  border-radius: 100px;
  padding: 10px;
  background-color: white;
  transition: transform 0.3s ease;

  ${({ isClicked }) =>
    isClicked &&
    `
    animation: ${enlarge} 0.3s forwards;
  `}
`;
