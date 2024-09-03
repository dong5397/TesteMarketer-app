import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  postTitleState,
  postContentState,
  postHashtagsState,
} from "../../state/communityAtom";
import HashTag from "../Review/HashTag";

function WritePage() {
  const [title, setTitle] = useRecoilState(postTitleState);
  const [content, setContent] = useRecoilState(postContentState);
  const [hashtags, setHashtags] = useRecoilState(postHashtagsState);

  const handleSubmit = () => {
    // 게시물 저장 로직 추가
  };

  return (
    <FormContainer>
      <Input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <HashTag hashtags={hashtags} setHashtags={setHashtags} />
      <Button onClick={handleSubmit}>저장</Button>
    </FormContainer>
  );
}

export default WritePage;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 150px;
`;

const Button = styled.button`
  background-color: #74a7a7;
  color: white;
  padding: 10px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #357e7e;
  }
`;
