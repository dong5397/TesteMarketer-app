import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const KakaoMap = ({ setMapMoveFunction }) => {
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4d90cac7ec413eb4aec50eac7135504d&autoload=false";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setKakaoLoaded(true);
        console.log("Kakao script loaded:", window.kakao);
      });
    };
    script.onerror = () => {
      console.error("Kakao script failed to load");
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (kakaoLoaded) {
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
  }, [kakaoLoaded]);

  useEffect(() => {
    if (kakaoLoaded && mapContainer.current && restaurants.length > 0) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(36.350411, 127.384548),
        level: 8,
      };

      mapInstance.current = new window.kakao.maps.Map(
        mapContainer.current,
        mapOption
      );
      console.log("Map instance created:", mapInstance.current);

      restaurants.forEach((restaurant) => {
        const markerPosition = new window.kakao.maps.LatLng(
          parseFloat(restaurant.latitude),
          parseFloat(restaurant.longitude)
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        window.kakao.maps.event.addListener(marker, "click", function () {
          const position = new window.kakao.maps.LatLng(
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
          const position = new window.kakao.maps.LatLng(latitude, longitude);
          console.log("Setting map center to:", position);
          if (mapInstance.current) {
            mapInstance.current.setCenter(position);
            mapInstance.current.setLevel(4);
            console.log("Map center set to:", position);
          } else {
            console.error("Map instance is not defined");
          }
        });
      }
    }
  }, [kakaoLoaded, restaurants, setMapMoveFunction]);

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
