// src/components/Review/HashTag.jsx

import React, { useState } from "react"; // `useState`를 추가로 import 합니다.
import { useRecoilState } from "recoil";
import { hashtagsState } from "../../state/reviewAtoms";
import styled from "styled-components";

function HashTag() {
  const [hashtags, setHashtags] = useRecoilState(hashtagsState);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      if (!hashtags.includes(inputValue.trim())) {
        setHashtags([...hashtags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleTagClick = (index) => {
    const updatedHashtags = [...hashtags];
    updatedHashtags.splice(index, 1);
    setHashtags(updatedHashtags);
  };

  return (
    <Wrapper>
      <Input
        type="text"
        id="hashtags"
        placeholder="해시태그를 작성하고 Enter키를 누르세요"
        autoComplete="off"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <TagContainer>
        {hashtags.map((tag, index) => (
          <Tag key={index} onClick={() => handleTagClick(index)}>
            #{tag}
          </Tag>
        ))}
      </TagContainer>
    </Wrapper>
  );
}

export default HashTag;

// 나머지 스타일 컴포넌트 유지

const Wrapper = styled.div`
  width: 100%;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;

const Tag = styled.p`
  background-color: #fcffe0;
  border-radius: 10px;
  padding: 5px 10px;
  cursor: pointer;
  margin: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;
