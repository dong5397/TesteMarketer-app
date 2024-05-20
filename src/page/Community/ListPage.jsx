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

  return (
    <Container>
      <PostList>
        {posts.map((post, index) => (
          <PostContainer key={index}>
            <RestaurantName>{post.title}</RestaurantName>
            <ContentBox>
              <Content>{post.content}</Content>
            </ContentBox>
            <Date>날짜: {post.post_date}</Date>
          </PostContainer>
        ))}
      </PostList>
    </Container>
  );
}

export default CommunityList;

const Container = styled.div`
  overflow-y: auto;
  height: auto;
  align-items: center;
`;

const PostList = styled.div`
  gap: 20px;
`;

const PostContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  width: 100%;
`;

const RestaurantName = styled.h2`
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ContentBox = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Content = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;
