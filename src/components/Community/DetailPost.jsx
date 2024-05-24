import { DeviceFrameset } from "react-device-frameset";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

function DetailPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/post/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched post data:", data); // 콘솔 로그 추가
        setPost(data.data); // 변경된 부분
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [postId]);

  const handleRouter = () => {
    navigate("../MainListPage");
  };

  return (
    <MainContainer>
      <WritePageWrapper>
        <DeviceFrameset
          device="iPad Mini"
          color="black"
          width="100%"
          height="80%"
        >
          <StyledContainer>
            <DivContainer>
              <DeviceContent>
                <Container>
                  <Header>
                    <h1>Community</h1>
                    <Button onClick={handleRouter}>글 목록</Button>
                  </Header>
                  {post ? (
                    <PostContainer>
                      <PostTitle>{post.title}</PostTitle>
                      <PostContent>{post.content}</PostContent>
                    </PostContainer>
                  ) : (
                    <p>Loading...</p>
                  )}
                </Container>
              </DeviceContent>
            </DivContainer>
          </StyledContainer>
        </DeviceFrameset>
      </WritePageWrapper>
    </MainContainer>
  );
}

export default DetailPost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  padding: 20px;
  background-color: #ffcc66;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #e1f5fe;
`;

const DivContainer = styled.div`
  flex: 1;
  display: flex;
`;

const MainContainer = styled.div`
  height: 1200px;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;

const DeviceContent = styled.div`
  flex: 1;
`;

const Button = styled.button`
  background-color: #ff6b6b;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  align-self: center;
`;
const WritePageWrapper = styled.div`
  max-width: 1000px;
  height: 1000px;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
`;

const PostContainer = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
`;

const PostTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 18px;
  line-height: 1.6;
`;
