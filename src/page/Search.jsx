import React from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";

const SearchContainer = styled.div`
  position: absolute;
  top: 200px;
  right: 8%;
`;

const Search = () => {
  return (
    <SearchContainer>
      <SearchBar />
    </SearchContainer>
  );
};

export default Search;
