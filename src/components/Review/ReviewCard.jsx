import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const CardWrapper = styled.div`
  width: 250px;
  height: 250px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  flex: 1;
  margin: 0 10px; /* 좌우 여백 추가 */
  display: flex;
  align-items: flex-start;
  flex-direction: column-reverse;
  transition: transform 0.3s ease-in-out;
  position: relative;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    background: linear-gradient(#f0f0c3, #e7e7c9);
  }
`;

const CardInfoBox = styled.div`
  position: absolute;
  bottom: 5%;
  left: 0;
  width: 100%;
  background-color: #fffbda;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  border-radius: 50px;
  align-items: center;
  font-family: "Comic Sans MS", cursive;
  font-size: 16px;
  font-weight: bold;
  color: #153448;
  z-index: 100;
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: translateY(70px);
    opacity: 1;
  }
`;

const ReviewCount = styled.div`
  flex: 1;
  text-align: center;
`;

const ViewCount = styled.div`
  flex: 1;
  text-align: center;
`;

const Rating = styled.div`
  flex: 1;
  text-align: center;
`;

const CardImg = styled.div`
  width: 110px;

  margin: 0 auto;
  border-radius: 100%;
  border: 3px solid black;
  position: relative;
  flex: 1;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const CardTitle = styled.h2`
  margin-bottom: 10px;
  color: black;
  font-size: ${({ showInfo }) => (showInfo ? "24px" : "32px")};
  font-family: "Uiyeun", sans-serif;
`;

const CardHashTag = styled.div`
  color: black;
  font-size: ${({ showInfo }) => (showInfo ? "18px" : "24px")};
  font-family: "Uiyeun", sans-serif;
`;

const ReviewCard = ({ restaurant }) => {
  const { id, name, image, rating, opening_hours } = restaurant;

  const navigate = useNavigate();

  const [showCardInfo, setShowCardInfo] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    reviewCount: 0,
    viewCount: 0,
    rating: 0,
  });

  const handleDetailPost = (restaurant) => {
    console.log(restaurant);
    navigate(`/review/${id}`, {
      state: {
        id: `${id}`,
        name: `${name}`,
        opening_hours: `${opening_hours}`,
        rating: `${rating}`,
        image: `${image}`,
      },
    });
  };

  return (
    <CardWrapper
      onClick={() => handleDetailPost({ restaurant })}
      onMouseEnter={() => setShowCardInfo(true)}
      onMouseLeave={() => setShowCardInfo(false)}
    >
      {showCardInfo && (
        <CardInfoBox>
          <ReviewCount>리뷰 {cardInfo.reviewCount}개</ReviewCount>
          <ViewCount>조회 {cardInfo.viewCount}회</ViewCount>
          <Rating>
            {" "}
            <FontAwesomeIcon
              icon={solidStar}
              flip="horizontal"
              size="2x"
              style={{ color: "#FFD43B" }}
            />{" "}
            {restaurant.rating}
          </Rating>
        </CardInfoBox>
      )}

      <CardTitle showInfo={showCardInfo}>
        <CardTitle showInfo={showCardInfo}>
          {showCardInfo ? "클릭하여 리뷰보기" : restaurant.name}
        </CardTitle>
      </CardTitle>
      <CardHashTag showInfo={showCardInfo}>
        {showCardInfo ? "" : `#${restaurant.menus.join(" #")}`}
      </CardHashTag>
      <CardImg
        backgroundImage={
          showCardInfo ? "../../images/review/click.gif" : restaurant.image
        }
      />
    </CardWrapper>
  );
};

export default ReviewCard;
