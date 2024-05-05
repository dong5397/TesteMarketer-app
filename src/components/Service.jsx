import React, { useState, useEffect } from "react";
import styled from "styled-components";
import RestaurantCard from "./RestaurantCard";

const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  font-family: Arial, san-serif;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid black;
  width: 1000px;
`;

const LikertHeader = styled.h1`
  padding-left: 4.25%;
  margin: 20px 0 0;
  text-align: center;
`;

const Statement = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  padding: 30px 0 0 4.25%;
  margin-bottom: 10px;
`;

const LikertList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0 0 35px;
  display: block;
  border-bottom: 2px solid #efefef;

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
`;

const Buttons = styled.div`
  margin: 30px 0;
  padding: 0 4.25%;
  text-align: center;
`;

const ClearButton = styled.button`
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
`;

const Progress = styled.div`
  width: 100%;
  background-color: #ddd;
  height: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  width: ${({ progress }) => progress}%;
  background-color: #67ab49;
  height: 100%;
  border-radius: 10px;
`;

const Container = styled.div`
  display: block;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-left: calc(10% + 20px); /* 여백 추가 */
  overflow-y: auto; /* 스크롤바 추가 */
  max-height: calc(90vh - 40px); /* 최대 높이 지정 */
`;

const Service = () => {
  const [progress, setProgress] = useState(0);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [foodType, setFoodType] = useState("");
  const [spicy, setSpicy] = useState("");
  const [sweet, setSweet] = useState("");
  const [salty, setSalty] = useState("");
  const [sour, setSour] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/restaurants")
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
  }, []);

  const handleChange = () => {
    const foodTypeInput = document.querySelector(
      'input[name="food_type"]:checked'
    );
    const spicyInput = document.querySelector('input[name="spicy"]:checked');
    const sweetInput = document.querySelector('input[name="sweet"]:checked');
    const saltyInput = document.querySelector('input[name="salty"]:checked');
    const sourInput = document.querySelector('input[name="sour"]:checked');

    if (foodTypeInput && spicyInput && sweetInput && saltyInput && sourInput) {
      const totalQuestions = 5;
      const checkedItems = document.querySelectorAll(
        'input[type="radio"]:checked'
      );
      const newProgress = (checkedItems.length / totalQuestions) * 100;
      setProgress(newProgress);

      setFoodType(foodTypeInput.value);
      setSpicy(spicyInput.value);
      setSweet(sweetInput.value);
      setSalty(saltyInput.value);
      setSour(sourInput.value);
    }
  };

  const handleSubmit = () => {
    const answers = {
      food_type: getLikertValue(foodType),
      spicy: getLikertValue(spicy),
      sweet: getLikertValue(sweet),
      salty: getLikertValue(salty),
      sour: getLikertValue(sour),
    };

    const userPreference = {
      맵기: answers.spicy,
      단맛: answers.sweet,
      신맛: answers.sour,
      짠맛: answers.salty,
      food_type: answers.food_type,
    };

    filterRestaurants(userPreference);
  };

  const filterRestaurants = (userPreference) => {
    const filtered = restaurants.filter((restaurant) => {
      const 맵기차이 = Math.abs(restaurant.맵기 - userPreference.맵기);
      const 단맛차이 = Math.abs(restaurant.단맛 - userPreference.단맛);
      const 신맛차이 = Math.abs(restaurant.신맛 - userPreference.신맛);
      const 짠맛차이 = Math.abs(restaurant.짠맛 - userPreference.짠맛);
      const foodTypeMatch =
        restaurant.food_type === userPreference.food_type ||
        userPreference.food_type === "기타"; // 기타 선택 시에만 해당

      if (userPreference.food_type === "기타") {
        return (
          맵기차이 <= 1 &&
          단맛차이 <= 1 &&
          신맛차이 <= 1 &&
          짠맛차이 <= 1 &&
          foodTypeMatch
        );
      } else {
        return 맵기차이 <= 1 && 단맛차이 <= 1 && 신맛차이 <= 1 && 짠맛차이 <= 1;
      }
    });
    setFilteredRestaurants(filtered);
  };

  const getLikertValue = (value) => {
    switch (value) {
      case "아주 좋아합니다":
        return 5;
      case "좋아합니다":
        return 4;
      case "보통입니다":
        return 3;
      case "별로 좋아하지 않습니다":
        return 2;
      case "전혀 좋아하지 않습니다":
        return 1;
      default:
        return 0;
    }
  };

  return (
    <Form>
      <Wrap>
        <LikertHeader>맛집 추천을 위한 설문조사</LikertHeader>
        <Progress>
          <ProgressBar progress={progress} />
        </Progress>
        <form id="surveyForm" onChange={handleChange}>
          <Statement>어떤 종류의 음식을 가장 좋아하시나요?</Statement>
          <LikertList>
            <LikertItem>
              <LikertInput type="radio" name="food_type" value="한식" />
              <LikertLabel>한식</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="food_type" value="양식" />
              <LikertLabel>양식</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="food_type" value="중식" />
              <LikertLabel>중식</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="food_type" value="일식" />
              <LikertLabel>일식</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="food_type" value="기타" />
              <LikertLabel>기타</LikertLabel>
            </LikertItem>
          </LikertList>
          <Statement>매운 음식을 얼마나 좋아하시나요?</Statement>
          <LikertList>
            <LikertItem>
              <LikertInput type="radio" name="spicy" value="아주 좋아합니다" />
              <LikertLabel>아주 좋아합니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="spicy" value="좋아합니다" />
              <LikertLabel>좋아합니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="spicy" value="보통입니다" />
              <LikertLabel>보통입니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput
                type="radio"
                name="spicy"
                value="별로 좋아하지 않습니다"
              />
              <LikertLabel>별로 좋아하지 않습니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput
                type="radio"
                name="spicy"
                value="전혀 좋아하지 않습니다"
              />
              <LikertLabel>전혀 좋아하지 않습니다</LikertLabel>
            </LikertItem>
          </LikertList>
          <Statement>달달한 음식을 얼마나 좋아하시나요?</Statement>
          <LikertList>
            <LikertItem>
              <LikertInput type="radio" name="sweet" value="아주 좋아합니다" />
              <LikertLabel>아주 좋아합니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="sweet" value="좋아합니다" />
              <LikertLabel>좋아합니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="sweet" value="보통입니다" />
              <LikertLabel>보통입니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput
                type="radio"
                name="sweet"
                value="별로 좋아하지 않습니다"
              />
              <LikertLabel>별로 좋아하지 않습니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput
                type="radio"
                name="sweet"
                value="전혀 좋아하지 않습니다"
              />
              <LikertLabel>전혀 좋아하지 않습니다</LikertLabel>
            </LikertItem>
          </LikertList>
          <Statement>짠 음식을 얼마나 좋아하시나요?</Statement>
          <LikertList>
            <LikertItem>
              <LikertInput type="radio" name="salty" value="아주 좋아합니다" />
              <LikertLabel>아주 좋아합니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="salty" value="좋아합니다" />
              <LikertLabel>좋아합니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="salty" value="보통입니다" />
              <LikertLabel>보통입니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput
                type="radio"
                name="salty"
                value="별로 좋아하지 않습니다"
              />
              <LikertLabel>별로 좋아하지 않습니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput
                type="radio"
                name="salty"
                value="전혀 좋아하지 않습니다"
              />
              <LikertLabel>전혀 좋아하지 않습니다</LikertLabel>
            </LikertItem>
          </LikertList>
          <Statement>신 음식을 얼마나 좋아하시나요?</Statement>
          <LikertList>
            <LikertItem>
              <LikertInput type="radio" name="sour" value="아주 좋아합니다" />
              <LikertLabel>아주 좋아합니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="sour" value="좋아합니다" />
              <LikertLabel>좋아합니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput type="radio" name="sour" value="보통입니다" />
              <LikertLabel>보통입니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput
                type="radio"
                name="sour"
                value="별로 좋아하지 않습니다"
              />
              <LikertLabel>별로 좋아하지 않습니다</LikertLabel>
            </LikertItem>
            <LikertItem>
              <LikertInput
                type="radio"
                name="sour"
                value="전혀 좋아하지 않습니다"
              />
              <LikertLabel>전혀 좋아하지 않습니다</LikertLabel>
            </LikertItem>
          </LikertList>
          <Buttons>
            <ClearButton type="reset">Clear</ClearButton>
            <SubmitButton type="button" onClick={handleSubmit}>
              Submit
            </SubmitButton>
          </Buttons>
        </form>
      </Wrap>
      <Container>
        {filteredRestaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </Container>
    </Form>
  );
};

export default Service;
