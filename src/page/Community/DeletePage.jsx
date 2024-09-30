import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { postsState } from "../state/postAtoms"; // 경로는 적절히 수정해주세요

const DeleteButton = styled.button`
  background-color: #74a7a7;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #357e7e;
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

function CommunityReview({ post }) {
  const [posts, setPosts] = useRecoilState(postsState);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://maketerbackend.fly.dev/api/v1/post/${post.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("게시물 삭제 요청이 실패했습니다.");
      }

      // 서버 응답이 성공하면 상태를 업데이트하여 삭제된 게시물을 반영합니다.
      setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
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
