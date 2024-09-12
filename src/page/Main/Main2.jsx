import React from "react";
import styled from "styled-components";

const Div = styled.div`
  height: 200px;
  display: flex;
  background: linear-gradient(#f0f0c3, #f0f0c3);
`;
const SliderContainer = styled.div`
  height: 800px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: linear-gradient(#f0f0c3, #f0f0c3);
`;

const NavInput = styled.input`
  width: 12px;
  height: 12px;
  margin: 2rem 12px;
  border-radius: 50%;
  z-index: 10;
  outline: 6px solid #ccc;
  outline-offset: -6px;
  box-shadow: 0 0 0 0 #333, 0 0 0 0 rgba(51, 51, 51, 0);
  cursor: pointer;
  appearance: none;
  backface-visibility: hidden;

  &:checked {
    animation: check 0.4s linear forwards;
  }

  &:nth-of-type(1):checked ~ .slider__inner {
    left: 0%;
  }

  &:nth-of-type(2):checked ~ .slider__inner {
    left: -100%;
  }

  &:nth-of-type(3):checked ~ .slider__inner {
    left: -200%;
  }

  &:nth-of-type(4):checked ~ .slider__inner {
    left: -300%;
  }
`;

const InnerSlider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 400%;
  height: 100%;
  transition: left 0.4s;
  display: flex;
`;

const SliderContents = styled.div`
  height: 100%;
  padding: 2rem;
  text-align: center;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.i`
  font-size: 2.7rem;
  color: #2196f3;
`;

const Caption = styled.h2`
  font-weight: 500;
  margin: 2rem 0 1rem;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  font-family: "GowunDodum-Regular";
  font-size: 70px;
  @media screen and (max-width: 481px) {
    font-size: 50px;
  }
`;

const Text = styled.p`
  color: #999;
  margin-bottom: 3rem;
  margin-top: 200px;
  text-align: center;
  font-size: 50px;
  font-family: "GowunDodum-Regular";
  @media screen and (max-width: 481px) {
    font-size: 30px;
  }
`;

const Keyframes = styled.div`
  @keyframes check {
    50% {
      outline-color: #333;
      box-shadow: 0 0 0 12px #333, 0 0 0 36px rgba(51, 51, 51, 0.2);
    }
    100% {
      outline-color: #333;
      box-shadow: 0 0 0 0 #333, 0 0 0 0 rgba(51, 51, 51, 0);
    }
  }
`;

const Main2 = () => {
  return (
    <div>
      <Div />
      <SliderContainer className="slider">
        <NavInput
          type="radio"
          name="slider"
          title="slide1"
          defaultChecked
          className="slider__nav"
        />
        <NavInput
          type="radio"
          name="slider"
          title="slide2"
          className="slider__nav"
        />
        <NavInput
          type="radio"
          name="slider"
          title="slide3"
          className="slider__nav"
        />
        <NavInput
          type="radio"
          name="slider"
          title="slide4"
          className="slider__nav"
        />
        <InnerSlider className="slider__inner">
          <SliderContents className="slider__contents">
            <Image className="slider__image fa fa-codepen"></Image>
            <Caption className="slider__caption">"음식 추천 시스템"</Caption>
            <Text className="slider__txt">
              맛케터는 사용자의 맛 프로파일과 구매 이력을 기반으로 맛있는 음식
              및 음식 관련 상품을 추천합니다.
            </Text>
          </SliderContents>
          <SliderContents className="slider__contents">
            <Image className="slider__image fa fa-newspaper-o"></Image>
            <Caption className="slider__caption">"맛 프로파일링" </Caption>
            <Text className="slider__txt">
              맛케터는 사용자의 개인 맛 프로파일을 작성하여 선호하는 맛과 음식
              스타일을 파악합니다.
            </Text>
          </SliderContents>
          <SliderContents className="slider__contents">
            <Image className="slider__image fa fa-television"></Image>
            <Caption className="slider__caption">"사용자 커뮤니티"</Caption>
            <Text className="slider__txt">
              맛케터 커뮤니티에서는 맛있는 음식에 대한 이야기를 나누고, 다양한
              리뷰와 팁을 공유할 수 있어요.
            </Text>
          </SliderContents>
          <SliderContents className="slider__contents">
            <Image className="slider__image fa fa-diamond"></Image>
            <Caption className="slider__caption">
              "리뷰 신뢰도 스코어링"
            </Caption>
            <Text className="slider__txt">
              맛케터는 사용자들이 작성한 리뷰를 자동으로 분석하여 신뢰도
              스코어를 부여합니다.
            </Text>
          </SliderContents>
        </InnerSlider>
        <Keyframes></Keyframes>
      </SliderContainer>
      <Div />
    </div>
  );
};

export default Main2;
