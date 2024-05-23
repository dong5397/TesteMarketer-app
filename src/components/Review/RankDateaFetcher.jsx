import React, { useEffect, useState } from "react";

// RankDataFetcher 컴포넌트는 데이터를 가져오고 상태를 관리
function RankDataFetcher({ children }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("https://makterbackendtest.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          const sortedData = [...data.data].sort((a, b) => b.rating - a.rating);

          setSearchResults(sortedData.slice(0, 10));
        } else {
          console.error("API 응답에 문제가 있습니다:", data);
        }
      });
  }, []);

  return children(searchResults);
}

export default RankDataFetcher;
