import React from "react";

function FoodDetail({ selectedRestaurant }) {
  return (
    <div>
      {selectedRestaurant && (
        <div>
          <p>{selectedRestaurant.road_address_name}</p>
          <p>{selectedRestaurant.phone}</p>
          <p>세부 정보: {selectedRestaurant.details}</p>
        </div>
      )}
    </div>
  );
}

export default FoodDetail;
