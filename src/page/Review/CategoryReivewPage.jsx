import { useState, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeviceFrameset } from "react-device-frameset";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReviewCard from "../../components/Review/ReviewCard";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
function CategoryReviewPage() {
  const location = useLocation();

  const { restaurants } = location.state || { restaurants: [] };
  console.log(restaurants);

  const [isLoading, setIsLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleIconClick = () => {
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 100);
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
      setIsLoading(true);
      // 추가 데이터를 불러오는 함수 호출
      // 예: fetchAdditionalData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [cardInfo, setCardInfo] = useState({
    reviewCount: 0,
    viewCount: 0,
    rating: 0,
  });

  useEffect(() => {
    if (location.state) {
      setCardInfo({
        reviewCount: location.state.reviewCount,
        viewCount: location.state.viewCount,
        rating: location.state.rating,
      });
    }
  }, [location.state]);

  return (
    <ReviewPage>
      <ReviewPageWrapper>
        <DeviceFrameset
          device="iPad Mini"
          color="black"
          width="100%"
          height="75%"
        >
          <StyledContainer>
            <GreenContainer>
              <FontAwesomeIcon icon={faUtensils} size="2x" />
            </GreenContainer>
            <Header>
              <Link to="/review/">
                <PressableIcon
                  icon={faArrowLeft}
                  size="3x"
                  onClick={handleIconClick}
                  pressed={isPressed}
                />
              </Link>
              <Title>리뷰 목록</Title>
            </Header>

            <TagsContainer>
              {restaurants.map((restaurant, index) => (
                <div key={index}>
                  {restaurant.menus &&
                    restaurant.menus.length > 0 &&
                    restaurant.menus.map((menu, menuIndex) => (
                      <TagButton key={menuIndex}>{menu}</TagButton>
                    ))}
                </div>
              ))}
            </TagsContainer>
            <ReviewCardContainer>
              <div>
                {restaurants.map((restaurant, index) => (
                  <ReviewCard
                    key={index} // 고유한 식별자를 key로 사용
                    restaurant={restaurant}
                  />
                ))}
              </div>
              {isLoading && <div>Loading...</div>}
            </ReviewCardContainer>
          </StyledContainer>
        </DeviceFrameset>
      </ReviewPageWrapper>
    </ReviewPage>
  );
}

export default CategoryReviewPage;

const ReviewPage = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3);
`;
const ReviewPageWrapper = styled.div`
  max-width: 1000px;
  height: 1000px;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #9ad6e2;
`;
const Header = styled.div`
  max-width: 90%;
  margin: 0 auto;
  margin-top: 10px;
  height: 10%;
  display: flex;
  gap: 520px;
  border-bottom: 3px solid black;
`;

const TagsContainer = styled.div`
  max-width: 100%;
  padding: 15px;
  height: auto;
  margin: 0 auto;
  white-space: nowrap;
  display: flex;
  overflow-x: auto;
  background-color: #5e90a7;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const GreenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  background-color: #ffcc66;
  border-radius: 0 0 30px 30px;
`;
const TagButton = styled.button`
  margin-bottom: 20%;
  padding: 15px;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid #000000;
  background-color: white;
  border-radius: 10px;
  margin-right: 10px;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-family: "Uiyeun", sans-serif;

  &:hover {
    background-color: #f0f0f0;
    color: #000;
  }
`;

const Title = styled.h2`
  font-size: 25px;
  font-family: "Uiyeun", sans-serif;
`;

const PressableIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.9);
  }
`;

const ReviewCardContainer = styled.div`
  max-width: 90%;
  margin: 5%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  overflow-y: auto;
`;
