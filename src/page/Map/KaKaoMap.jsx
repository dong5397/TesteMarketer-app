import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FoodDetail from "../../components/FoodDetail";

const KakaoMap = () => {
  const [kakao, setKakao] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.onload = () => setKakao(window.kakao);
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4d90cac7ec413eb4aec50eac7135504d&autoload=false";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    fetch("https://makterbackendtest.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setRestaurants(data.data);
        } else {
          if (data && !Array.isArray(data)) {
            setRestaurants([data]);
          } else {
            console.error("Unexpected data format: ", data);
          }
        }
      });
  }, []);

  useEffect(() => {
    if (kakao) {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map"),
          mapOption = {
            center: new kakao.maps.LatLng(36.350411, 127.384548),
            level: 8,
          };

        const mapInstance = new kakao.maps.Map(mapContainer, mapOption);
        setMap(mapInstance);

        restaurants.forEach((restaurant) => {
          const markerPosition = new kakao.maps.LatLng(
            restaurant.latitude,
            restaurant.longitude
          );
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          kakao.maps.event.addListener(marker, "click", function () {
            setSelectedRestaurant(restaurant);
            handleMapMove(markerPosition);
          });

          marker.setMap(mapInstance);
        });
      });
    }
  }, [kakao, restaurants]);

  const handleMapMove = (position) => {
    map.panTo(position);
  };

  return (
    <Container>
      <MapContainer id="map" />
      <FoodDetail
        selectedRestaurant={selectedRestaurant}
        onMapMove={handleMapMove}
      />
    </Container>
  );
};

export default KakaoMap;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding: 3%;
  padding-left: 10%;
  padding-right: 10%;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 10%;
  border-radius: 30px;
  border: 5px solid black;
`;
