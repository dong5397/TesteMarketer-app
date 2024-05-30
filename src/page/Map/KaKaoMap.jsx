import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const KakaoMap = ({ setMapMoveFunction }) => {
  const [kakao, setKakao] = useState(null);
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
    if (kakao && mapContainer.current) {
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
