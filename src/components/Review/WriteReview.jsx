import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import {
  usernameState,
  contentState,
  hashtagsState,
  ratingState,
} from "../../state/reviewAtoms";
import HashTag from "./HashTag";
import RatingStars from "./RatingStars";

function WriteReview({ onSubmit }) {
  const [username, setUsername] = useRecoilState(usernameState);
  const [content, setContent] = useRecoilState(contentState);
  const [hashtags, setHashtags] = useRecoilState(hashtagsState);
  const [rating, setRating] = useRecoilState(ratingState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, content, hashtags, rating);
    setUsername("");
    setContent("");
    setHashtags([]);
    setRating(0);
  };

  return (
    <WriteReviewContainer>
      <BugerBox>
        <Title>리뷰 작성</Title>
      </BugerBox>
      <RatingContainer>
        <RatingLabel>별점</RatingLabel>
        <RatingStars rating={rating} onRate={setRating} />
      </RatingContainer>
      <Form onSubmit={handleSubmit}>
        <InputLabel>제목</InputLabel>
        <SmallInput
          type="text"
          placeholder="제목"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputLabel>후기</InputLabel>
        <Textarea
          placeholder="후기를 작성해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <InputLabel>해시태그</InputLabel>
        <HashTag hashtags={hashtags} setHashtags={setHashtags} />
        <SubmitButton type="submit">작성 완료</SubmitButton>
      </Form>
    </WriteReviewContainer>
  );
}

export default WriteReview;

// Styled Components
const WriteReviewContainer = styled.div`
  flex: 1;
  padding: 20px;

  @media screen and (max-width: 768px) {
    margin-top: 20px; /* Adds some space at the top for mobile */
  }
`;

const BugerBox = styled.div`
  background-color: #e9e5a9;
  border-radius: 40px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 28px; /* Smaller font size for mobile */
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const RatingLabel = styled.label`
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
  border-top: 5px solid #e9e5a9;
  border-bottom: 5px solid #e9e5a9;

  @media screen and (max-width: 768px) {
    font-size: 20px; /* Smaller font size for mobile */
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputLabel = styled.label`
  font-size: 32px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    font-size: 24px; /* Smaller font size for mobile */
  }
`;

const SmallInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    font-size: 16px; /* Smaller font size for mobile */
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    font-size: 16px; /* Smaller font size for mobile */
  }
`;

const SubmitButton = styled.button`
  background-color: #e9e5a9;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;

  &:hover {
    background-color: #e0d645;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px; /* Smaller font size for mobile */
    width: 180px; /* Adjust button width for mobile */
  }
`;
