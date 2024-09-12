import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedRestaurantFromMapState,
  isFromMapClickState,
  mapMoveFunctionState,
} from "../../state/mapAtoms";
import FoodIndex from "../../components/FoodIndex";
import mark from "../../../public/images/mark.png";

const KakaoMap = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
    selectedRestaurantFromMapState
  );
  const [, setIsFromMapClick] = useRecoilState(isFromMapClickState);
  const setMapMoveFunction = useSetRecoilState(mapMoveFunctionState);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const modalRef = useRef(null);
  const kakaoLoaded = useRef(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4d90cac7ec413eb4aec50eac7135504d&autoload=false";
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        kakaoLoaded.current = true;
        initializeMap();
      });
    };
    script.onerror = () => {
      console.error("Kakao script failed to load");
    };
    document.head.appendChild(script);
  }, []);

  const initializeMap = () => {
    if (!mapContainer.current || !kakaoLoaded.current) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(36.350411, 127.384548),
      level: 7,
    };

    mapInstance.current = new window.kakao.maps.Map(
      mapContainer.current,
      mapOption
    );

    setMapMoveFunction(() => moveMapToLocation); // Expose the map move function

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

    const isMobile = window.innerWidth <= 481; // 모바일 화면 감지
    const markerSize = isMobile
      ? new window.kakao.maps.Size(24, 24) // 모바일에서 작은 마커 크기
      : new window.kakao.maps.Size(40, 40); // 데스크톱 기본 크기

    const markerImageSrc = mark; // 음식 마커 이미지 URL
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageSrc,
      markerSize
    ); // 마커 이미지 설정

    restaurants.forEach((restaurant) => {
      const markerPosition = new window.kakao.maps.LatLng(
        parseFloat(restaurant.latitude),
        parseFloat(restaurant.longitude)
      );

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커에 이미지 적용
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
      });

      marker.setMap(mapInstance.current);
    });
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSelectedRestaurant(null); // 모달을 닫음
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <H1>Maketer</H1>
      <H2>대전 전체의 맛집을 찾아줍니다</H2>
      <MapContainer id="map" ref={mapContainer} />
      {selectedRestaurant && (
        <FoodIndexContainer ref={modalRef}>
          <FoodIndex />
        </FoodIndexContainer>
      )}
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
