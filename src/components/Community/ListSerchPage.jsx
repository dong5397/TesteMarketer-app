import React from "react";
import styled from "styled-components";

const ListSerchPage = ({ posts }) => {
  return (
    <PostsContainer>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.post_id}>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
            <PostDate>{new Date(post.post_date).toLocaleDateString()}</PostDate>
          </Post>
        ))
      ) : (
        <NoPostsMessage>검색된 게시물이 없습니다.</NoPostsMessage>
      )}
    </PostsContainer>
  );
};

export default ListSerchPage;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Post = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
`;

const PostContent = styled.p`
  font-size: 1rem;
  color: #555;
`;

const PostDate = styled.span`
  display: block;
  margin-top: 10px;
  font-size: 0.875rem;
  color: #999;
`;

const NoPostsMessage = styled.p`
  font-size: 1.25rem;
  color: #666;
  text-align: center;
`;
