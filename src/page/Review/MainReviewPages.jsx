import React, { useState } from "react";
import { DeviceFrameset } from "react-device-frameset"; // Keep this import
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faUtensilSpoon,
  faFish,
  faCookie,
  faPizzaSlice,
  faDrumstickBite,
  faIceCream,
  faCoffee,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";

function MainReviewPages() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState({});

  const [categories, setCategories] = useState([
    "한식",
    "일식",
    "중식",
    "양식",
    "치킨",
    "디저트",
    "음료",
    "버거",
  ]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetch(
      `https://maketerbackend.fly.dev/api/v1/restaurants/category/${category}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data.data.map((el) => el));
        setRestaurants(data.data);
        navigate(`/category/${category}`, {
          state: {
            restaurants: data.data.map((el) => ({
              id: el.restaurants_id,
              name: el.restaurants_name,
              phone: el.phone,
              opening_hours: el.opening_hours,
              rating: el.rating,
              category: el.category,
              address: el.address,
              image: el.image,
              menus: el.food_menu.menus.map((menu) => menu.name),
            })),
          },
        });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "한식":
        return faUtensilSpoon;
      case "일식":
        return faFish;
      case "중식":
        return faCookie;
      case "양식":
        return faPizzaSlice;
      case "치킨":
        return faDrumstickBite;
      case "디저트":
        return faIceCream;
      case "음료":
        return faCoffee;
      case "버거":
        return faHamburger;
      default:
        return null;
    }
  };

  return (
    <ReviewPage>
      <H1>Maketer</H1>
      <H2>대전 전체의 맛집을 찾아줍니다</H2>
      <ReviewPageWrapper>
        <CenteredContainer>
          <DeviceFrameset device="iPad Mini">
            <GreenContainer>
              <FontAwesomeIcon icon={faUtensils} size="2x" />
            </GreenContainer>

            <CategoriesGridContainer>
              <CategoriesGrid>
                {categories.map((category, index) => (
                  <CategoryContainer key={index}>
                    <CategoryButton
                      onClick={() => handleCategorySelect(category)}
                      active={
                        selectedCategory === category ? "true" : undefined
                      }
                    >
                      <FontAwesomeIcon
                        icon={getCategoryIcon(category)}
                        size="2x"
                      />
                      <CategoryLabel>{category}</CategoryLabel>
                    </CategoryButton>
                  </CategoryContainer>
                ))}
              </CategoriesGrid>
            </CategoriesGridContainer>
          </DeviceFrameset>
        </CenteredContainer>
      </ReviewPageWrapper>
    </ReviewPage>
  );
}

export default MainReviewPages;

// 스타일 컴포넌트 정의
const ReviewPage = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3);
  height: 100%;
`;
const H1 = styled.h1`
  display: none; /* 기본적으로 숨김 처리 */

  @media screen and (max-width: 481px) {
    display: block; /* 모바일에서만 표시 */
    font-size: 40px;
    line-height: 1.2;
    padding-top: 3%;
    margin-bottom: 0.3rem;
    font-family: "GowunDodum-Regular";
    text-align: center;
  }
`;

const H2 = styled.h2`
  display: none; /* 기본적으로 숨김 처리 */

  @media screen and (max-width: 481px) {
    display: block; /* 모바일에서만 표시 */
    text-align: center;
    font-weight: 300;
    font-size: 20px;
    font-family: "GowunDodum-Regular";
  }
`;
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ReviewPageWrapper = styled.div`
  height: auto;
  width: auto;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
  @media screen and (max-width: 481px) {
    width: auto;
    height: auto;
  }
`;

const GreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: #e9e5a9;
  border-radius: 0 0 30px 30px;
`;

const CategoriesGridContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  margin: 15px 0;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media screen and (max-width: 481px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border: none;
  border: solid 4px;
  border-radius: 20px;
  background-color: ${({ active }) =>
    active === "true" ? "#e7f1c9" : "#f0f0f0"};
  color: ${({ active }) => (active === "true" ? "#fff" : "#000")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 130px;
  height: 130px;
  @media screen and (max-width: 481px) {
    width: 100px;
    height: 100px;
  }

  &:hover {
    background-color: ${({ active }) =>
      active === "true" ? "#e7f1c9" : "#e9e5a9"};
    color: ${({ active }) => (active === "true" ? "#fff" : "#000")};
    transform: translateY(-5px);
  }
`;

const CategoryLabel = styled.span`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
