import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { topRatedRestaurantsState } from "../state/reviewAtoms";

function RankDataFetcher({ children }) {
  const setTopRatedRestaurants = useSetRecoilState(topRatedRestaurantsState);

  useEffect(() => {
    fetch("https://makterbackend.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          const sortedData = [...data.data].sort((a, b) => b.rating - a.rating);
          setTopRatedRestaurants(sortedData.slice(0, 10)); // 상태 업데이트
        } else {
          console.error("API 응답에 문제가 있습니다:", data);
        }
      })
      .catch((error) => console.error("데이터 가져오기 중 오류 발생:", error));
  }, [setTopRatedRestaurants]);

  return children;
}

export default RankDataFetcher;
