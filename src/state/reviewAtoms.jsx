// 파일: src/state/reviewAtoms.jsx

import { atom } from "recoil";

// 기존 리뷰 관련 상태들
export const reviewsState = atom({
  key: "reviewsState",
  default: [],
});

export const usernameState = atom({
  key: "usernameState",
  default: "",
});

export const contentState = atom({
  key: "contentState",
  default: "",
});

export const hashtagsState = atom({
  key: "hashtagsState",
  default: [],
});

export const ratingState = atom({
  key: "ratingState",
  default: 0,
});

// 검색 결과 상태
export const reviewsearchResultsState = atom({
  key: "reviewsearchResultsState",
  default: [],
});

// 카드 정보 상태
export const cardInfoState = atom({
  key: "cardInfoState",
  default: {
    id: null,
    name: "",
    opening_hours: "",
    rating: 0,
    image: "",
    phone: "",
    address: "",
    category: "",
    reviewCount: 0,
    viewCount: 0,
  },
});

// 현재 페이지 상태
export const currentPageState = atom({
  key: "currentPageState",
  default: 1,
});

// 필터 상태
export const filterState = atom({
  key: "filterState",
  default: "default", // 기본 필터
});

// 리뷰 식당 상태
export const reviewRestaurantsState = atom({
  key: "reviewRestaurantsState",
  default: [],
});

// isActive 상태
export const isActiveState = atom({
  key: "isActiveState",
  default: true,
});

export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: null, // Default value
});

// 모든 레스토랑 데이터를 저장하는 상태
export const restaurantDataState = atom({
  key: "restaurantDataState",
  default: [], // 기본값은 빈 배열
});

// 새로운 상태 추가 예시

// 리뷰 작성 중 임시 상태를 저장하는 상태 (리뷰 텍스트 임시 저장 등)
export const draftReviewState = atom({
  key: "draftReviewState",
  default: {
    content: "",
    rating: 0,
    hashtags: [],
  },
});

// 특정 레스토랑의 상세 리뷰를 로드하는 상태
export const selectedRestaurantReviewsState = atom({
  key: "selectedRestaurantReviewsState",
  default: [],
});

// 리뷰 작성 성공 여부를 확인하는 상태
export const reviewSubmissionStatusState = atom({
  key: "reviewSubmissionStatusState",
  default: null, // 'success', 'error' 등의 상태를 저장할 수 있음
});
