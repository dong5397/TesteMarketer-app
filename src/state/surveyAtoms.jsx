import { atom, selector } from "recoil";
import { restaurantsState } from "./mapAtoms";

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

// 음식 선호도 상태를 한 번에 관리하는 객체
export const foodPreferencesState = atom({
  key: "foodPreferencesState",
  default: {
    foodType: "",
    spicy: "",
    sweet: "",
    salty: "",
    sour: "",
  },
});

// 필터링된 레스토랑 리스트 상태
export const filteredRestaurantsState = selector({
  key: "filteredRestaurantsState",
  get: ({ get }) => {
    const restaurants = get(restaurantsState); // 가져온 restaurantsState 사용
    const foodPreferences = get(foodPreferencesState);

    // 사용자 선호도를 Likert 척도로 변환
    const userPreference = {
      Spicy: getLikertValue(foodPreferences.spicy),
      Sweet: getLikertValue(foodPreferences.sweet),
      Sour: getLikertValue(foodPreferences.sour),
      Salty: getLikertValue(foodPreferences.salty),
      food_type: foodPreferences.foodType,
    };

    // 필터링 로직
    const filtered = restaurants.filter((restaurant) => {
      // 레스토랑 속성에 기본값 할당 (기본값 3)
      const spicyValue = restaurant.spicy !== undefined ? restaurant.spicy : 3;
      const sweetValue = restaurant.sweet !== undefined ? restaurant.sweet : 3;
      const sourValue = restaurant.sour !== undefined ? restaurant.sour : 3;
      const saltyValue = restaurant.salty !== undefined ? restaurant.salty : 3;

      // 필터링 조건 비교
      const Spicydifference = Math.abs(spicyValue - userPreference.Spicy);
      const Sweetdifference = Math.abs(sweetValue - userPreference.Sweet);
      const Sourdifference = Math.abs(sourValue - userPreference.Sour);
      const Saltydifference = Math.abs(saltyValue - userPreference.Salty);

      // 음식 종류 일치 여부 확인
      const foodTypeMatch =
        restaurant.food_type === userPreference.food_type ||
        userPreference.food_type === "" || // 빈 값 허용
        userPreference.food_type === "Random"; // "Random" 선택 허용

      // 디버깅용 콘솔 로그 추가
      console.log("Checking restaurant:", restaurant.restaurants_name);
      console.log("Differences:", {
        Spicydifference,
        Sweetdifference,
        Sourdifference,
        Saltydifference,
        foodTypeMatch,
      });

      return (
        Spicydifference <= 2 && // 조건 완화
        Sweetdifference <= 2 &&
        Sourdifference <= 2 &&
        Saltydifference <= 2 &&
        foodTypeMatch
      );
    });

    // 필터링 결과 콘솔 로그 추가
    console.log("Filtered Restaurants: ", filtered);
    return filtered.map((el) => ({
      id: el.restaurants_id,
      name: el.restaurants_name,
      phone: el.phone,
      opening_hours: el.opening_hours,
      rating: el.rating,
      category: el.category,
      address: el.address,
      image: el.image,
      menus: el.food_menu?.menus?.map((menu) => menu.name) || [], // 메뉴가 없는 경우 빈 배열 반환
    }));
  },
});

// Likert 척도 값을 가져오는 도우미 함수
const getLikertValue = (value) => {
  switch (value) {
    case "Verygood":
      return 5;
    case "Good":
      return 4;
    case "Normal":
      return 3;
    case "Bad":
      return 2;
    case "Verybad":
      return 1;
    default:
      return 3; // 사용자 입력이 없을 때 기본값 3 설정
  }
};
