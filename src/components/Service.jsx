import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DeviceFrameset } from "react-device-frameset";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  foodPreferencesState,
  filteredRestaurantsState,
} from "../state/surveyAtoms";
import { restaurantsState } from "../state/mapAtoms";

const Service = ({ restaurantsData }) => {
  const [restaurants, setRestaurants] = useRecoilState(restaurantsState);
  const [foodPreferences, setFoodPreferences] =
    useRecoilState(foodPreferencesState);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]); // 컴포넌트 내 상태로 관리
  const navigate = useNavigate();

  useEffect(() => {
    if (restaurantsData) {
      setRestaurants(restaurantsData);
    } else {
      fetch("https://maketerbackend.fly.dev/api/v1/restaurants")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched data: ", data.data);
          setRestaurants(data.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [restaurantsData, setRestaurants]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // 설문조사 값 매핑
    const preferenceMapping = {
      Verygood: 5,
      Good: 4,
      Normal: 3,
      Bad: 2,
      Verybad: 1,
    };

    // foodPreferences의 값을 숫자로 변환
    const numericPreferences = {
      spicy: preferenceMapping[foodPreferences.spicy] || 0,
      sweet: preferenceMapping[foodPreferences.sweet] || 0,
      salty: preferenceMapping[foodPreferences.salty] || 0,
      sour: preferenceMapping[foodPreferences.sour] || 0,
      foodType: foodPreferences.foodType,
    };

    console.log("Numeric foodPreferences:", numericPreferences);

    // 선호 데이터로 필터링된 식당 가져오기
    const filteredRestaurants = restaurants.filter((restaurant) => {
      const { spicy, sweet, sour, salty, foodType } = numericPreferences;

      return (
        spicy &&
        sweet &&
        sour &&
        salty &&
        Math.abs(restaurant.spicy - spicy) <= 2 && // 근사값 허용
        Math.abs(restaurant.sweet - sweet) <= 2 &&
        Math.abs(restaurant.sour - sour) <= 2 &&
        Math.abs(restaurant.salty - salty) <= 2 &&
        (!foodType || restaurant.food_type === foodType) // 음식 타입이 정확히 일치
      );
    });

    console.log("Filtered restaurants:", filteredRestaurants);

    if (filteredRestaurants.length === 0) {
      console.error("No matching restaurants found.");
      alert("선호 조건에 맞는 식당이 없습니다.");
      return;
    }

    setFilteredRestaurants(filteredRestaurants);

    const restaurantIds = filteredRestaurants.map(
      (restaurant) => restaurant.restaurants_id
    );

    console.log("Restaurant IDs to save:", restaurantIds);

    try {
      const response = await fetch(
        "https://maketerbackend.fly.dev/api/v1/restaurants/postlikes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // 세션 인증 포함
          body: JSON.stringify({ restaurantIds }),
        }
      );

      if (response.ok) {
        console.log("Favorite restaurants saved successfully");
      } else {
        const error = await response.json();
        console.error("Failed to save favorite restaurants:", error.msg);
      }
    } catch (error) {
      console.error("Error saving favorite restaurants:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <DeviceFrameset device="iPad Mini" height="100%">
        <Wrap>
          <LikertHeader>맛집 추천을 위한 설문조사</LikertHeader>
          <Progress>
            <ProgressBar
              progress={
                Object.values(foodPreferences).filter((v) => v !== "").length *
                20 // 빈 문자열이 아닌 값으로 필터링
              }
            />
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
              <BackButton type="button" onClick={handleGoBack}>
                뒤로
              </BackButton>
              <SubmitButton
                type="button"
                onClick={handleSubmit}
                disabled={
                  Object.values(foodPreferences).filter(Boolean).length < 5
                }
              >
                필터링하기
              </SubmitButton>
            </Buttons>
          </form>
        </Wrap>
      </DeviceFrameset>
    </Layout>
  );
};

export default Service;

// 스타일 컴포넌트는 동일

// 스타일 컴포넌트 정의
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  flex-direction: column;
`;

const Wrap = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 5px solid black;
  width: 100%;
  padding: 20px;
`;

const LikertHeader = styled.h1`
  padding-left: 4.25%;
  margin: 20px 0 0;
  text-align: center;
  font-family: "GowunDodum-Regular";
`;

const Statement = styled.label`
  display: block;
  font-size: 25px;
  font-weight: bold;
  padding: 30px 0 0 4.25%;
  margin-bottom: 25px;
  font-family: "GowunDodum-Regular";
`;

const LikertList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0 0 35px;
  display: block;
  border-bottom: 4px solid #000000;

  &:last-of-type {
    border-bottom: 0;
  }
`;

const LikertItem = styled.li`
  display: inline-block;
  width: 20%;
  text-align: center;
  vertical-align: top;
`;

const LikertInput = styled.input`
  display: block;
  position: relative;
  top: 0;
  left: 50%;
  margin-left: -6px;
`;

const LikertLabel = styled.label`
  width: 100%;
  font-family: "GowunDodum-Regular";
  font-size: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0;
  padding: 0 4.25%;
  text-align: center;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #e9e9e9;
  border: 2px solid #e9e9e9;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
    border-color: #ccc;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #67ab49;
  border: 2px solid #67ab49;
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #14892c;
    border-color: #14892c;
  }

  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;

const Progress = styled.div`
  width: 100%;
  background-color: #ddd;
  height: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 2px solid black;
`;

const ProgressBar = styled.div`
  width: ${({ progress }) => progress}%;
  background-color: #67ab49;
  height: 100%;
  border-radius: 10px;
  border-right: 2px solid black;
`;
