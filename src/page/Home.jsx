import React, { useState } from "react";
import FoodItem from "../components/FoodItem";

function Home() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <>
      <div>
        <FoodItem onRestaurantClick={handleRestaurantClick} />
      </div>
      {selectedRestaurant && (
        <div>
          <h2>{selectedRestaurant.name}</h2>
          <p>{selectedRestaurant.address}</p>
          <p>{selectedRestaurant.phone}</p>
          {/* 추가적인 식당 정보를 여기에 표시할 수 있습니다. */}
        </div>
      )}
    </>
  );
}

export default Home;
