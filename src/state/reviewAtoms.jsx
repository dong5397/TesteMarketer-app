// 파일: src/state/reviewAtoms.jsx

import { atom } from "recoil";

// 리뷰 관련 상태들
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
    reviewCount: 0,
    viewCount: 0,
    rating: 0,
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
