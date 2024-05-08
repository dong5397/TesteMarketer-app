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
            <H3>당신의 입맛을 먼저 듣는 맛집</H3>
            <P>맛케터</P>
          </Introduction>
        </ContentWrapper>
        <Div />
        <DashboardGrid>
          <DashboardItem>
            <DashboardText>
              <H3>음식 추천 시스템</H3>
              <P>
                맛케터는 사용자의 맛 프로파일과 구매 이력을 기반으로 <br />
                맛있는 음식 및 음식 관련 상품을 추천합니다. <br />
                이를 통해 사용자들은 자신에게 맞는 맛있는 상품을 발견하고 <br />
                구매할 수 있습니다.
              </P>
            </DashboardText>
          </DashboardItem>
          <DashboardItem>
            <DashboardText>
              <H3>맛 프로파일링</H3>
              <P>
                맛케터는 사용자의 개인 맛 프로파일을 작성하여 <br />
                선호하는 맛과 음식 스타일을 파악합니다. <br />
                이를 토대로 맞춤형 맛집 추천을 제공하고, <br />
                사용자들은 자신의 취향에 맞는 맛있는 음식을 <br />
                더욱 쉽게 찾을 수 있습니다
              </P>
            </DashboardText>
          </DashboardItem>
          <DashboardItem>
            <DashboardText>
              <H3>사용자 커뮤니티</H3>
              <P>
                "맛케터 커뮤니티에서는 맛있는 음식에 대한 이야기를 나누고,
                <br />
                다양한 리뷰와 팁을 공유할 수 있어요. <br />
                함께 맛집을 발견하고 소통해보세요!"
              </P>
            </DashboardText>
          </DashboardItem>
          <DashboardItem>
            <DashboardText>
              <H3>리뷰 신뢰도 스코어링</H3>
              <P>
                맛케터는 사용자들이 작성한 리뷰를 자동으로 분석하여
                <br /> 신뢰도 스코어를 부여합니다. <br />이 스코어는 사용자의
                이전 리뷰 작성 이력, <br />
                리뷰 내용의 일관성 및 정확성 등을 고려하여 산출됩니다. <br />
                이를 통해 다른 사용자들은 신뢰할 수 있는 리뷰를
                <br /> 쉽게 구별하고, 더 나은 음식점 선택을 할 수 있습니다.
              </P>
            </DashboardText>
          </DashboardItem>
        </DashboardGrid>
        <Div />
      </div>
    </>
  );
}

export default Main2;

const H3 = styled.div`
  font-size: 40px;
  color: black;
  font-weight: bold;
  text-align: center;
`;
const P = styled.div`
  font-size: 25px;
  color: black;
  margin: 50px;
  font-weight: 500;
  text-align: center;
`;

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
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 10px;
  border: 5px solid;
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
  width: 35%;
  border: 5px solid;
  padding: 100px;
  text-align: center;
  border-radius: 30px;
  margin: 20px;
  background-color: #f0f0f0;
`;

/* 여기는 대시보드 */
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 30px));
  grid-template-rows: repeat(2, 1fr);
  gap: 60px; /* 간격을 조정합니다. */
  padding: 20px; /* 패딩을 조정합니다. */
  background-color: #f0f0f0;
  border: 5px solid;
  margin: auto; /* 부모 요소에 대해 가운데 정렬 */
  text-align: center; /* 그리드 내의 요소들을 가운데 정렬 */
`;

const DashboardItem = styled.div`
  background: linear-gradient(#f0f0c3, #f0f0c3);
  padding: 10px; /* 내부 패딩을 조정합니다. */
  display: flex;
  align-items: center;
  flex-direction: column; /* 세로로 정렬합니다. */
  border: 5px solid;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

const DashboardText = styled.p`
  margin-top: 40px; /* 이미지와 텍스트 사이의 간격을 조정합니다. */
`;
