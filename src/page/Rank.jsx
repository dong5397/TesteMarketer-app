import React, { useState, useEffect } from "react";
import testData from "../data/TestData";
import styled from "styled-components";

function Rank() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(testData);

  useEffect(() => {
    const sortedTestData = [...testData].sort((a, b) => b.rating - a.rating);
    setSearchResults(sortedTestData.slice(0, 10));
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const results = testData.filter(
      (restaurant) =>
        restaurant.name.includes(searchTerm) || // 식당 이름으로 검색
        restaurant.category.includes(searchTerm) // 카테고리로 검색
    );

    const sortedResults = [...results].sort((a, b) => b.rating - a.rating);
    setSearchResults(sortedResults.slice(0, 10));
    console.log("검색 결과:", sortedResults.slice(0, 10));
  };

  return (
    <div>
      {/* 검색 결과를 출력하는 로직 추가 */}
      {searchResults.map((result) => (
        <Box key={result.id}>
          <h2>#{result.category}</h2>
          <p>식당: {result.name}</p>
          <p>주소: {result.address}</p>
          <p>오픈 시간: {result.openingHours}</p>
          <pre>
            별점: {result.rating} 리뷰 수: {result.reviewCount}
          </pre>
          <img src={result.Image} alt={result.name} />
        </Box>
      ))}
    </div>
  );
}

export default Rank;

const Box = styled.div`
  width: 400px;
  border: 1px solid black;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  // 추가된 부분: 리뷰 텍스트에 적용된 스타일
  p,
  pre,
  h2 {
    font-size: 20px;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
  }
  img {
    /* Box 내부의 모든 img 태그에 적용됩니다 */
    max-width: 90%; /* 이미지의 최대 너비를 Box의 너비로 제한합니다 */
    height: auto; /* 너비에 맞춰 자동으로 높이를 조정합니다 */
  }
`;
