import React, { useEffect } from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link, useParams } from "react-router-dom";
import RatingStars from "../../components/Review/RatingStars";
import { useState, useRef } from "react";
import ReviewList from "../../components/Review/ReviewList";
import WriteReview from "../../components/Review/WriteReview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import { useLocation } from "react-router-dom";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faBurger } from "@fortawesome/free-solid-svg-icons";

function ReviewPage() {
  const location = useLocation();
  const restranutInfo = { ...location.state };
  const { id } = useParams();

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
      console.log(data.reviews);
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews(restranutInfo.id); // restranutInfo.id를 사용하여 요청 보내기
  }, [restranutInfo.id]); // restranutInfo.id가 변경될 때마다 실행

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

    // 서버로 데이터 전송
    fetch("https://makterback.fly.dev/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        restaurant_id: id, // 레스토랑 ID
        contents: content,
        username: username,
        rating: rating,
        hashtags: hashtags,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchReviews(id); // 리뷰 작성 후에 목록 갱신
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const OnDelete = async (reviewId) => {
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
      // 삭제 성공 시 화면에서도 즉시 업데이트
      fetchReviews(id); // 리뷰 작성 후에 목록 갱신
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <ReveiwP>
      <HeaderContainer>
        <Title>식당 리뷰</Title>
      </HeaderContainer>

      <Container>
        <ContentsContainer>
          <DeviceFrameset
            device="iPhone X"
            color="black"
            width="100%"
            height="100%"
          >
            <ImgSection backgroundImage={restranutInfo.image}>
              <CardSection>
                <CardTitle>{restranutInfo.name}</CardTitle>
                <RatingStars rating={restranutInfo.rating} />

                <AdditionalInfo>
                  <ReviewPanel>
                    <ToggleContainer onClick={handleToggle}>
                      <ReviewButton active={isActive}>
                        리뷰 {restranutInfo.rating}{" "}
                      </ReviewButton>
                      <ReviewButton active={!isActive}>리뷰 작성</ReviewButton>
                      <ToggleSlider active={isActive} />
                    </ToggleContainer>
                  </ReviewPanel>
                </AdditionalInfo>
              </CardSection>
            </ImgSection>
            <AdditionalInfoBox>
              <AdditionalInfo>
                <InfoIcon icon={faBurger} size="2x" />
                <InfoText>{restranutInfo.category}</InfoText>
              </AdditionalInfo>
              <AdditionalInfo>
                <InfoIcon icon={faClock} size="2x" />
                <InfoText>영업 시간: {restranutInfo.opening_hours}</InfoText>
              </AdditionalInfo>
              <AdditionalInfo>
                <InfoIcon icon={faMapMarkerAlt} size="2x" />
                <InfoText>위치: {restranutInfo.address}</InfoText>
              </AdditionalInfo>
              <AdditionalInfo>
                <InfoIcon icon={faPhone} size="2x" />
                <InfoText>연락처: {restranutInfo.phone}</InfoText>
              </AdditionalInfo>
            </AdditionalInfoBox>
          </DeviceFrameset>
        </ContentsContainer>
        <ReviewContainer>
          {isActive ? (
            <WriteReview onSubmit={onSubmit} />
          ) : (
            <ReviewList reviews={reviews} onDelete={OnDelete} />
          )}
        </ReviewContainer>

        <Carousel autoPlay></Carousel>
      </Container>
    </ReveiwP>
  );
}

export default ReviewPage;

const ReveiwP = styled.div`
  background: linear-gradient(#f0f0c3, #e7e7c9);
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 100px;
`;

const HeaderContainer = styled.header`
  max-width: 100%;

  padding: 0 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;

const ReviewContainer = styled.main`
  max-width: 85%;
  min-height: 750px;
  margin: auto;
  margin-right: 40px;

  max-height: 750px;

  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 60px;
  background-color: white;
`;

const ReviewPanel = styled.div`
  height: 50px;
  width: 200px;
  border-radius: 50px;
  background-color: #cde8e5;
  display: flex;
`;

const ToggleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: #cde8e5;
`;

const ReviewButton = styled.button`
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

const ToggleSlider = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background-color: #f4ce14;
  border-radius: 50px;
  transition: transform 0.4s cubic-bezier(0.24, 0, 0.5, 1);
  transform: ${({ active }) =>
    active ? "translateX(50%)" : "translateX(-50%)"};
`;

const ContentsContainer = styled.div`
  max-width: 30%;
  height: 700px;
  flex: 1;
  border-radius: 50px;
`;

const ImgSection = styled.section`
  max-width: 100%;
  height: 300px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 20px;
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

const CardSection = styled.section`
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

const CardTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
`;

const AdditionalInfoBox = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 100%;
  bottom: 20px;
  padding: 10px;
  align-items: center;
  border-radius: 30px;
`;

const AdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const InfoIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const InfoText = styled.span`
  font-size: 22px;
  font-weight: 600;
`;
