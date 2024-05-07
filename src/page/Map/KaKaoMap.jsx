import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import FoodIndex from "../../components/FoodIndex";

Modal.setAppElement("#root");

const KakaoMap = ({ onMapMove }) => {
  const [kakao, setKakao] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const mapRef = useRef(null); // useRef 추가

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

        const map = new kakao.maps.Map(mapContainer, mapOption);
        mapRef.current = map; // mapRef에 map 할당

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

        // 지도 이동 이벤트 리스너 등록
        kakao.maps.event.addListener(map, "dragend", function () {
          const center = map.getCenter();
          onMapMove &&
            onMapMove({
              latitude: center.getLat(),
              longitude: center.getLng(),
            });
        });
      });
    }
  }, [kakao, restaurants, onMapMove]);

  function panTo() {
    if (kakao && selectedRestaurant && mapRef.current) {
      // mapRef.current 추가
      mapRef.current.panTo(
        new kakao.maps.LatLng(
          selectedRestaurant.latitude,
          selectedRestaurant.longitude
        )
      );
    }
  }

  return (
    <Container>
      <MapContainer id="map" />
      {selectedRestaurant && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedRestaurant(null)}
          style={{
            overlay: {
              zIndex: 1000,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              top: "50%",
              left: "20%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              maxWidth: "600px",
              margin: "0 auto",
              background: "linear-gradient(#e7e78b, #f0f0c3)",
              borderRadius: "8px",
              padding: "20px",
              position: "relative",
              border: "5px solid black",
            },
          }}
        >
          <FoodIndex restaurant={selectedRestaurant} />
          <CloseButton onClick={() => setSelectedRestaurant(null)}>
            X
          </CloseButton>
        </Modal>
      )}
      <Button onClick={panTo}>지도 중심좌표 부드럽게 이동시키기</Button>
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Button = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #d1d195;
  color: black;
  border: none;
  font-weight: bold;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b6b654;
  }
`;
