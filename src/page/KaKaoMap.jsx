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
    <Container>
      <MapContainer id="map" />
      {selectedRestaurant && (
        <StyledModal
          isOpen={true}
          onRequ
          estClose={() => setSelectedRestaurant(null)}
        >
          <FoodIndex restaurant={selectedRestaurant} />
        </StyledModal>
      )}
    </Container>
  );
};

export default KakaoMap;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;

const MapContainer = styled.div`
  position: absolute;
  top: 55%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: 1300px;
  height: 600px;
  border: 1px solid rgba(0, 0, 0, 0.1); /* 테두리 추가 */
  border-radius: 10px; /* 테두리 둥글게 만듦 */
  background-image: linear-gradient(
    to bottom right,
    #ffffff,
    #f0f0f0
  ); /* 그라데이션 효과 추가 */
`;

const StyledModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;
