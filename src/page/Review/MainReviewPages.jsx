// 파일: MainReviewPages.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import {
  faUtensilSpoon,
  faFish,
  faCookie,
  faPizzaSlice,
  faDrumstickBite,
  faIceCream,
  faCoffee,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DeviceFrameset } from "react-device-frameset";

function MainReviewPages() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    // 카테고리 선택 로직 추가
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
        return faUtensils;
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
                    $active={selectedCategory === category} // `$active`로 수정
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

// 스타일 컴포넌트
const ReviewPage = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3);
  height: 100%;
`;

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
  background-color: ${({ $active }) => ($active ? "#e7f1c9" : "#f0f0f0")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 150px;
  height: 150px;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#e7f1c9" : " #e9e5a9")};
    color: ${({ $active }) => ($active ? "#fff" : "#000")};
    transform: translateY(-5px);
  }
`;

const CategoryLabel = styled.span`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
