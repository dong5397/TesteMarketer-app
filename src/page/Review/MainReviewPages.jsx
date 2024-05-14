import React, { useState } from "react";
import { DeviceFrameset } from "react-device-frameset";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
};

NextArrow.propTypes = {
  className: PropTypes.string, // className이 문자열 타입인지 확인
  style: PropTypes.object, // style이 객체 타입인지 확인
  onClick: PropTypes.func, // onClick이 함수 타입인지 확인
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
};

PrevArrow.propTypes = {
  className: PropTypes.string, // className이 문자열 타입인지 확인
  style: PropTypes.object, // style이 객체 타입인지 확인
  onClick: PropTypes.func, // onClick이 함수 타입인지 확인
};

const tagsData = {
  한식: ["#김치찌개", "#비빔밥", "#불고기", "#된장찌개", "#덮밥", "#도시락"],
  일식: ["#초밥", "#라멘", "#돈부리", "#우동", "#돈까스", "#회"],
  중식: ["#짜장면", "#탕수육", "#마파두부", "#양장피", "#마라탕", "볶음밥"],
  양식: ["#스테이크", "#파스타", "#피자", "#버거"],
  치킨: ["#후라이드 치킨", "#양념 치킨", "#순살 치킨", "#통닭"],
  디저트: ["#아이스크림", "#케이크", "#호두 파이", "#크레페"],
  음료: ["#커피", "#차", "#스무디", "#쥬스"],
};

function ReviewListPage() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

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

  // 필터링된 태그 데이터 가져오기
  const filteredTags = selectedCategory
    ? tagsData[selectedCategory].filter((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // 음식 카테고리 캐러셀 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  // 음식 태그 캐러셀 설정
  const sliderSettings2 = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
          height="75%"
        >
          <Slider {...sliderSettings}>
            {Object.keys(tagsData).map((category, index) => (
              <CategoryContainer key={index}>
                <CategoryButton
                  onClick={() => handleCategorySelect(category)}
                  active={selectedCategory === category}
                >
                  {category}
                </CategoryButton>
              </CategoryContainer>
            ))}
          </Slider>
          <SearchBarContainer>
            <SearchIcon>🔍</SearchIcon>
            <SearchBar
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBarContainer>
          <TagsCarousel
            {...sliderSettings2}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {filteredTags.map((tag, index) => (
              <TagButton key={index}>{tag}</TagButton>
            ))}
          </TagsCarousel>
        </DeviceFrameset>
      </ReviewPageWrapper>
    </ReveiwP>
  );
}

export default ReviewListPage;

const ReveiwP = styled.div`
  background: linear-gradient(#f0f0c3, #e7e7c9);
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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  margin-bottom: 20px;
  margin-left: 20%;
  margin-top: 30px;
`;

const SearchBar = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled.span`
  padding: 10px;
  font-size: 20px;
`;

const TagsCarousel = styled.div`
  margin-top: 20px;

  .slick-slide {
    margin: 0 10px; // 각 슬라이드의 좌우 간격 조절
  }

  .slick-list {
    margin-left: -10px; // 슬라이드 리스트의 왼쪽 마진 조절
    margin-right: -10px; // 슬라이드 리스트의 오른쪽 마진 조절
  }
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
