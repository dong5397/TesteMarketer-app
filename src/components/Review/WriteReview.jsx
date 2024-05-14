import React, { useState } from "react";
import styled from "styled-components";
import HashTag from "./HashTag";
import RatingStars from "./RatingStars";

function WriteReview({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(username, content, date, hashtags, rating);
    setUsername("");
    setContent("");
    setDate("");
    setHashtags([]);
    setRating(0);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <WriteReviewContainer>
      <Title>리뷰 작성</Title>
      <RatingContainer>
        <RatingLabel>별점</RatingLabel>
        <RatingStars rating={rating} onRate={setRating} />
      </RatingContainer>
      <Form onSubmit={handleSubmit}>
        <InputLabel>이름</InputLabel>
        <SmallInput
          type="text"
          placeholder="이름"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputLabel>리뷰 내용</InputLabel>
        <Textarea
          placeholder="리뷰를 작성해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <InputLabel>날짜</InputLabel>
        <Input
          type="date"
          placeholder="날짜 입력"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          onKeyDown={handleInputKeyDown}
        />
        <InputLabel>해시태그</InputLabel>
        <HashTag hashtags={hashtags} setHashtags={setHashtags} />
        <SubmitButton type="submit">작성 완료</SubmitButton>
      </Form>
    </WriteReviewContainer>
  );
}

export default WriteReview;

const WriteReviewContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputLabel = styled.label`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;
`;

const SmallInput = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;
`;

const SubmitButton = styled.button`
  background-color: #f1c40f;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 200px;

  &:hover {
    background-color: #e67e22;
  }
`;
