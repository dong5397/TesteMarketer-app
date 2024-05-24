// EditPage.jsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function EditPage() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [message, setMessage] = useState("");
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      fetch(`http://localhost:3000/api/v1/post/${postId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("게시물 데이터를 불러오는데 실패했습니다.");
          }
          return response.json();
        })
        .then((data) => {
          setTitle(data.title);
          setContents(data.content);
        })
        .catch((error) => {
          console.error(error);
          setMessage("게시물을 불러오는데 실패했습니다.");
        });
    } else {
      setTitle("");
      setContents("");
    }
  }, [postId]);

  const onUpdate = async () => {
    if (!title || !contents) {
      return alert("제목과 내용을 모두 입력해주세요.");
    }

    const dataToSend = {
      postId: postId, // postId를 데이터에 포함시켜서 서버로 보냅니다.
      post_title: title,
      post_content: contents,
    };

    try {
      console.log("게시물 수정 요청 중...");

      const response = await fetch(
        `http://localhost:3000/api/v1/post/${postId}`,
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
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder="제목을 입력해주세요."
          type="text"
          value={title}
          onChange={onTitleChange}
        />
        <TextArea
          placeholder="내용을 작성해주세요."
          value={contents}
          onChange={onContentsChange}
          rows={8}
        />
        <Button type="submit">수정</Button>
        {message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
}

export default EditPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #e1f5fe;
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

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #410707;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #357ab7;
    transform: translateY(-2px);
  }
`;

const Message = styled.p`
  margin-top: 15px;
  color: green;
  font-weight: bold;
  text-align: center;
`;
