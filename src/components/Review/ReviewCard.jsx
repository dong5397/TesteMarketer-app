import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { selectedRestaurantState } from "../../state/mapAtoms";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import click from "../../images/review/click.gif";

const ReviewCard = ({ restaurant }) => {
  const {
    id,
    name,
    image,
    rating,
    opening_hours,
    phone,
    address,
    category,
    reviewCount,
    viewCount,
  } = restaurant;

  const navigate = useNavigate();
  const [showCardInfo, setShowCardInfo] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
    selectedRestaurantState
  );

  const handleDetailPost = () => {
    setSelectedRestaurant({
      id,
      name,
      opening_hours,
      rating,
      image,
      phone,
      address,
      category,
      reviewCount,
      viewCount,
    });
    navigate(`/review/${id}`); // 페이지 이동
  };

  return (
    <CardWrapper
      onClick={handleDetailPost}
      onMouseEnter={() => setShowCardInfo(true)}
      onMouseLeave={() => setShowCardInfo(false)}
    >
      <CardBackground $backgroundImage={image} />
      <CardContent>
        <CardTitle $showInfo={showCardInfo}>
          {showCardInfo ? "클릭하여 리뷰보기" : name}
        </CardTitle>
        <CardHashTag $showInfo={showCardInfo}>
          {showCardInfo ? "" : `#${restaurant.menus?.join(" #")}`}
        </CardHashTag>
        <CardImg $backgroundImage={showCardInfo ? click : image} />
      </CardContent>
      <CardInfoBox $showInfo={showCardInfo}>
        <ReviewCount>리뷰 {reviewCount}개</ReviewCount>
        <ViewCount>조회 {viewCount}회</ViewCount>
        <Rating>
          <FontAwesomeIcon
            icon={solidStar}
            size="2x"
            style={{ color: "#FFD43B" }}
          />{" "}
          {rating}
        </Rating>
      </CardInfoBox>
    </CardWrapper>
  );
};

export default ReviewCard;

// Styled components remain the same...

// Styled components remain the same...

// 스타일 컴포넌트
const CardBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2;
    transition: background 0.3s ease;
  }
`;

const CardWrapper = styled.div`
  width: 200px;
  height: 340px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 6px;
  margin: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;

  @media screen and (max-width: 480px) {
    width: 100px;
    height: 180px;
    padding: 0px;
    margin: 15px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 12px;
  }

  &:hover ${CardBackground}::after {
    background: none;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  text-align: center;

  @media screen and (max-width: 480px) {
    padding: 5px;
  }
`;

const CardInfoBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 251, 218, 0.95);
  padding: 10px;
  display: flex;
  justify-content: space-around;
  border-radius: 0 0 20px 20px;
  align-items: center;
  font-family: "Comic Sans MS", cursive;
  font-size: 14px;
  font-weight: bold;
  color: #153448;
  opacity: ${({ $showInfo }) => ($showInfo ? 1 : 0)};
  transform: ${({ $showInfo }) =>
    $showInfo ? "translateY(0)" : "translateY(100%)"};
  transition: transform 0.4s ease, opacity 0.4s ease;

  @media screen and (max-width: 480px) {
    font-size: 12px;
    padding: 5px;
  }
`;

const ReviewCount = styled.div`
  flex: 1;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;

const ViewCount = styled.div`
  flex: 1;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;

const Rating = styled.div`
  flex: 1;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;

const CardImg = styled.div`
  width: 110px;
  height: 110px;
  margin: 0 auto;
  border-radius: 100%;
  border: 3px solid white;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 480px) {
    width: 60px;
    height: 60px;
    border: 2px solid white;
  }
`;

const CardTitle = styled.h2`
  margin: 10px 0;
  color: white;
  font-size: ${({ $showInfo }) => ($showInfo ? "16px" : "20px")};
  font-family: "Uiyeun", sans-serif;
  text-align: center;
  transition: font-size 0.3s ease, color 0.3s ease;

  @media screen and (max-width: 480px) {
    font-size: ${({ $showInfo }) => ($showInfo ? "12px" : "16px")};
  }
`;

const CardHashTag = styled.div`
  color: white;
  font-size: 14px;
  font-family: "Uiyeun", sans-serif;
  text-align: center;

  @media screen and (max-width: 480px) {
    font-size: 10px;
  }
`;
