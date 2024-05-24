import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CommunityList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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

  const handleUpdate = (postId) => {
    // Navigate to MainEditPage
    navigate(`/EditPage/${postId}`);
  };

  const handlePostClick = (postId) => {
    navigate(`/Post/${postId}`); // Post/:postId로 이동
  };

  return (
    <Container>
      <PostList>
        {posts.map((post) => (
          <PostContainer
            key={post.post_id}
            onClick={() => handlePostClick(post.post_id)}
          >
            <PostContent>
              <RestaurantName>{post.title}</RestaurantName>
              <Date>날짜: {post.post_date}</Date>
            </PostContent>
            <ButtonContainer>
              <DeleteButton onClick={() => handleDelete(post.post_id)}>
                삭제
              </DeleteButton>
              <UpdateButton onClick={() => handleUpdate(post.post_id)}>
                수정
              </UpdateButton>
            </ButtonContainer>
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
  max-height: 500px;
  overflow-y: auto;
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
    cursor: pointer; // 포인터 모양으로 변경
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

const UpdateButton = styled.button`
  padding: 8px 12px;
  background-color: #6b66ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3b36ff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;
