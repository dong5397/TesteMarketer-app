import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedRestaurantFromMapState,
  isFromMapClickState,
  mapMoveFunctionState,
} from "../../state/mapAtoms";
import FoodIndex from "../../components/Home/FoodIndex"; // 모달에 사용할 컴포넌트
import mark from "../../../public/images/mark.png";
import markerImageSrc from "../../../public/images/start4.png";
import locate from "../../../public/images/locate.png";
import bicycle from "../../../public/images/bicycle.png";
const KakaoMap = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
    selectedRestaurantFromMapState
  );
  const [, setIsFromMapClick] = useRecoilState(isFromMapClickState);
  const setMapMoveFunction = useSetRecoilState(mapMoveFunctionState);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const kakaoLoaded = useRef(false);
  const modalRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  // Kakao 지도 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4d90cac7ec413eb4aec50eac7135504d&autoload=false&libraries=services";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        kakaoLoaded.current = true;
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

  // 지도 초기화
  const initializeMap = () => {
    if (!mapContainer.current || !kakaoLoaded.current) {
      console.error(
        "Map container is not available or Kakao API is not loaded."
      );
      return;
    }

    const mapOption = {
      center: new window.kakao.maps.LatLng(36.328468, 127.424753),
      level: 8,
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
    mapInstance.current.setLevel(8);
  };

  const addCurrentLocationMarker = (latitude, longitude) => {
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const markerSize = new window.kakao.maps.Size(30, 30);
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageSrc,
      markerSize
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(mapInstance.current);
  };

  const updateCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ latitude, longitude });
          moveMapToLocation(latitude, longitude);
          addCurrentLocationMarker(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
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
        mapInstance.current.setLevel(8);

        setSelectedRestaurant(restaurant); // 식당 선택
        setIsFromMapClick(true);

        // 길찾기 경로 표시
        findDrivingRouteToRestaurant(restaurant);
      });

      marker.setMap(mapInstance.current);
    });
  };

  // Navigate to the bicycle location page
  const goToBicycleLocation = () => {
    navigate("/bicycle"); // Update with the correct path for the bicycle location page
  };

  const loadRestaurantsAndAddMarkers = () => {
    fetch("https://maketerbackend.fly.dev/api/v1/restaurants")
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
  const findDrivingRouteToRestaurant = (restaurant) => {
    if (!restaurant) {
      console.error("No restaurant selected for route.");
      return;
    }

    const { latitude: destLat, longitude: destLng } = restaurant;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: currentLat, longitude: currentLng } =
            position.coords;

          const directionsUrl = `https://apis-navi.kakaomobility.com/v1/directions?origin=${currentLng},${currentLat}&destination=${destLng},${destLat}&waypoints=&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`;

          fetch(directionsUrl, {
            method: "GET",
            headers: {
              Authorization: "KakaoAK 92be558050bf327c8f008ccd01021afd", // REST API 키 설정
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Received route data:", data);
              if (data && data.routes && data.routes.length > 0) {
                const path = [];
                data.routes[0].sections.forEach((section) => {
                  section.roads.forEach((road) => {
                    for (let i = 0; i < road.vertexes.length; i += 2) {
                      const lng = parseFloat(road.vertexes[i]);
                      const lat = parseFloat(road.vertexes[i + 1]);

                      if (!isNaN(lat) && !isNaN(lng)) {
                        path.push(new window.kakao.maps.LatLng(lat, lng));
                      }
                    }
                  });
                });

                if (path.length > 0) {
                  if (window.polyline) {
                    window.polyline.setMap(null); // 기존 경로 제거
                  }
                  if (window.outline) {
                    window.outline.setMap(null); // 외곽선 제거
                  }

                  window.polyline = new window.kakao.maps.Polyline({
                    map: mapInstance.current,
                    path: path,
                    strokeWeight: 6,
                    strokeColor: "#FF6347",
                    strokeOpacity: 0.9,
                    strokeStyle: "solid",
                    zIndex: 2,
                  });

                  window.outline = new window.kakao.maps.Polyline({
                    map: mapInstance.current,
                    path: path,
                    strokeWeight: 10,
                    strokeColor: "#000000",
                    strokeOpacity: 0.5,
                    strokeStyle: "solid",
                    zIndex: 1,
                  });

                  window.polyline.setMap(mapInstance.current);
                } else {
                  console.warn("경로를 그릴 좌표가 없습니다.");
                }
              } else {
                console.error("경로 데이터를 찾을 수 없습니다.", data);
              }
            })
            .catch((error) => {
              console.error("경로 요청 중 오류 발생:", error);
            });
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  // 모달 외부 클릭 시 닫기
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSelectedRestaurant(null);
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
      <MapContainer ref={mapContainer} />
      <UpdateLocationButton
        src={locate}
        alt="Update Location"
        onClick={updateCurrentLocation}
      />
      <BicycleLocationButton
        src={bicycle}
        alt="bicycle"
        onClick={goToBicycleLocation}
      ></BicycleLocationButton>
      {selectedRestaurant && (
        <FoodIndexContainer ref={modalRef}>
          <FoodIndex restaurant={selectedRestaurant} />
        </FoodIndexContainer>
      )}
    </Container>
  );
};

export default KakaoMap;

// styled-components
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
`;

const UpdateLocationButton = styled.img`
  position: absolute;
  top: 8%;
  right: 12%;
  width: 30px; /* 이미지 크기 */
  height: 30px;
  border-radius: 50%; /* 동그란 버튼 모양 */
  cursor: pointer;
  z-index: 999;
  @media screen and (max-width: 481px) {
    top: 25%;
    right: 12%;
    width: 25px;
    height: 25px;
  }

  &:hover {
    transform: scale(1.1); /* 호버 시 확대 효과 */

    transition: transform 0.3s;
  }
`;

const BicycleLocationButton = styled.img`
  position: absolute;
  top: 15%;
  right: 12%;
  width: 30px; /* 이미지 크기 */
  height: 30px;

  cursor: pointer;
  z-index: 999;
  @media screen and (max-width: 481px) {
    top: 30%;
    right: 12%;
    width: 25px;
    height: 25px;
  }

  &:hover {
    transform: scale(1.1); /* 호버 시 확대 효과 */

    transition: transform 0.3s;
  }
`;
