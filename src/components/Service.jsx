import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DeviceFrameset } from "react-device-frameset";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  foodPreferencesState,
  filteredRestaurantsState,
} from "../state/surveyAtoms";

const Service = ({ restaurantsData }) => {
  const [progress, setProgress] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [foodPreferences, setFoodPreferences] =
    useRecoilState(foodPreferencesState);
  const setFilteredRestaurants = useSetRecoilState(filteredRestaurantsState);
  const navigate = useNavigate();

  useEffect(() => {
    if (restaurantsData) {
      setRestaurants(restaurantsData);
    } else {
      fetch("https://makterbackend.fly.dev/api/v1/restaurants")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setRestaurants(data.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [restaurantsData]);

  useEffect(() => {
    const totalQuestions = 5;
    const checkedItems = document.querySelectorAll(
      'input[type="radio"]:checked'
    );
    const newProgress = (checkedItems.length / totalQuestions) * 100;
    setProgress(newProgress);
  }, [foodPreferences]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFoodPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const userPreference = {
      Spicy: getLikertValue(foodPreferences.spicy),
      Sweet: getLikertValue(foodPreferences.sweet),
      Sour: getLikertValue(foodPreferences.sour),
      Salty: getLikertValue(foodPreferences.salty),
      food_type: foodPreferences.foodType,
    };

    filterRestaurants(userPreference);
  };

  const filterRestaurants = (userPreference) => {
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

    const formattedRestaurants = filtered.map((el) => ({
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

    setFilteredRestaurants(formattedRestaurants);

    navigate(`/servicefoods`);
  };

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

  return (
    <Layout>
      <Form>
        <DeviceFrameset
          device="iPad Mini"
          color="black"
          width="100%"
          height="auto"
        >
          <Wrap>
            <LikertHeader>맛집 추천을 위한 설문조사</LikertHeader>
            <Progress>
              <ProgressBar progress={progress} />
            </Progress>
            <form id="surveyForm" onChange={handleChange}>
              <Statement>어떤 종류의 음식을 가장 좋아하시나요?</Statement>
              <LikertList>
                <LikertItem>
                  <LikertInput type="radio" name="foodType" value="Korean" />
                  <LikertLabel>한식</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="foodType" value="Western" />
                  <LikertLabel>양식</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="foodType" value="Chinese" />
                  <LikertLabel>중식</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="foodType" value="Japanese" />
                  <LikertLabel>일식</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="foodType" value="Random" />
                  <LikertLabel>기타</LikertLabel>
                </LikertItem>
              </LikertList>
              <Statement>매운 음식을 얼마나 좋아하시나요?</Statement>
              <LikertList>
                <LikertItem>
                  <LikertInput type="radio" name="spicy" value="Verygood" />
                  <LikertLabel>아주 좋아합니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="spicy" value="Good" />
                  <LikertLabel>좋아합니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="spicy" value="Normal" />
                  <LikertLabel>보통입니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="spicy" value="Bad" />
                  <LikertLabel>별로 좋아하지 않습니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="spicy" value="Verybad" />
                  <LikertLabel>전혀 좋아하지 않습니다</LikertLabel>
                </LikertItem>
              </LikertList>
              <Statement>달달한 음식을 얼마나 좋아하시나요?</Statement>
              <LikertList>
                <LikertItem>
                  <LikertInput type="radio" name="sweet" value="Verygood" />
                  <LikertLabel>아주 좋아합니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="sweet" value="Good" />
                  <LikertLabel>좋아합니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="sweet" value="Normal" />
                  <LikertLabel>보통입니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="sweet" value="Bad" />
                  <LikertLabel>별로 좋아하지 않습니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="sweet" value="Verybad" />
                  <LikertLabel>전혀 좋아하지 않습니다</LikertLabel>
                </LikertItem>
              </LikertList>
              <Statement>짠 음식을 얼마나 좋아하시나요?</Statement>
              <LikertList>
                <LikertItem>
                  <LikertInput type="radio" name="salty" value="Verygood" />
                  <LikertLabel>아주 좋아합니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="salty" value="Good" />
                  <LikertLabel>좋아합니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="salty" value="Normal" />
                  <LikertLabel>보통입니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="salty" value="Bad" />
                  <LikertLabel>별로 좋아하지 않습니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="salty" value="Verybad" />
                  <LikertLabel>전혀 좋아하지 않습니다</LikertLabel>
                </LikertItem>
              </LikertList>
              <Statement>신 음식을 얼마나 좋아하시나요?</Statement>
              <LikertList>
                <LikertItem>
                  <LikertInput type="radio" name="sour" value="Verygood" />
                  <LikertLabel>아주 좋아합니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="sour" value="Good" />
                  <LikertLabel>좋아합니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="sour" value="Normal" />
                  <LikertLabel>보통입니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="sour" value="Bad" />
                  <LikertLabel>별로 좋아하지 않습니다</LikertLabel>
                </LikertItem>
                <LikertItem>
                  <LikertInput type="radio" name="sour" value="Verybad" />
                  <LikertLabel>전혀 좋아하지 않습니다</LikertLabel>
                </LikertItem>
              </LikertList>
              <Buttons>
                <ClearButton type="reset">Clear</ClearButton>
                <SubmitButton
                  type="button"
                  onClick={handleSubmit}
                  disabled={progress < 100}
                >
                  Submit
                </SubmitButton>
              </Buttons>
            </form>
          </Wrap>
        </DeviceFrameset>
      </Form>
    </Layout>
  );
};

export default Service;
