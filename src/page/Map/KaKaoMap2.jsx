import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import markerImageSrc from "../../../public/images/start4.png";
import locate from "../../../public/images/locate.png";
import food from "../../../public/images/food.png";
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
      // 백엔드의 엔드포인트로 요청을 보냅니다.
      const response = await axios.get(
        "https://maketerbackend.fly.dev/api/tashu"
      );

      console.log("API 응답 데이터:", response.data);

      const data = response.data.data;

      // data와 data.results가 정의되어 있는지 확인
      if (data && data.results && Array.isArray(data.results)) {
        data.results.forEach((station) => {
          const { x_pos, y_pos, name, parking_count } = station;

          // 좌표를 숫자로 변환
          const x = parseFloat(x_pos);
          const y = parseFloat(y_pos);

          // 좌표가 유효한지 확인
          if (isNaN(x) || isNaN(y)) {
            console.error("유효하지 않은 좌표입니다:", station);
            return;
          }

          // Kakao Maps에서 LatLng 생성 (위도, 경도 순서)
          const position = new kakao.maps.LatLng(x, y);

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
      } else {
        console.error(
          "데이터 구조가 예상과 다릅니다. data 또는 data.results가 존재하지 않습니다."
        );
      }
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

      <UpdateLocationButton
        src={locate}
        alt="Update Location"
        onClick={updateCurrentLocation}
      />
      <FoodLocationButton
        src={food}
        alt="food"
        onClick={goToFoodLocation}
      ></FoodLocationButton>
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

const UpdateLocationButton = styled.img`
  position: absolute;
  top: 18%;
  right: 12%;
  width: 50px; /* 이미지 크기 */
  height: 50px;
  border-radius: 50%; /* 동그란 버튼 모양 */
  cursor: pointer;
  z-index: 999;
  @media screen and (max-width: 481px) {
    top: 32%;
    right: 12%;
    width: 25px;
    height: 25px;
  }

  &:hover {
    transform: scale(1.1); /* 호버 시 확대 효과 */

    transition: transform 0.3s;
  }
`;

const FoodLocationButton = styled.img`
  position: absolute;
  top: 25%;
  right: 12%;
  width: 50px; /* 이미지 크기 */
  height: 50px;

  cursor: pointer;
  z-index: 999;
  @media screen and (max-width: 481px) {
    top: 37%;
    right: 12%;
    width: 25px;
    height: 25px;
  }

  &:hover {
    transform: scale(1.1); /* 호버 시 확대 효과 */

    transition: transform 0.3s;
  }
`;
