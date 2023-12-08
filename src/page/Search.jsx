import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";

const SearchContainer = styled.div`
  position: absolute;
  top: 200px;
  left: 15px; // 'right'를 'left'로 바꿉니다.
`;

const Search = () => {
  return (
    <SearchContainer>
      <SearchBar />
    </SearchContainer>
  );
};

export default Search;
