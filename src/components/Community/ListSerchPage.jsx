import React from "react";
import styled from "styled-components";

const ListSerchPage = ({ posts }) => {
  return (
    <PostsContainer>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.post_id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <span>{new Date(post.post_date).toLocaleDateString()}</span>
          </Post>
        ))
      ) : (
        <p>검색된 게시물이 없습니다.</p>
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
