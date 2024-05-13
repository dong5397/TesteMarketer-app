import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1000px; /* 수정 */
  max-height: 400px;
  margin-left: 40px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 16px;

  &:hover {
    background-color: #2980b9;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;

function WritePage() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [message, setMessage] = useState("");

  const onInsert = async () => {
    if (!title || !contents) {
      return alert("제목과 내용을 모두 입력해주세요.");
    }

    const now = new Date().toISOString(); // 현재 날짜와 시간 포맷
    const dataToSend = {
      post_title: title,
      post_content: contents,
      post_date: now,
    };
    console.log("Data to Send:", dataToSend); // 전송 데이터 확인을 위한 로그

    try {
      const response = await fetch(`http://localhost:3000/api/v1/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

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
          rows={6}
        />
        <Button type="submit">저장</Button>
        {message && <SuccessMessage>{message}</SuccessMessage>}
      </Form>
    </Container>
  );
}

export default WritePage;
