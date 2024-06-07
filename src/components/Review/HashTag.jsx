import { useState } from "react";
import styled from "styled-components";

function HashTag({ hashtags, setHashtags }) {
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
