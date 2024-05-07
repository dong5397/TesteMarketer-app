import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../../images/5/1.jpg";
import img2 from "../../../images/5/2.jpg";
import img3 from "../../../images/5/3.jpg";
import img4 from "../../../images/5/4.jpg";
import img5 from "../../../images/5/5.jpg";

import img8 from "../../../images/5/8.jpg";
import img9 from "../../../images/5/9.jpg";
import img10 from "../../../images/5/10.jpg";
import img11 from "../../../images/5/11.jpg";

function Main2() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div>
        <Div />
        <ContentWrapper>
          <StyledSlider>
            <Slider {...settings}>
              <Slide>
                <Image src={img1} alt="Slide 1" />
              </Slide>
              <Slide>
                <Image src={img2} alt="Slide 2" />
              </Slide>
              <Slide>
                <Image src={img3} alt="Slide 3" />
              </Slide>
              <Slide>
                <Image src={img4} alt="Slide 4" />
              </Slide>
              <Slide>
                <Image src={img5} alt="Slide 5" />
              </Slide>
            </Slider>
          </StyledSlider>
          <Introduction>
            <h2>당신의 입맛을 먼저 듣는 맛집</h2>
            <h1>맛케터</h1>
          </Introduction>
        </ContentWrapper>
        <Div />
        <DashboardGrid>
          <DashboardItem>
            <DashboardImage src={img8} alt="이미지 8" />
            <DashboardText>
              <h3>음식 추천 시스템</h3>
              맛케터는 사용자의 맛 프로파일과 구매 이력을 기반으로 맛있는 음식
              및 음식 관련 상품을 추천합니다. 이를 통해 사용자들은 자신에게 맞는
              맛있는 상품을 발견하고 구매할 수 있습니다.
            </DashboardText>
          </DashboardItem>
          <DashboardItem>
            <DashboardImage src={img9} alt="이미지 9" />
            <DashboardText>
              <h3>맛 프로파일링</h3>
              맛케터는 사용자의 개인 맛 프로파일을 작성하여 선호하는 맛과 음식
              스타일을 파악합니다. 이를 토대로 맞춤형 맛집 추천을 제공하고,
              사용자들은 자신의 취향에 맞는 맛있는 음식을 더욱 쉽게 찾을 수
              있습니다
            </DashboardText>
          </DashboardItem>
          <DashboardItem>
            <DashboardImage src={img10} alt="이미지 10" />
            <DashboardText>
              <h3>사용자 커뮤니티</h3>
              "맛케터 커뮤니티에서는 맛있는 음식에 대한 이야기를 나누고, 다양한
              리뷰와 팁을 공유할 수 있어요. 함께 맛집을 발견하고 소통해보세요!"
            </DashboardText>
          </DashboardItem>
          <DashboardItem>
            <DashboardImage src={img11} alt="이미지 11" />
            <DashboardText>
              <h3>리뷰 신뢰도 스코어링</h3>
              맛케터는 사용자들이 작성한 리뷰를 자동으로 분석하여 신뢰도
              스코어를 부여합니다. 이 스코어는 사용자의 이전 리뷰 작성 이력,
              리뷰 내용의 일관성 및 정확성 등을 고려하여 산출됩니다. 이를 통해
              다른 사용자들은 신뢰할 수 있는 리뷰를 쉽게 구별하고, 더 나은
              음식점 선택을 할 수 있습니다.
            </DashboardText>
          </DashboardItem>
        </DashboardGrid>
        <Div />
      </div>
    </>
  );
}

export default Main2;

const Div = styled.div`
  display: flex;
  background: linear-gradient(#f0f0c3, #f0f0c3);
  padding: 100px; /* 원하는 패딩 값으로 설정하세요 */
`;
const StyledSlider = styled.div`
  width: 70%;
  float: left;
  height: auto;
  overflow: hidden;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  background: linear-gradient(#f0f0c3, #f0f0c3);
  height: 500px;
`;

const Slide = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;

const Introduction = styled.div`
  width: 30%;
  padding: 50px;
`;

/* 여기는 대시보드 */
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 40px));
  grid-template-rows: repeat(2, 1fr);
  gap: 40px; /* 간격을 조정합니다. */
  padding: 20px; /* 패딩을 조정합니다. */
  background-color: #f0f0f0;
`;

const DashboardItem = styled.div`
  background: linear-gradient(#f0f0c3, #f0f0c3);
  padding: 10px; /* 내부 패딩을 조정합니다. */
  display: flex;
  align-items: center;
  flex-direction: column; /* 세로로 정렬합니다. */
`;

const DashboardImage = styled.img`
  max-width: 35%; /* 이미지의 최대 너비를 조정합니다. */
  height: auto;
`;

const DashboardText = styled.p`
  margin-top: 40px; /* 이미지와 텍스트 사이의 간격을 조정합니다. */
`;
