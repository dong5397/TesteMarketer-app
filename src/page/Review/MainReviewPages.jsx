import React, { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import styled from "styled-components";

const tagsData = {
  한식: ["#김치찌개", "#비빔밥", "#불고기", "#된장찌개"],
  일식: ["#초밥", "#라멘", "#돈부리", "#우동"],
  중식: ["#짜장면", "#탕수육", "#마파두부", "#양장피"],
};

function MainReviewPages() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <ReveiwP>
      <HeaderContainer>
        <Title>식당 리뷰</Title>
      </HeaderContainer>

      <ReviewPageWrapper>
        <DeviceFrameset
          device="iPad Mini"
          color="black"
          width="100%"
          height="80%"
        >
          <CategoryContainer>
            {Object.keys(tagsData).map((category, index) => (
              <CategoryButton
                key={index}
                onClick={() => handleCategorySelect(category)}
                active={selectedCategory === category}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryContainer>
          <TagsContainer>
            {selectedCategory &&
              tagsData[selectedCategory].map((tag, index) => (
                <TagButton key={index}>{tag}</TagButton>
              ))}
          </TagsContainer>
        </DeviceFrameset>
      </ReviewPageWrapper>
    </ReveiwP>
  );
}

export default MainReviewPages;

const ReveiwP = styled.div`
  background: linear-gradient(#f0f0c3, #e7e7c9);
`;
const ReviewPageWrapper = styled.div`
  max-width: 800px;
  height: 800px;
  padding: 20px;
  gap: 100px;
  margin: 0 auto;
`;

const HeaderContainer = styled.header`
  padding: 20px;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin: 0;
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 20px;
  margin: 0 20%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CategoryButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background-color: ${({ active }) => (active ? "#dd5746" : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ active }) => (active ? "#c33a1d" : "#e0e0e0")};
    color: ${({ active }) => (active ? "#fff" : "#000")};
  }
`;

const TagsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TagButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  background-color: #f0f0f0;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #e0e0e0;
    color: #000;
  }
`;
