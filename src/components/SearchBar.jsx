import React, { useState } from "react";
import testData from "../data/TestData"; // TestData 불러오기

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState(testData); // 초기값 설정
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 검색어가 입력될 때마다 필터링을 적용합니다.
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.includes(searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="음식점 검색"
      />

      {filteredRestaurants.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
            <p>{restaurant.phone}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RestaurantList;
