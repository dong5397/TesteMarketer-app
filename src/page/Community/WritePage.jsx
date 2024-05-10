import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

function CommunityWrite() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [userId, setUserId] = useState(null); // 사용자 ID 상태 추가

  useEffect(() => {
    // 사용자 ID를 가져오는 함수
    const fetchUserId = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
        }
        const data = await response.json();
        setUserId(data.user_id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserId();
  }, []);

  const onInsert = async () => {
    if (!title || !contents) {
      return alert("제목과 리뷰를 모두 입력해주세요.");
    }
    const now = new Date().toISOString();
    try {
      const response = await fetch(`http://localhost:3000/api/v1/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_title: title,
          post_content: contents,
          post_date: now,
          user_id: userId,
        }),
      });
      if (!response.ok) {
        throw new Error("리뷰 작성 요청이 실패했습니다.");
      }
      const data = await response.json();
      console.log(data); // 서버에서 반환한 데이터 확인
    } catch (error) {
      console.error(error);
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
    <div>
      <form onSubmit={onSubmit} className="mb-4">
        <input
          placeholder="제목을 입력해주세요."
          type="text"
          value={title}
          onChange={onTitleChange}
          className="mb-2 p-1 border"
        />
        <input
          placeholder="리뷰를 작성해주세요."
          type="text"
          value={contents}
          onChange={onContentsChange}
          className="mb-2 p-1 border"
        />
        <Button type="submit">저장</Button>
      </form>
    </div>
  );
}

export default CommunityWrite;
