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

function ReviewPage() {
  const location = useLocation();
  const restranutInfo = { ...location.state };
  const { id } = useParams();

  const [showReviewList, setShowReviewList] = useState(true);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async (restaurantId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/reviews/${restaurantId}`
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
    fetchReviews(restranutInfo.id); // restranutInfo.id를 사용하여 요청 보내기
  }, [restranutInfo.id]); // restranutInfo.id가 변경될 때마다 실행

  const handleReviewListClick = () => {
    setShowReviewList(true);
    setShowWriteReview(false);
  };

  const handleWriteReviewClick = () => {
    setShowReviewList(false);
    setShowWriteReview(true);
  };

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
              </CardSection>
            </ImgSection>
            <AdditionalInfoBox>
              <AdditionalInfo>
                <InfoIcon icon={faStar} size="2x" />
                <InfoText>평균 평점: {restranutInfo.rating}</InfoText>
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
          <ReviewPanel>
            <ReviewButton
              onClick={handleReviewListClick}
              active={showReviewList}
            >
              리뷰 목록
            </ReviewButton>
            <ReviewButton
              onClick={handleWriteReviewClick}
              active={showWriteReview}
            >
              리뷰 작성
            </ReviewButton>
          </ReviewPanel>

          {showReviewList && <ReviewList reviews={reviews} />}
          {showWriteReview && <WriteReview onSubmit={onSubmit} />}
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
  max-width: 65%;
  margin: auto;
  margin-right: 40px;
  height: 1000px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 60px;
  background-color: white;
`;

const ReviewPanel = styled.header`
  max-width: 100%;
  height: 10%;
  border-radius: 50px;
  background-color: #cde8e5;
`;

const ReviewButton = styled.button`
  width: 50%;
  height: 100%;
  font-size: 28px;
  font-weight: 900;
  border: none;
  border-radius: 50px;
  background-color: ${({ active }) => (active ? "white" : "#cde8e5")};
  color: ${({ active }) => (active ? "#dd5746" : "black")};
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

const Button = styled.button`
  background-color: #f1c40f;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e67e22;
  }
`;
