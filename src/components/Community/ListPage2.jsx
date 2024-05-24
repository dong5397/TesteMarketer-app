import React, { useState, useEffect } from "react";
import styled from "styled-components";

function CommunityList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((result) => {
        const sortedPosts = result.data.sort((a, b) => a.post_id - b.post_id);
        setPosts(sortedPosts);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleDelete = (postId) => {
    fetch(`http://localhost:3000/api/v1/post/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete post");
        }
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.post_id !== postId)
        );
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <Container>
      <PostList>
        {posts.map((post) => (
          <PostContainer key={post.post_id}>
            <PostContent>
              <RestaurantName>{post.title}</RestaurantName>
              <Date>날짜: {post.post_date}</Date>
            </PostContent>
            <DeleteButton onClick={() => handleDelete(post.post_id)}>
              삭제
            </DeleteButton>
          </PostContainer>
        ))}
      </PostList>
    </Container>
  );
}

export default CommunityList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  max-height: 100px; /* 고정된 높이 설정 */
  overflow-y: auto; /* 수직 스크롤바 추가 */
  gap: 15px;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RestaurantName = styled.h2`
  font-size: 18px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ff3b3b;
  }
`;
