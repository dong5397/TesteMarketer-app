// surveyAtoms.jsx
import { atom, selector } from "recoil";
import { restaurantsState } from "./mapAtoms"; // restaurantsState 가져오기

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

    const userPreference = {
      Spicy: getLikertValue(foodPreferences.spicy),
      Sweet: getLikertValue(foodPreferences.sweet),
      Sour: getLikertValue(foodPreferences.sour),
      Salty: getLikertValue(foodPreferences.salty),
      food_type: foodPreferences.foodType,
    };

    const filtered = restaurants.filter((restaurant) => {
      const Spicydifference = Math.abs(restaurant.spicy - userPreference.Spicy);
      const Sweetdifference = Math.abs(restaurant.sweet - userPreference.Sweet);
      const Sourdifference = Math.abs(restaurant.sour - userPreference.Sour);
      const Saltydifference = Math.abs(restaurant.salty - userPreference.Salty);
      const foodTypeMatch =
        restaurant.food_type === userPreference.food_type ||
        userPreference.food_type === "Random";

      return (
        Spicydifference <= 1 &&
        Sweetdifference <= 1 &&
        Sourdifference <= 1 &&
        Saltydifference <= 1 &&
        foodTypeMatch
      );
    });

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
      menus: el.food_menu.menus.map((menu) => menu.name),
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
      return 0;
  }
};
