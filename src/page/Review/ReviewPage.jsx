import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
  faBurger,
  faPhone,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import LoginRequiredOverlay from "../../components/LoginRequiredOverlay"; // 로그인 요청 모달 추가
import LoadingBurger from "../../components/LoadingBurger";
import { selectedRestaurantState } from "../../state/mapAtoms";

function ReviewPage() {
  const location = useLocation();
  const { id } = useParams();

  const selectedRestaurant = useRecoilValue(selectedRestaurantState);

  const [reviews, setReviews] = useRecoilState(reviewsState);
  const [isActive, setIsActive] = useRecoilState(isActiveState);
  const [auth] = useRecoilState(authState); // 로그인 상태 확인

  // `location.state`에서 데이터 가져오기
  const restaurantInfo = location.state?.restaurant || selectedRestaurant;

  // 리뷰 작성/보기 토글
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (!restaurantInfo) {
      console.error("레스토랑 정보가 없습니다.");
    }
  }, [restaurantInfo]);

  if (!restaurantInfo) {
    return <Message>레스토랑 정보를 찾을 수 없습니다.</Message>;
  }

  // 리뷰를 서버에서 불러오는 함수
  const fetchReviews = async (restaurant_Id) => {
    try {
      const response = await fetch(
        `https://maketerbackend.fly.dev/api/v1/reviews/${restaurant_Id}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.reviews); // 가져온 리뷰 데이터 확인
      setReviews(data.reviews); // 리뷰 데이터를 Recoil 상태에 저장
    } catch (error) {
      console.error("Error fetching reviews:", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReviews(id);
    }
  }, [id]);

  // 리뷰 작성 함수
  const onSubmit = (content, hashtags, rating) => {
    if (!auth.isAuthenticated) {
      return <LoginRequiredOverlay />;
    }

    const updatedReviews = [
      ...reviews,
      {
        id,
        content,
        hashtags,
        rating,
      },
    ];

    setReviews(updatedReviews);

    fetch("https://maketerbackend.fly.dev/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        restaurant_id: id,
        contents: content,
        username: auth.fullName,
        rating: rating,
        hashtags: hashtags,
        author_id: auth.userId, // auth에서 사용자 ID 가져와 author_id로 전달
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
        fetchReviews(id); // 리뷰 작성 후 다시 리뷰 목록을 불러옴
        handleToggle();
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  // 리뷰 삭제 함수
  const OnDelete = async (review_id, author_id) => {
    console.log("auth.userId:", auth.userId); // 로그인한 사용자 ID
    console.log("review.author_id:", author_id); // 리뷰 작성자 ID

    if (auth.userId !== author_id) {
      alert("본인이 작성한 리뷰만 삭제할 수 있습니다.");
      return;
    }

    try {
      const response = await fetch(
        `https://maketerbackend.fly.dev/api/v1/reviews/${review_id}`,
        {
          method: "DELETE",
          credentials: "include",
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
      <HeaderContainer>
        <Title>식당 리뷰</Title>
      </HeaderContainer>

      <Container>
        <ContentsContainer>
          <DeviceFramesetWrapper>
            <DeviceFrameset device="iPhone 5c">
              <ImgSection backgroundImage={restaurantInfo.image}>
                <CardSection>
                  <CardTitle>{restaurantInfo.restaurants_name}</CardTitle>
                  <RatingStars rating={restaurantInfo.rating} />

                  <ReviewPanel>
                    <ToggleContainer onClick={handleToggle}>
                      <ReviewButton active={isActive}>
                        리뷰 {restaurantInfo.rating}{" "}
                      </ReviewButton>
                      <ReviewButton active={!isActive}>리뷰 작성</ReviewButton>
                      <ToggleSlider active={isActive} />
                    </ToggleContainer>
                  </ReviewPanel>
                </CardSection>
              </ImgSection>
              <AdditionalInfoBox>
                <AdditionalInfo>
                  <InfoIcon icon={faBurger} size="2x" />
                  <InfoText>{restaurantInfo.category}</InfoText>
                </AdditionalInfo>
                <AdditionalInfo>
                  <InfoIcon icon={faClock} size="2x" />
                  <InfoText>영업 시간: {restaurantInfo.opening_hours}</InfoText>
                </AdditionalInfo>
                <AdditionalInfo>
                  <InfoIcon icon={faMapMarkerAlt} size="2x" />
                  <InfoText>위치: {restaurantInfo.address}</InfoText>
                </AdditionalInfo>
                <AdditionalInfo>
                  <InfoIcon icon={faPhone} size="2x" />
                  <InfoText>연락처: {restaurantInfo.phone}</InfoText>
                </AdditionalInfo>
              </AdditionalInfoBox>
            </DeviceFrameset>
          </DeviceFramesetWrapper>
        </ContentsContainer>
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
`;

const Container = styled.div`
  max-width: 1280px;
  height: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 100px;
  @media screen and (max-width: 768px) {
    flex-direction: column; /* 모바일 화면에서는 상하로 배치 */
    height: auto; /* 높이를 자동으로 설정하여 내용에 맞게 조정 */
    gap: 20px; /* 모바일에서는 갭 크기를 줄임 */
  }
`;

const HeaderContainer = styled.header`
  max-width: 100%;
  padding: 0 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  background: linear-gradient(#e7e78b, #e7e78b);
`;

const ReviewContainer = styled.main`
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
  @media screen and (max-width: 768px) {
    max-width: 100%; /* 모바일에서는 최대 너비를 100%로 설정 */
    margin-right: 0; /* 오른쪽 마진 제거 */
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
  display: flex;
  justify-content: center; /* Center contents horizontally */
  align-items: center; /* Center contents vertically */

  @media screen and (max-width: 768px) {
    max-width: 100%; /* 모바일에서는 최대 너비를 100%로 설정 */
    height: 100%; /* 모바일에서 높이를 90%로 설정 */
  }
`;
const DeviceFramesetWrapper = styled.div`
  height: auto;
  width: auto;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
  @media screen and (max-width: 768px) {
    height: auto;
    width: auto;
    margin: 0;
    padding: 0;
  }
`;
const ImgSection = styled.section`
  max-width: 100%;
  height: 300px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    height: 200px; /* 모바일에서는 높이를 줄임 */
  }
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  padding: 20px;
  margin: 0 auto;

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
  top: 150px;
  margin: 0 auto;
  padding: 30px;
  box-shadow: rgba(10, 100, 90, 0.5) 0px 7px 29px 0px;
  @media screen and (max-width: 768px) {
    padding: 0px;
  }
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
