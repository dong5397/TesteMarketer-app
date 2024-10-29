import { atom } from "recoil"; // selector를 추가로 임포트합니다.

// 지도의 중심 위치 상태
export const mapCenterState = atom({
  key: "mapCenterState",
  default: { latitude: 36.350411, longitude: 127.384548 },
});

// 지도의 이동 기능을 위한 상태
export const mapMoveFunctionState = atom({
  key: "mapMoveFunctionState",
  default: null,
});

// 상세 모달이 열려 있는지 여부를 관리하는 상태
export const isDetailModalOpenState = atom({
  key: "isDetailModalOpenState",
  default: false,
});

// 모달이 열려 있는지 여부를 관리하는 상태
export const isModalOpenState = atom({
  key: "isModalOpenState",
  default: false,
});

// 지도의 줌 레벨을 관리하는 상태
export const mapZoomLevelState = atom({
  key: "mapZoomLevelState",
  default: 8,
});

// 레스토랑 목록을 관리하는 상태
export const restaurantsState = atom({
  key: "restaurantsState",
  default: [],
});

// 선택된 레스토랑을 관리하는 상태
export const selectedRestaurantState = atom({
  key: "selectedRestaurantState",
  default: null,
});

// 검색 창이 열려 있는지 여부를 관리하는 상태
export const isSearchOpenState = atom({
  key: "isSearchOpenState",
  default: false,
});

// 패널이 열려 있는지 여부를 관리하는 상태
export const isPanelOpenState = atom({
  key: "isPanelOpenState",
  default: false,
});

// 로딩 상태를 관리하는 상태
export const loadingState = atom({
  key: "loadingState",
  default: true,
});

// 오류 상태를 관리하는 상태
export const errorState = atom({
  key: "errorState",
  default: null,
});

// Kakao Map이 로드되었는지 여부를 관리하는 상태
export const kakaoLoadedState = atom({
  key: "kakaoLoadedState",
  default: false,
});

// 선택된 레스토랑 ID를 관리하는 상태
export const selectedRestaurantIdState = atom({
  key: "selectedRestaurantIdState",
  default: null,
});

// 지도 인스턴스를 관리하는 상태
export const mapInstanceState = atom({
  key: "mapInstanceState",
  default: null,
});

// 모달 위치를 관리하는 상태
export const modalPositionState = atom({
  key: "modalPositionState",
  default: { x: 0, y: 0 },
});

// 패널이 열려 있는지 여부를 관리하는 상태
export const isOpenState = atom({
  key: "isOpenState",
  default: false,
});

export const isFromMapClickState = atom({
  key: "isFromMapClickState",
  default: false,
});

// 버튼 클릭으로 선택된 레스토랑
export const selectedRestaurantFromButtonState = atom({
  key: "selectedRestaurantFromButtonState",
  default: null,
});

// 지도 마커 클릭으로 선택된 레스토랑
export const selectedRestaurantFromMapState = atom({
  key: "selectedRestaurantFromMapState",
  default: null,
});

// FoodBox에서 선택된 레스토랑 상태
export const selectedRestaurantFromBoxState = atom({
  key: "selectedRestaurantFromBoxState",
  default: null,
});
export const startLocationState = atom({
  key: "startLocationState",
  default: { x: "", y: "" },
});

export const endLocationState = atom({
  key: "endLocationState",
  default: { x: "", y: "" },
});

export const directionsState = atom({
  key: "directionsState",
  default: null,
});

export const restaurantInfoState = atom({
  key: "restaurantInfoState",
  default: {
    id: null,
    name: "",
    image: "",
    rating: 0,
    opening_hours: "",
    phone: "",
    address: "",
    category: "",
  },
});
