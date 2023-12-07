import React, { useEffect, useState } from "react";
import axios from "axios";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await axios.get(
          "https://dapi.kakao.com/v2/local/search/keyword.json",
          {
            headers: {
              Authorization: "KakaoAK 92be558050bf327c8f008ccd01021afd",
            },
            params: {
              query: searchTerm + " 대전",
            },
          }
        );

        setRestaurants(response.data.documents);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm) {
      getRestaurants();
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 음식점만 필터링하여 반환하는 함수
  const filterRestaurants = () => {
    return restaurants.filter((restaurant) => {
      // 여기에 음식점 필터링 조건을 작성합니다.
      // 예시: 카테고리가 "음식점"인 경우에만 필터링
      return restaurant.category_group_code === "FD6";
    });
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="음식점 검색"
      />

      {restaurants.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        filterRestaurants().map((restaurant) => (
          <div key={restaurant.id}>
            <h2>{restaurant.place_name}</h2>
            <p>{restaurant.road_address_name}</p>
            <p>{restaurant.phone}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RestaurantList;
