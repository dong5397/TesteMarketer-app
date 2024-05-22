import React, { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faUtensilSpoon } from "@fortawesome/free-solid-svg-icons";
import { faFish } from "@fortawesome/free-solid-svg-icons";
import { faCookie } from "@fortawesome/free-solid-svg-icons";
import { faPizzaSlice } from "@fortawesome/free-solid-svg-icons";
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons";
import { faIceCream } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";

function ReviewListPage() {
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
    // 서버에 해당 카테고리의 데이터를 요청
    fetch(`http://localhost:3000/api/v1/restaurants/category/${category}`)
      .then((response) => {
        if (response.ok) {
          return response.json(); // 응답이 성공적이면 JSON 형태로 변환
        }
        throw new Error("Network response was not ok."); // 응답 실패 처리
      })
      .then((data) => {
        console.log(data.data.map((el) => el)); // 받은 데이터를 콘솔에 로그로 출력
        setRestaurants(data.data);

        // Pass menu items to the next page
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
        // 에러 처리 로직
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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
          <SearchBarContainer>
            <SearchBar
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBarContainer>
          <CategoriesGridContainer>
            <CategoriesGrid>
              {categories.map((category, index) => (
                <CategoryContainer key={index}>
                  <CategoryButton
                    onClick={() => handleCategorySelect(category)}
                    active={selectedCategory === category}
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

export default ReviewListPage;

const ReviewPage = styled.div`
  background: linear-gradient(#f0f0c3, #e7e7c9);
  height: 100%;
`;

const ReviewPageWrapper = styled.div`
  max-width: 800px;
  height: 800px;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
`;

const HeaderContainer = styled.header`
  padding: 20px;
  background: linear-gradient(#f0f0c3, #e7e7c9);
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin: 0;
`;

const GreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background-color: #ffcc66;
  border-radius: 0 0 30px 30px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-top: 30px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CategoriesGridContainer = styled.div`
  background-color: #e1f5fe;
  padding: 20px;
  border-radius: 20px;
  margin: 15px; 0;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
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
  border-radius: 20px;
  background-color: ${({ active }) => (active ? "#ff7043" : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 150px;
  height: 150px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ active }) => (active ? "#ff5722" : "#e0e0e0")};
    color: ${({ active }) => (active ? "#fff" : "#000")};
    transform: translateY(-5px);
  }
`;

const CategoryLabel = styled.span`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
