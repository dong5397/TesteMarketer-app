import { atom } from "recoil";

// 페이지 네이션을 위한 현재 페이지 상태
export const currentPageState = atom({
  key: "currentPageState",
  default: 1, // 기본값은 첫 페이지
});

// 데이터 로딩 상태 관리
export const isLoadingState = atom({
  key: "isLoadingState",
  default: false, // 기본값은 로딩 중이 아님
});

// 상위 평점 식당 리스트 상태
export const topRatedRestaurantsState = atom({
  key: "topRatedRestaurantsState",
  default: [], // 상위 평점 식당들을 배열로 저장
});

// 선택된 카테고리 상태
export const selectedCategoryState = atom({
  key: "selectedCategoryState",
  default: null, // 기본값으로 선택된 카테고리 없음
});

// 검색어 상태
export const searchTermState = atom({
  key: "searchTermState",
  default: "", // 기본값은 빈 검색어
});

// 사용 가능한 카테고리 리스트 상태
export const categoriesState = atom({
  key: "categoriesState",
  default: [], // 기본값은 빈 카테고리 리스트
});

// 식당 정렬 필터 상태 (예: 평점, 리뷰 수 등)
export const filterState = atom({
  key: "filterState",
  default: "default", // 기본값은 'default' 필터 (특정 정렬 없음)
});

// 정렬된 식당 리스트 상태
export const sortedRestaurantsState = atom({
  key: "sortedRestaurantsState",
  default: [], // 정렬 기준에 따라 정렬된 식당 목록
});

// 선택된 식당에 대한 리뷰 리스트 상태
export const reviewsState = atom({
  key: "reviewsState",
  default: [], // 기본값은 빈 리뷰 리스트
});

// 현재 선택된 식당 정보 상태
export const currentRestaurantState = atom({
  key: "currentRestaurantState",
  default: null, // 기본값으로 선택된 식당 없음
});

// 리뷰 작성 또는 보기 전환 상태
export const isActiveState = atom({
  key: "isActiveState",
  default: true, // 기본값은 리뷰 작성 모드 활성화
});

// 리뷰 작성 시 사용되는 해시태그 상태
export const hashtagsState = atom({
  key: "hashtagsState",
  default: [], // 기본값은 빈 해시태그 리스트
});

// 리뷰 작성 시 사용되는 평점 상태
export const ratingState = atom({
  key: "ratingState",
  default: 0, // 기본 평점은 0
});

// 리뷰 작성자의 이름 상태
export const usernameState = atom({
  key: "usernameState",
  default: "", // 기본값은 빈 사용자 이름
});

// 리뷰 내용 상태
export const contentState = atom({
  key: "contentState",
  default: "", // 기본값은 빈 내용
});

// 카드 정보 (리뷰 수, 조회수, 평균 평점) 상태
export const cardInfoState = atom({
  key: "cardInfoState",
  default: {
    reviewCount: 0, // 초기 리뷰 수
    viewCount: 0, // 초기 조회 수
    rating: 0, // 초기 평균 평점
  },
});
