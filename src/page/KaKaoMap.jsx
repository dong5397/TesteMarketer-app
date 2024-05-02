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
            center: new kakao.maps.LatLng(36.350411, 127.384548), // 대전 중심 좌표
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

        // 지도 이동 이벤트 리스너 등록
        kakao.maps.event.addListener(map, "dragend", function () {
          const center = map.getCenter();
          // 대전 중심 좌표보다 위도가 클 경우, 대전 중심 좌표로 되돌림
          if (center.getLat() > 36.350411) {
            map.setCenter(new kakao.maps.LatLng(36.350411, center.getLng()));
          }
        });
      });
    }
  }, [kakao, restaurants]);

  return (
    <Container>
      <MapContainer id="map" />
      {selectedRestaurant && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedRestaurant(null)} // 모달 닫기
          style={{
            overlay: {
              zIndex: 1000, // 모달이 가장 위에 표시되도록 zIndex 설정
            },
            content: {
              top: "50%", // 모달이 화면의 중앙에 위치하도록 top, left 조정
              left: "50%",
              transform: "translate(-50%, -50%)", // 모달을 화면의 중앙으로 이동
            },
          }}
        >
          <FoodIndex restaurant={selectedRestaurant} />
          <CloseButton onClick={() => setSelectedRestaurant(null)}>
            X
          </CloseButton>
        </Modal>
      )}
    </Container>
  );
};

export default KakaoMap;

const Container = styled.div`
  position: relative; /* 부모 요소를 relative로 설정하여 모달의 위치를 지도를 기준으로 설정 */
  width: 100%;
  height: calc(100vh - 60px); /* 해더의 높이를 제외한 나머지 영역 */
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
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
