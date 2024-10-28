import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import markerImageSrc from "../../../public/images/start4.png";
const KakaoMap2 = ({ setMapMoveFunction }) => {
  const [kakao, setKakao] = useState(null);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const navigate = useNavigate();
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
    if (kakao && mapContainer.current) {
      kakao.maps.load(() => {
        const mapOption = {
          center: new kakao.maps.LatLng(36.350411, 127.384548),
          level: 4,
        };

        mapInstance.current = new kakao.maps.Map(
          mapContainer.current,
          mapOption
        );
        console.log("Map instance created:", mapInstance.current);

        loadTashuData(); // Load Tashu station data and add markers

        if (setMapMoveFunction) {
          setMapMoveFunction((latitude, longitude) => {
            if (isNaN(latitude) || isNaN(longitude)) {
              console.error(
                "KakaoMap: Invalid coordinates received:",
                latitude,
                longitude
              );
              return;
            }
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
  }, [kakao, setMapMoveFunction]);

  const loadTashuData = async () => {
    try {
      const response = await axios.get("/tashu/v1/openapi/station", {
        headers: {
          "api-token": "8n4rwq2fa62l2m90",
        },
      });
      const { results } = response.data;

      results.forEach((station) => {
        const { x_pos, y_pos, name, parking_count } = station;
        const position = new kakao.maps.LatLng(x_pos, y_pos);

        const marker = new kakao.maps.Marker({
          position,
          map: mapInstance.current,
        });

        const infoWindowContent = `
  <div style="padding: 10px; background-color: white; border: 2px solid #041c11; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);">
    <strong style="font-size: 14px; color: #333;">${name}</strong><br>
    <span style="font-size: 12px; color: #777;">대여 가능 자전거 수: ${parking_count}</span>
  </div>`;

        const infoWindow = new kakao.maps.InfoWindow({
          content: infoWindowContent,
        });

        kakao.maps.event.addListener(marker, "mouseover", () =>
          infoWindow.open(mapInstance.current, marker)
        );
        kakao.maps.event.addListener(marker, "mouseout", () =>
          infoWindow.close()
        );
      });
    } catch (error) {
      console.error("Failed to fetch Tashu station data:", error);
    }
  };

  // 현재 위치 갱신 기능
  const updateCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
          const newPosition = new kakao.maps.LatLng(latitude, longitude);

          if (mapInstance.current) {
            mapInstance.current.setCenter(newPosition);
            addCurrentLocationMarker(latitude, longitude); // Add marker at current location
          }
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // 현재 위치에 마커 추가
  const addCurrentLocationMarker = (latitude, longitude) => {
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);
    const markerSize = new kakao.maps.Size(30, 30);
    const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerSize);

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(mapInstance.current);
  };
  const goToFoodLocation = () => {
    navigate("/food"); // Update with the correct path for the bicycle location page
  };

  return (
    <Container>
      <H1>Maketer</H1>
      <H2>대전 전체의 맛집을 찾아줍니다</H2>
      <MapContainer id="map" ref={mapContainer} />
      <UpdateLocationButton onClick={updateCurrentLocation}>
        위치 갱신
      </UpdateLocationButton>
      <FoodLocationButton onClick={goToFoodLocation}>
        식당 위치 보기
      </FoodLocationButton>
    </Container>
  );
};

export default KakaoMap2;
const H1 = styled.h1`
  display: none;

  @media screen and (max-width: 481px) {
    display: block;
    font-size: 40px;
    line-height: 1.2;
    margin-bottom: 0.3rem;
    font-family: "GowunDodum-Regular";
    text-align: center;
  }
`;

const H2 = styled.h2`
  display: none;

  @media screen and (max-width: 481px) {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 20px;
    font-family: "GowunDodum-Regular";
  }
`;

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

const UpdateLocationButton = styled.button`
  position: absolute;
  top: 100px;
  right: 10px;
  padding: 10px 10px;
  background-color: #041c11;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 999;
`;

const FoodLocationButton = styled.button`
  position: absolute;
  top: 140px;
  right: 10px;
  padding: 10px 10px;
  background-color: #041c11;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 999;
`;
