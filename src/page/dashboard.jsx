import React, { useState, useEffect } from "react";
import FoodBox from "./FoodBox";

function Dashboard({ setAuth }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [parseRes, setParseRes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          headers: { token: localStorage.token },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setParseRes(data);
        console.log(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []); // 빈 배열을 의존성 배열로 전달하여 한 번만 호출되도록 설정
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

export default Dashboard;
