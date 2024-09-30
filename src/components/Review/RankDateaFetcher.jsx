import { useRecoilState } from "recoil";
import { reviewsearchResultsState } from "../../state/reviewAtoms"; // 검색 결과 상태 불러오기
import { useEffect } from "react";

function RankDataFetcher({ children }) {
  const [searchResults, setSearchResults] = useRecoilState(
    reviewsearchResultsState
  );

  useEffect(() => {
    fetch("https://maketerbackend.fly.dev/api/v1/restaurants")
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
