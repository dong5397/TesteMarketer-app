import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // // Fetch favorite restaurants (mock data or API call)
    // // Replace with your actual API endpoint
    // fetch('https://example.com/api/favorites') // Replace with real endpoint
    //   .then((response) => response.json())
    //   .then((data) => setFavorites(data))
    //   .catch((error) => console.error('Error fetching favorites:', error));
  }, []);

  return (
    <Container>
      <Title>즐겨찾기 목록</Title>
      {favorites.length > 0 ? (
        <RestaurantList>
          {favorites.map((restaurant) => (
            <RestaurantCard key={restaurant.id}>
              <RestaurantImage src={restaurant.image} alt={restaurant.name} />
              <RestaurantInfo>
                <RestaurantName>{restaurant.name}</RestaurantName>
                <RestaurantAddress>{restaurant.address}</RestaurantAddress>
                <LinkButton to={`/restaurant/${restaurant.id}`}>
                  자세히 보기
                </LinkButton>
              </RestaurantInfo>
            </RestaurantCard>
          ))}
        </RestaurantList>
      ) : (
        <NoFavoritesMessage>즐겨찾기한 식당이 없습니다.</NoFavoritesMessage>
      )}
    </Container>
  );
}

export default FavoritesPage;

// Styled Components
const Container = styled.div`
  padding: 40px;
  background-color: #faf3dd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

const RestaurantList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const RestaurantCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const RestaurantImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RestaurantInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const RestaurantName = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const RestaurantAddress = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 15px;
`;

const LinkButton = styled(Link)`
  display: inline-block;
  padding: 10px 15px;
  background-color: #e9a77c;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cb6040;
  }
`;

const NoFavoritesMessage = styled.p`
  font-size: 1.2rem;
  color: #777;
  margin-top: 50px;
`;
