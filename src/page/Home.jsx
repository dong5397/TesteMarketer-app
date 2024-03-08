// Home.jsx
import React, { useState } from "react";
import FoodBox from "./FoodBox";

function Home() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <>
      <div>
        <FoodBox onRestaurantClick={handleRestaurantClick} />
      </div>
    </>
  );
}

export default Home;
