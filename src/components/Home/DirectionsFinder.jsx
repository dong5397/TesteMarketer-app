import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  startLocationState,
  endLocationState,
  directionsState,
  loadingState,
} from "../../state/mapAtoms"; // 해당 상태들을 import

const DirectionsFinder = () => {
  const [startLocation, setStartLocation] = useRecoilState(startLocationState);
  const [endLocation, setEndLocation] = useRecoilState(endLocationState);
  const [directions, setDirections] = useRecoilState(directionsState);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      // .env에서 불러온 JavaScript 키 사용
      kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
      console.log("Kakao initialized:", kakao.isInitialized());
    }
  }, []);

  // 길찾기 API 호출 함수
  const findDirections = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.kakaomobility.com/v1/directions",
        {
          params: {
            startX: startLocation.x,
            startY: startLocation.y,
            endX: endLocation.x,
            endY: endLocation.y,
            priority: "RECOMMENDED", // 경로 우선순위 설정
          },
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`, // .env에서 불러온 REST API 키 사용
          },
        }
      );
      setDirections(response.data);
    } catch (error) {
      console.error("길찾기 API 오류:", error);
      setDirections(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Kakao 길찾기</h2>

      <div>
        <h3>출발지</h3>
        <input
          type="text"
          placeholder="출발지 X 좌표"
          value={startLocation.x}
          onChange={(e) =>
            setStartLocation({ ...startLocation, x: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="출발지 Y 좌표"
          value={startLocation.y}
          onChange={(e) =>
            setStartLocation({ ...startLocation, y: e.target.value })
          }
        />
      </div>

      <div>
        <h3>목적지</h3>
        <input
          type="text"
          placeholder="목적지 X 좌표"
          value={endLocation.x}
          onChange={(e) =>
            setEndLocation({ ...endLocation, x: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="목적지 Y 좌표"
          value={endLocation.y}
          onChange={(e) =>
            setEndLocation({ ...endLocation, y: e.target.value })
          }
        />
      </div>

      <button onClick={findDirections} disabled={loading}>
        {loading ? "길찾기 중..." : "길찾기"}
      </button>

      {directions && (
        <div>
          <h3>길찾기 결과</h3>
          <pre>{JSON.stringify(directions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DirectionsFinder;
