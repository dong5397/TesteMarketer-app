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
        const result = response.json();
        const sortedPosts = result.data.sort((a, b) => a.post_id - b.post_id);
        setPosts(sortedPosts);
      })

      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <PostContainer key={index}>
          <h2>식당 이름: {post.title}</h2>
          <ContentBox>
            <p>내용: {post.content}</p>
          </ContentBox>
          <p>날짜: {post.post_date}</p>
        </PostContainer>
      ))}
    </div>
  );
}

export default CommunityList;

const PostContainer = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const ContentBox = styled.div`
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
