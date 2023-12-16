import FoodBox from "../components/FoodBox";

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
