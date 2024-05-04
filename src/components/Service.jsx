import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
  text-align: center; /* 헤더 가운데 정렬 */
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
  margin: 0 auto; /* 가운데 정렬 */
  padding: 0 0 35px;
  display: block;
  border-bottom: 2px solid #efefef;

  &:last-of-type {
    border-bottom: 0;
  }
`;

const LikertItem = styled.li`
  display: inline-block;
  width: 20%; /* 수정된 부분 */
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
  text-align: center; /* 버튼 가운데 정렬 */
`;

const ClearButton = styled.button`
  padding: 10px 20px;
  background-color: #e9e9e9;
  border: 2px solid #e9e9e9; /* 수정 */
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
    border-color: #ccc; /* 수정 */
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #67ab49;
  border: 2px solid #67ab49; /* 수정 */
  border-radius: 5px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #14892c;
    border-color: #14892c; /* 수정 */
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  width: 300px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

const Info = styled.p`
  margin: 10px 0;
`;

const Service = () => {
  const [progress, setProgress] = useState(0);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

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
    const checkedItems = document.querySelectorAll(
      'input[type="radio"]:checked'
    );
    const totalQuestions = 5; // 총 질문의 수
    const newProgress = (checkedItems.length / totalQuestions) * 100;
    setProgress(newProgress);
  };

  const getLikertValue = (name) => {
    const value = document.querySelector(`input[name="${name}"]:checked`).value;
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

  const calculatePreference = () => {
    const answers = {
      food_type: getLikertValue("food_type"),
      spicy: getLikertValue("spicy"),
      sweet: getLikertValue("sweet"),
      salty: getLikertValue("salty"),
      sour: getLikertValue("sour"),
    };

    const preference = {
      맵기: answers.spicy,
      단맛: answers.sweet,
      신맛: answers.sour,
      짠맛: answers.salty,
      food_type: answers.food_type,
    };

    return preference;
  };

  const handleSubmit = () => {
    const userPreference = calculatePreference();
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
        userPreference.food_type === 0;
      return (
        맵기차이 <= 1 &&
        단맛차이 <= 1 &&
        신맛차이 <= 1 &&
        짠맛차이 <= 1 &&
        foodTypeMatch
      );
    });
    setFilteredRestaurants(filtered);
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
          <Card key={index}>
            <Image src={restaurant.image} alt={restaurant.restaurant_name} />
            <Content>
              <Title>{restaurant.restaurant_name}</Title>
              <Info>주소: {restaurant.address}</Info>
              <Info>전화번호: {restaurant.phone}</Info>
              <Info>영업 시간: {restaurant.opening_hours}</Info>
              <Info>평점: {restaurant.rating}</Info>
              <Info>맛의 단계: {restaurant.taste_level}</Info>
            </Content>
          </Card>
        ))}
      </Container>
    </Form>
  );
};

export default Service;
