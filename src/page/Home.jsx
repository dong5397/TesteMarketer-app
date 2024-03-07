import React from "react";
import FoodBox from "./FoodBox";

function Home() {
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
