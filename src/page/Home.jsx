import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";
import FoodForm from "./FoodForm";

function Home({ setAuth }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <>
      <div>
        <FoodForm onRestaurantClick={handleRestaurantClick} />
      </div>
    </>
  );
}

export default Home;
