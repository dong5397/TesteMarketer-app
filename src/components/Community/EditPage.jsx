import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { DeviceFrameset } from "react-device-frameset";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  postTitleState,
  postContentState,
  messageState,
} from "../../state/communityAtom";

function EditPage() {
  const [title, setTitle] = useRecoilState(postTitleState);
  const [contents, setContents] = useRecoilState(postContentState);
  const [message, setMessage] = useRecoilState(messageState);
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleRouter = () => {
    navigate("../MainListPage");
  };

  useEffect(() => {
    if (postId) {
      fetch(`https://maketerbackend.fly.dev/api/v1/post/${postId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("게시물 데이터를 불러오는데 실패했습니다.");
          }
          return response.json();
        })
        .then((data) => {
          setTitle(data.title || ""); // 기본값으로 빈 문자열을 설정
          setContents(data.content || ""); // 기본값으로 빈 문자열을 설정
        })
        .catch((error) => {
          console.error(error);
          setMessage("게시물을 불러오는데 실패했습니다.");
        });
    } else {
      setTitle("");
      setContents("");
    }
  }, [postId, setTitle, setContents, setMessage]);

  const onUpdate = async () => {
    if (!title || !contents) {
      return alert("제목과 내용을 모두 입력해주세요.");
    }

    const dataToSend = {
      postId: postId,
      post_title: title,
      post_content: contents,
    };

    try {
      console.log("게시물 수정 요청 중...");

      const response = await fetch(
        `https://maketerbackend.fly.dev/api/v1/post/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      console.log("서버 응답:", response);

      if (!response.ok) {
        throw new Error("글 수정 요청이 실패했습니다.");
      }

      const data = await response.json();
      console.log("수정된 게시물 데이터:", data);

      if (data.resultCode === "S-1") {
        setMessage("글이 성공적으로 수정되었습니다.");
      } else {
        setMessage("글 수정 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error(error);
      setMessage("글 수정 중 오류가 발생했습니다.");
    }
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentsChange = (e) => {
    setContents(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdate();
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
                <Container2>
                  <Header>
                    <h1>Community</h1>
                    <Button onClick={handleRouter}>글목록</Button>
                  </Header>
                  <Container>
                    <Form onSubmit={onSubmit}>
                      <Input
                        placeholder="제목을 입력해주세요."
                        type="text"
                        value={title || ""} // undefined가 되지 않도록 보장
                        onChange={onTitleChange}
                      />
                      <TextArea
                        placeholder="내용을 작성해주세요."
                        value={contents || ""} // undefined가 되지 않도록 보장
                        onChange={onContentsChange}
                        rows={8}
                      />
                      <Button1 type="submit">수정</Button1>
                      {message && <Message>{message}</Message>}
                    </Form>
                  </Container>
                </Container2>
              </DeviceContent>
            </DivContainer>
          </StyledContainer>
        </DeviceFrameset>
      </WritePageWrapper>
    </MainContainer>
  );
}

export default EditPage;

// Styled Components
const MainContainer = styled.div`
  height: 1200px;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
`;
const Container2 = styled.div`
  display: flex;
  flex-direction: column;
`;
const DivContainer = styled.div`
  flex: 1;
  display: flex;
`;
const Form = styled.form`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const Button1 = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #74a7a7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #357e7e;
    transform: translateY(-2px);
  }
`;
const Button = styled.button`
  background-color: #74a7a7;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  align-self: center;
`;
const Message = styled.p`
  margin-top: 15px;
  color: green;
  font-weight: bold;
  text-align: center;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff; /* 연한 하늘색으로 설정 */
`;
const Header = styled.header`
  padding: 20px;
  background-color: #e9e5a9;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const WritePageWrapper = styled.div`
  max-width: 1000px;
  height: 1000px;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
`;
const DeviceContent = styled.div`
  flex: 1;
`;
