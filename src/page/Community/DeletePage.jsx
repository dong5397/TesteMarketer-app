import React from "react";
import styled from "styled-components";

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;

const ReviewContainer = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Content = styled.p`
  margin-top: 0.5rem;
`;

function CommunityReview({ post, onDelete }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/post/${post.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("게시물 삭제 요청이 실패했습니다.");
      }
      const data = await response.json();
      console.log(data); // 서버에서 반환한 데이터 확인
      onDelete(post.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ReviewContainer>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
    </ReviewContainer>
  );
}

export default CommunityReview;
