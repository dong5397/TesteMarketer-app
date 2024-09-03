import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useParams, useLocation } from "react-router-dom";
import RatingStars from "../../components/Review/RatingStars";
import ReviewList from "../../components/Review/ReviewList";
import WriteReview from "../../components/Review/WriteReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faClock,
  faMapMarkerAlt,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

function ReviewPage() {
  const { id } = useParams();
  const location = useLocation();
  const restranutInfo = { ...location.state };

  const [reviews, setReviews] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const fetchReviews = async (restaurantId) => {
    try {
      const response = await fetch(
        `https://makterback.fly.dev/api/v1/reviews/${restaurantId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews(restranutInfo.id);
  }, [restranutInfo.id]);

  const lastId = useRef(4);

  const onSubmit = (username, content, hashtags, rating) => {
    const updateReviews = reviews.concat({
      id: lastId.current,
      username,
      content,
      hashtags,
      rating,
    });

    setReviews(updateReviews);
    lastId.current++;

    fetch("https://makterback.fly.dev/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurant_id: id,
        contents: content,
        username: username,
        rating: rating,
        hashtags: hashtags,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        fetchReviews(id);
        handleToggle();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `https://makterback.fly.dev/api/v1/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete review");
      }
      fetchReviews(id);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <ReviewPageWrapper>
      <HeaderContainer>
        <Title>식당 리뷰</Title>
      </HeaderContainer>

      <MainContainer>
        <DetailsContainer>
          <DeviceFrameset
            device="iPhone X"
            color="black"
            width="100%"
            height="100%"
          >
            <ImageSection backgroundImage={restranutInfo.image}>
              <DetailsCard>
                <RestaurantName>{restranutInfo.name}</RestaurantName>
                <RatingStars rating={restranutInfo.rating} />

                <TogglePanel>
                  <ToggleWrapper onClick={handleToggle}>
                    <ToggleButton active={isActive}>
                      리뷰 {restranutInfo.rating}
                    </ToggleButton>
                    <ToggleButton active={!isActive}>리뷰 작성</ToggleButton>
                    <Slider active={isActive} />
                  </ToggleWrapper>
                </TogglePanel>
              </DetailsCard>
            </ImageSection>
            <InfoContainer>
              <InfoBlock>
                <Icon icon={faBurger} size="2x" />
                <InfoText>{restranutInfo.category}</InfoText>
              </InfoBlock>
              <InfoBlock>
                <Icon icon={faClock} size="2x" />
                <InfoText>영업 시간: {restranutInfo.opening_hours}</InfoText>
              </InfoBlock>
              <InfoBlock>
                <Icon icon={faMapMarkerAlt} size="2x" />
                <InfoText>위치: {restranutInfo.address}</InfoText>
              </InfoBlock>
              <InfoBlock>
                <Icon icon={faPhone} size="2x" />
                <InfoText>연락처: {restranutInfo.phone}</InfoText>
              </InfoBlock>
            </InfoContainer>
          </DeviceFrameset>
        </DetailsContainer>
        <ReviewSection>
          {isActive ? (
            <WriteReview onSubmit={onSubmit} />
          ) : (
            <ReviewList reviews={reviews} onDelete={onDelete} />
          )}
        </ReviewSection>

        <Carousel autoPlay></Carousel>
      </MainContainer>
    </ReviewPageWrapper>
  );
}

export default ReviewPage;

const ReviewPageWrapper = styled.div`
  background: linear-gradient(#f0f0c3, #e7e7c9);
`;

const HeaderContainer = styled.header`
  max-width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  padding: 20px;
  margin: 0 auto;
  margin-right: 60px;
  flex: 1;
  text-align: center;
`;

const MainContainer = styled.div`
  max-width: 1280px;
  height: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 50px;
`;

const DetailsContainer = styled.div`
  max-width: 30%;
  height: 700px;
  flex: 1;
  border-radius: 50px;
`;

const ImageSection = styled.section`
  max-width: 100%;
  height: 300px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 20px;
`;

const DetailsCard = styled.div`
  max-width: 340px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  z-index: 5;
  background-color: white;
  position: absolute;
  bottom: -100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 30px;
  box-shadow: rgba(10, 100, 90, 0.5) 0px 7px 29px 0px;
`;

const RestaurantName = styled.h2`
  font-size: 22px;
  margin-bottom: 10px;
`;

const TogglePanel = styled.div`
  height: 50px;
  width: 200px;
  border-radius: 50px;
  background-color: #cde8e5;
  display: flex;
`;

const ToggleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: #cde8e5;
`;

const ToggleButton = styled.button`
  flex: 1;
  font-size: 14px;
  font-weight: 900;
  border: none;
  border-radius: 50px;
  background-color: transparent;
  color: ${({ active }) => (active ? "#dd5746" : "black")};
  transition: color 0.5s ease-in-out;
  z-index: 1;
`;

const Slider = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: #f4ce14;
  border-radius: 50px;
  transition: transform 0.4s cubic-bezier(0.24, 0, 0.5, 1);
  transform: ${({ active }) =>
    active ? "translateX(50%)" : "translateX(-50%)"};
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  position: absolute;
  width: 100%;
  bottom: 20px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  font-size: 16px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 24px;
  color: #555;
`;

const InfoText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const ReviewSection = styled.div`
  max-width: 85%;
  min-height: 750px;
  margin-right: 40px;
  max-height: 750px;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 60px;
  background-color: white;
`;
