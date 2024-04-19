import React, { useState, useEffect } from "react";
import FoodBox from "./FoodBox";
import { toast } from "react-toastify";

function Home({ setAuth }) {
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
