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
              query: searchTerm,
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
        restaurants.map((restaurant) => (
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
