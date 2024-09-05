import React, { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
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
  const [searchTerm, setSearchTerm] = useState("");
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
      `https://makterbackend.fly.dev/api/v1/restaurants/category/${category}`
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
      <ReviewPageWrapper>
        <DeviceFrameset
          device="iPad Mini"
          color="black"
          width="100%"
          height="75%"
        >
          <GreenContainer>
            <FontAwesomeIcon icon={faUtensils} size="2x" />
          </GreenContainer>

          <CategoriesGridContainer>
            <CategoriesGrid>
              {categories.map((category, index) => (
                <CategoryContainer key={index}>
                  <CategoryButton
                    onClick={() => handleCategorySelect(category)}
                    active={selectedCategory === category ? "true" : undefined} // 수정된 부분
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

// 나머지 스타일 컴포넌트 정의는 동일합니다.

// 나머지 스타일 컴포넌트 정의는 동일합니다.

const ReviewPageWrapper = styled.div`
  max-width: 1000px;
  height: 1200px;

  margin: 0 auto;
  padding: 20px;
  gap: 100px;
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
  padding-top: 50px;
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
  width: 150px;
  height: 150px;

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
