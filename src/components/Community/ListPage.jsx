import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil"; // Recoil의 useRecoilValue import
import { authState } from "../../state/userAtoms"; // authState 파일 경로에 맞게 변경
import { useRecoilState } from "recoil";
import { postsState } from "../../state/communityAtom";

function CommunityList() {
  const [posts, setPosts] = useRecoilState(postsState);
  const navigate = useNavigate();
  const auth = useRecoilValue(authState); // 현재 로그인된 사용자 정보 가져오기

  useEffect(() => {
    fetch("https://maketerbackend.fly.dev/api/v1/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((result) => {
        const sortedPosts = result.data.sort((a, b) => b.post_id - a.post_id);
        setPosts(sortedPosts);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [setPosts]);

  const handleDelete = (postId, event) => {
    event.stopPropagation(); // 이벤트 전파 중단
    fetch(`https://maketerbackend.fly.dev/api/v1/post/${postId}`, {
      method: "DELETE",
      credentials: "include", // 세션 쿠키 포함 (세션 기반 인증 시 필요)
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

  const handleUpdate = (postId, event) => {
    event.stopPropagation(); // 이벤트 전파 중단
    navigate(`/EditPage/${postId}`);
  };

  const handlePostClick = (postId) => {
    navigate(`/Post/${postId}`);
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
              <Date>작성자: {post.username}</Date>
              <Date>날짜: {post.post_date.slice(0, 10)}</Date>
            </PostContent>
            <ButtonContainer>
              {post.author_id === auth.userId && (
                <DeleteButton
                  onClick={(event) => handleDelete(post.post_id, event)}
                >
                  삭제
                </DeleteButton>
              )}
              {post.author_id === auth.userId && (
                <UpdateButton
                  onClick={(event) => handleUpdate(post.post_id, event)}
                >
                  수정
                </UpdateButton>
              )}
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
  max-height: 300px;
  gap: 15px;
  overflow-y: auto;
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
    cursor: pointer;
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
  background-color: #2f4f4f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #357e7e;
  }
`;

const UpdateButton = styled.button`
  padding: 8px 12px;
  background-color: #74a7a7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #357e7e;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;
