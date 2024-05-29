import { DeviceFrameset } from "react-device-frameset";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

function DetailPost() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    // 게시물 가져오기
    fetch(`https://makterbackend.fly.dev/api/v1/post/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });

    // 댓글 가져오기
    fetch(`https://makterbackend.fly.dev/api/v1/post/${postId}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        return response.json();
      })
      .then((data) => {
        setComments(data.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [postId]);

  const handleRouter = () => {
    navigate("../MainListPage");
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    fetch(`https://makterbackend.fly.dev/api/v1/post/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_text: newComment,
        comment_date: new Date().toISOString(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to post comment");
        }
        return response.json();
      })
      .then((data) => {
        setComments((prevComments) => [...prevComments, data.data]); // 반환된 데이터를 추가
        setNewComment("");
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  const handleDeleteComment = (post_id, commentid) => {
    if (!commentid) {
      console.error("commentIdToDelete가 유효하지 않습니다.");
      return;
    }

    fetch(
      `https://makterbackend.fly.dev/api/v1/post/${post_id}/comments/${commentid}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete comment");
        }
        return response.json();
      })
      .then((data) => {
        if (data.resultCode === "S-1") {
          // 댓글 삭제 성공 시, 클라이언트 상태 업데이트 로직 추가
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.commentid !== commentid)
          );
        } else {
          console.error("Failed to delete comment:", data.msg);
        }
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
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
                  <CommentSection>
                    <CommentForm onSubmit={handleCommentSubmit}>
                      <CommentInput
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요..."
                      />
                      <CommentButton type="submit">댓글 달기</CommentButton>
                    </CommentForm>
                    <CommentList>
                      {comments.map((comment) => (
                        <Comment key={comment.commentid}>
                          <CommentContent>
                            {comment.comment_text}
                          </CommentContent>
                          <CommentDate>
                            {new Date(comment.comment_date).toLocaleString()}
                          </CommentDate>
                          <DeleteButton
                            onClick={() =>
                              handleDeleteComment(postId, comment.commentid)
                            }
                          >
                            삭제
                          </DeleteButton>
                        </Comment>
                      ))}
                    </CommentList>
                  </CommentSection>
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

const CommentSection = styled.div`
  margin-top: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const CommentButton = styled.button`
  padding: 10px 20px;
  background-color: #6b66ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3b36ff;
  }
`;

const CommentList = styled.div`
  max-height: 300px; /* Adjust the height as needed */
  overflow-y: auto;
`;

const Comment = styled.div`
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CommentContent = styled.p`
  font-size: 16px;
  margin: 0;
`;

const CommentDate = styled.span`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
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
