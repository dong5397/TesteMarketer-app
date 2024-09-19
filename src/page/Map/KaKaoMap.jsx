import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedRestaurantFromMapState,
  isFromMapClickState,
  mapMoveFunctionState,
} from "../../state/mapAtoms";
import mark from "../../../public/images/mark.png";

const KakaoMap = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
    selectedRestaurantFromMapState
  );
  const [, setIsFromMapClick] = useRecoilState(isFromMapClickState);
  const setMapMoveFunction = useSetRecoilState(mapMoveFunctionState);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const kakaoLoaded = useRef(false); // Kakao API 로드 상태를 관리하는 변수

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4d90cac7ec413eb4aec50eac7135504d&autoload=false&libraries=services";
    script.async = true;

    // Kakao 지도 로드
    script.onload = () => {
      window.kakao.maps.load(() => {
        kakaoLoaded.current = true; // Kakao API 로드 완료 상태 설정
        initializeMap();
      });
    };

    script.onerror = () => {
      console.error("Kakao script failed to load.");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    if (!mapContainer.current || !kakaoLoaded.current) {
      console.error(
        "Map container is not available or Kakao API is not loaded."
      );
      return;
    }

    const mapOption = {
      center: new window.kakao.maps.LatLng(36.350411, 127.384548), // 대전 좌표
      level: 7,
    };

    mapInstance.current = new window.kakao.maps.Map(
      mapContainer.current,
      mapOption
    );

    setMapMoveFunction(() => moveMapToLocation);
    loadRestaurantsAndAddMarkers();
  };

  const moveMapToLocation = (latitude, longitude) => {
    const position = new window.kakao.maps.LatLng(latitude, longitude);
    mapInstance.current.setCenter(position);
    mapInstance.current.setLevel(4); // Zoom in to the selected restaurant
  };

  const loadRestaurantsAndAddMarkers = () => {
    fetch("https://makterbackend.fly.dev/api/v1/restaurants")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          addMarkersToMap(data.data);
        } else if (data && !Array.isArray(data.data)) {
          addMarkersToMap([data.data]);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
      });
  };

  const addMarkersToMap = (restaurants) => {
    if (!mapInstance.current) return;

    const isMobile = window.innerWidth <= 481;
    const markerSize = isMobile
      ? new window.kakao.maps.Size(24, 24)
      : new window.kakao.maps.Size(40, 40);

    const markerImageSrc = mark;
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageSrc,
      markerSize
    );

    restaurants.forEach((restaurant) => {
      const markerPosition = new window.kakao.maps.LatLng(
        parseFloat(restaurant.latitude),
        parseFloat(restaurant.longitude)
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px;font-size:12px;">${restaurant.restaurants_name}</div>`,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(mapInstance.current, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        const position = new window.kakao.maps.LatLng(
          parseFloat(restaurant.latitude),
          parseFloat(restaurant.longitude)
        );
        mapInstance.current.setCenter(position);
        mapInstance.current.setLevel(4);

        setSelectedRestaurant(restaurant);
        setIsFromMapClick(true);

        // 현재 위치에서 식당까지 길찾기 경로 표시 시작
        findRouteToRestaurant(restaurant);
      });

      marker.setMap(mapInstance.current);
    });
  };

  const drawRouteOnMap = (startCoords, endCoords) => {
    const linePath = [startCoords, endCoords];

    // 지도에 경로를 그릴 Polyline 생성
    const polyline = new window.kakao.maps.Polyline({
      path: linePath, // 경로 좌표
      strokeWeight: 5, // 선 두께
      strokeColor: "#FF0000", // 선 색깔
      strokeOpacity: 0.8, // 선 투명도
      strokeStyle: "solid", // 선 스타일
    });

    // 지도에 경로 표시
    polyline.setMap(mapInstance.current);
  };

  // 경로를 찾고 지도에 표시하는 함수
  const findRouteToRestaurant = (restaurant) => {
    if (!restaurant) {
      console.error("No restaurant selected for route.");
      return;
    }

    const { latitude, longitude } = restaurant;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: currentLat, longitude: currentLng } =
            position.coords;

          const startCoords = new window.kakao.maps.LatLng(
            currentLat,
            currentLng
          );
          const endCoords = new window.kakao.maps.LatLng(latitude, longitude);

          // 지도에 경로 그리기
          drawRouteOnMap(startCoords, endCoords);
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Container>
      <MapContainer ref={mapContainer} />
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
  position: relative;
`;
const H1 = styled.h1`
  display: none; /* 기본적으로 숨김 처리 */

  @media screen and (max-width: 481px) {
    display: block; /* 모바일에서만 표시 */
    font-size: 40px;
    line-height: 1.2;
    margin-bottom: 0.3rem;
    font-family: "GowunDodum-Regular";
    text-align: center;
  }
`;

const H2 = styled.h2`
  display: none; /* 기본적으로 숨김 처리 */

  @media screen and (max-width: 481px) {
    display: block; /* 모바일에서만 표시 */
    text-align: center;
    font-weight: 300;
    font-size: 20px;
    font-family: "GowunDodum-Regular";
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  border: 5px solid black;
`;

const FoodIndexContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 100;
  width: 300px;
  height: auto;
  overflow-y: auto;
  @media screen and (max-width: 481px) {
  }
`;
