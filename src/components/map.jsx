import React, { useEffect, useRef } from "react";

const map = () => {
  const container = useRef(null); // 지도를 담을 영역의 DOM 레퍼런스

  useEffect(() => {
    // kakao 지도 스크립트 초기화
    const script = document.createElement("script");
    script.onload = () => {
      kakao.maps.load(() => {
        const center = new kakao.maps.LatLng(33.450701, 126.570667); // 지도의 중심좌표
        const options = {
          center,
          level: 3, // 지도의 확대 레벨
        };
        // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
        const map = new kakao.maps.Map(container.current, options);
      });
    };
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_APP_KAKAO_API_KEY
    }`;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      id="map"
      style={{ width: "500px", height: "500px" }}
      ref={container}
    ></div>
  );
};

export default map;
