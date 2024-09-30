import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { reviewsState, isActiveState } from "../../state/reviewAtoms";
import { authState } from "../../state/userAtoms"; // Recoil의 authState 추가
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
import LoginRequiredOverlay from "../../components/LoginRequiredOverlay"; // 로그인 요청 모달 추가
import "react-device-frameset/styles/marvel-devices.min.css";

function ReviewPage() {
  const location = useLocation();
  const restaurantInfo = { ...location.state };
  const { id } = useParams();

  const [reviews, setReviews] = useRecoilState(reviewsState);
  const [isActive, setIsActive] = useRecoilState(isActiveState);
  const [auth] = useRecoilState(authState); // 로그인 상태 확인
  const lastId = useRef(4);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const fetchReviews = async (restaurant_Id) => {
    try {
      const response = await fetch(
        `https://maketerbackend.fly.dev/api/v1/reviews/${restaurant_Id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
      }
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews(id);
    }
  }, [id]);

  const onSubmit = (username, content, hashtags, rating) => {
    if (!auth.isAuthenticated) {
      // 로그인이 안되어 있으면 LoginRequiredOverlay 표시
      return;
    }

    const updatedReviews = [
      ...reviews,
      { id: lastId.current, username, content, hashtags, rating },
    ];

    setReviews(updatedReviews);
    lastId.current++;

    fetch("https://maketerbackend.fly.dev/api/v1/reviews", {
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
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to create review: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        fetchReviews(id); // 리뷰 작성 후 다시 리뷰 목록을 가져옴
        handleToggle();
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const OnDelete = async (review_id) => {
    try {
      const response = await fetch(
        `https://maketerbackend.fly.dev/api/v1/reviews/${review_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete review: ${response.statusText}`);
      }
      fetchReviews(id);
    } catch (error) {
      console.error("Error deleting review:", error.message);
    }
  };

  return (
    <ReveiwP>
      <H1>Maketer</H1>
      <H2>대전 전체의 맛집을 찾아줍니다</H2>
      <Container>
        <DeviceFramesetWrapper>
          <DeviceFrameset device="iPhone X">
            <ImgSection $backgroundImage={restaurantInfo.image}>
              <CardSection>
                <CardTitle>{restaurantInfo.name}</CardTitle>
                <RatingStars rating={restaurantInfo.rating} />
                <ReviewPanel>
                  <ToggleContainer onClick={handleToggle}>
                    <ReviewButton $active={isActive}>
                      리뷰 {restaurantInfo.rating}
                    </ReviewButton>
                    <ReviewButton $active={!isActive}>리뷰 작성</ReviewButton>
                    <ToggleSlider $active={isActive} />
                  </ToggleContainer>
                </ReviewPanel>
              </CardSection>
            </ImgSection>
            <AdditionalInfoBox>{/* 추가 정보 */}</AdditionalInfoBox>
          </DeviceFrameset>
        </DeviceFramesetWrapper>

        <ReviewContainer>
          {isActive ? (
            auth.isAuthenticated ? (
              <WriteReview onSubmit={onSubmit} />
            ) : (
              <LoginRequiredOverlay />
            )
          ) : (
            <ReviewList reviews={reviews} onDelete={OnDelete} />
          )}
        </ReviewContainer>
        <Carousel autoPlay />
      </Container>
    </ReveiwP>
  );
}

export default ReviewPage;

const ReveiwP = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3);
  width: auto;
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
const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 100px;

  @media screen and (max-width: 768px) {
    flex-direction: column; /* 모바일 화면에서는 상하로 배치 */
    height: auto;
    gap: 0px; /* 모바일에서는 갭 크기를 줄임 */
  }
`;

const ReviewContainer = styled.main`
  max-height: 750px;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 60px;
  background-color: white;

  @media screen and (max-width: 768px) {
    max-width: 100%; /* 모바일에서는 최대 너비를 100%로 설정 */
    margin-right: 0; /* 오른쪽 마진 제거 */
    margin-bottom: 200px;
  }
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
  color: ${({ $active }) => ($active ? "#dd5746" : "black")};
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
  transform: ${({ $active }) =>
    $active ? "translateX(50%)" : "translateX(-50%)"};
`;

const DeviceFramesetWrapper = styled.div`
  width: auto;
  height: auto;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
  @media screen and (max-width: 768px) {
    transform: scale(0.8); /* 모바일에서는 더 작게 축소 */
    transform-origin: top left;
    margin: 0;
    padding: 0;
    gap: 0px;
  }
`;

const ImgSection = styled.section`
  max-width: 100%; /* 내부 콘텐츠의 넓이를 줄임 */
  height: 270px; /* 높이도 줄여서 조정 */
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    height: 40%; /* 모바일에서는 높이를 줄임 */
  }
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
  max-width: 90%;
  height: 160px;
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
  padding: 20px; /* 패딩도 줄여서 조정 */
  box-shadow: rgba(10, 100, 90, 0.5) 0px 7px 29px 0px;
`;

const CardTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 10px;
`;

const AdditionalInfoBox = styled.div`
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

const AdditionalInfo = styled.div`
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

const InfoIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 24px;
  color: #555;
`;

const InfoText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;
