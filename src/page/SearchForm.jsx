import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";

const SearchForm = () => {
  return (
    <SearchContainer>
      <SearchBar />
    </SearchContainer>
  );
};

export default SearchForm;

const SearchContainer = styled.div`
  position: absolute;
  top: 3%;
  left: 13%; // 'right'를 'left'로 바꿉니다.
`;
