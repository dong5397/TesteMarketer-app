import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const KakaoMap = ({ setMapMoveFunction }) => {
  const [kakao, setKakao] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.onload = () => {
      setKakao(window.kakao);
      console.log("Kakao script loaded:", window.kakao);
    };
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4d90cac7ec413eb4aec50eac7135504d&autoload=false";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (kakao) {
      fetch("https://makterbackend.fly.dev/api/v1/restaurants")
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data.data)) {
            setRestaurants(data.data);
          } else if (data && !Array.isArray(data)) {
            setRestaurants([data]);
          } else {
            console.error("Unexpected data format:", data);
          }
        })
        .catch((error) => {
          console.error("API 요청 중 오류 발생:", error);
        });
    }
  }, [kakao]);

  useEffect(() => {
    if (kakao && mapContainer.current && restaurants.length > 0) {
      kakao.maps.load(() => {
        const mapOption = {
          center: new kakao.maps.LatLng(36.350411, 127.384548),
          level: 8,
        };

        mapInstance.current = new kakao.maps.Map(
          mapContainer.current,
          mapOption
        );
        console.log("Map instance created:", mapInstance.current);

        restaurants.forEach((restaurant) => {
          const markerPosition = new kakao.maps.LatLng(
            parseFloat(restaurant.latitude),
            parseFloat(restaurant.longitude)
          );
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          kakao.maps.event.addListener(marker, "click", function () {
            const position = new kakao.maps.LatLng(
              parseFloat(restaurant.latitude),
              parseFloat(restaurant.longitude)
            );
            mapInstance.current.setCenter(position);
            mapInstance.current.setLevel(4);
            console.log("Map moved to (marker click):", position);
          });

          marker.setMap(mapInstance.current);
        });

        if (setMapMoveFunction) {
          setMapMoveFunction((latitude, longitude) => {
            const position = new kakao.maps.LatLng(latitude, longitude);
            console.log("KakaoMap: Setting map center to:", position);
            if (mapInstance.current) {
              mapInstance.current.setCenter(position);
              mapInstance.current.setLevel(4);
              console.log("KakaoMap: Map center set to:", position);
            } else {
              console.error("Map instance is not defined");
            }
          });
        }
      });
    }
  }, [kakao, restaurants, setMapMoveFunction]);

  return (
    <Container>
      <MapContainer id="map" ref={mapContainer} />
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
  border-radius: 30px;
  border: 5px solid black;
`;
