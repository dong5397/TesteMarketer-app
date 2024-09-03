// src/state/surveyAtoms.js
import { atom } from "recoil";

// 설문 진행률 상태
export const surveyProgressState = atom({
  key: "surveyProgressState",
  default: 0, // 설문 진행률 기본값 (0%)
});

// 음식 종류 상태
export const foodTypeState = atom({
  key: "foodTypeState",
  default: "", // 음식 종류 기본값
});

// 매운 음식 선호도 상태
export const spicyPreferenceState = atom({
  key: "spicyPreferenceState",
  default: "", // 매운 음식 선호도 기본값
});

// 달달한 음식 선호도 상태
export const sweetPreferenceState = atom({
  key: "sweetPreferenceState",
  default: "", // 달달한 음식 선호도 기본값
});

// 짠 음식 선호도 상태
export const saltyPreferenceState = atom({
  key: "saltyPreferenceState",
  default: "", // 짠 음식 선호도 기본값
});

// 신 음식 선호도 상태
export const sourPreferenceState = atom({
  key: "sourPreferenceState",
  default: "", // 신 음식 선호도 기본값
});

// 필터링된 레스토랑 리스트 상태
export const filteredRestaurantsState = atom({
  key: "filteredRestaurantsState",
  default: [], // 필터링된 레스토랑 리스트 기본값
});

// 설문 완료 여부 상태
export const isSurveyCompleteState = atom({
  key: "isSurveyCompleteState",
  default: false, // 설문 완료 여부 기본값 (false)
});
export const foodPreferencesState = atom({
  key: "foodPreferencesState",
  default: {
    foodType: "",
    spicy: 0,
    sweet: 0,
    salty: 0,
    sour: 0,
  },
});
