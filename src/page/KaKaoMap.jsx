import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import FoodIndex from "../components/FoodIndex";

Modal.setAppElement("#root");

const KakaoMap = () => {
  const [kakao, setKakao] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.onload = () => setKakao(window.kakao);
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4d90cac7ec413eb4aec50eac7135504d&autoload=false";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        // data가 배열이 아닌 객체이고, 실제 식당 데이터가 data.restaurants에 담겨있다고 가정
        if (data && Array.isArray(data.data)) {
          setRestaurants(data.data);
        } else {
          // data가 배열이 아니라면 배열로 바꿔준다.
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
            center: new kakao.maps.LatLng(36.3273034, 127.4253552),
            level: 8,
          };

        const map = new kakao.maps.Map(mapContainer, mapOption);

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
          });

          marker.setMap(map);
        });
      });
    }
  }, [kakao, restaurants]);

  return (
    <div>
      <MapContainer id="map" />
      {selectedRestaurant && (
        <StyledModal
          isOpen={true}
          onRequestClose={() => setSelectedRestaurant(null)}
        >
          <FoodIndex restaurant={selectedRestaurant} />
        </StyledModal>
      )}
    </div>
  );
};

export default KakaoMap;

const MapContainer = styled.div`
  position: fixed;
  top: 200px;
  bottom: 0;
  left: 1200px;
  width: 60%;
  height: 70%;
  transform: translateX(-50%);
`;

const StyledModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 50%;
  background: white;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
