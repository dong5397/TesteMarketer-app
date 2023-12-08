import React, { useState } from "react";
import FoodItem from "../components/FoodItem";
import MenuButton from "../components/MenuButton";
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
        </div>
      )}
    </>
  );
}

export default Home;
