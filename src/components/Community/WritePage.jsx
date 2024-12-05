import React, { useState } from "react";
import styled from "styled-components";

function WritePage() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [message, setMessage] = useState("");

  const onInsert = async () => {
    if (!title || !contents) {
      return alert("제목과 내용을 모두 입력해주세요.");
    }

    const now = new Date().toISOString();
    const dataToSend = {
      post_title: title,
      post_content: contents,
      post_date: now,
    };

    try {
      const response = await fetch(
        `https://maketerbackend.fly.dev/api/v1/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
          credentials: "include", // 세션 쿠키 포함 (세션 기반 인증 시 필요)
        }
      );

      if (!response.ok) {
        throw new Error("글 작성 요청이 실패했습니다.");
      }

      const data = await response.json();
      if (data.resultCode === "S-1") {
        setMessage("글이 성공적으로 작성되었습니다.");
      } else {
        setMessage("글 작성 중 오류가 발생했습니다.");
      }
      console.log("Server Response:", data); // 서버 응답 확인을 위한 로그
    } catch (error) {
      console.error(error);
      setMessage("글 작성 중 오류가 발생했습니다.");
    }

    setTitle("");
    setContents("");
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentsChange = (e) => {
    setContents(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onInsert();
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
        <Button type="submit">저장</Button>
        {message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
}

export default WritePage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
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

const Message = styled.p`
  margin-top: 15px;
  color: green;
  font-weight: bold;
  text-align: center;
`;
