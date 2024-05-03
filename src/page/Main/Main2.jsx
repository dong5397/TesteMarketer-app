import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const ImgSliderWrapp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: column;
`;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 75vh;
`;

const ImgAfterWrap = styled.div`
  position: absolute;
  height: 75vh;
  width: 100vw;
  transition: all 0.15s;
`;

const ImgBeforeWrap = styled.div`
  position: absolute;
  height: 75vh;
  width: 50vw;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100vw;
  height: 100%;
  object-fit: cover;
`;

const SliderIndicator = styled.div`
  position: absolute;
  width: 5px;
  height: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: #1b2c34;
  z-index: 30;
  pointer-events: none;
  transition: all 0.15s;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  animation: fadeInUp 1.5s forwards 0.5s;
  z-index: 5;
  pointer-events: none;

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translate(-50%, -60%);
    }
  }
`;

const H1 = styled.h1`
  font-size: 2.8em;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 700;
  pointer-events: none;
  z-index: 40;
`;

const HeroBtn = styled.button`
  padding: 15px 30px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid #fff;
  color: #fff;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  outline: none;
  letter-spacing: 1px;
  text-transform: uppercase;
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 376px) {
    font-size: 0.9em;
    bottom: 10%;
  }

  @media screen and (max-width: 541px) {
    font-size: 1.1em;
    bottom: 15%;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.1em;
    bottom: 18%;
  }
`;

const Main2 = () => {
  const sliderRef = useRef(null);
  const beforeRef = useRef(null);
  const containerRef = useRef(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeSlider = () => {
      if (!initialized) {
        const containerWidth = containerRef.current.offsetWidth;
        const width = containerWidth / 2;
        beforeRef.current.style.width = `${width}px`;
        sliderRef.current.style.left = `${width}px`;
        setInitialized(true);
      }
    };

    initializeSlider();
    window.addEventListener("resize", initializeSlider);
    return () => window.removeEventListener("resize", initializeSlider);
  }, [initialized]);

  const dragTheImg = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const containerRect = containerRef.current.getBoundingClientRect();
    const sliderPosition = clientX - containerRect.left;
    const width = Math.max(0, Math.min(sliderPosition, containerRect.width));

    beforeRef.current.style.width = `${width}px`;
    sliderRef.current.style.left = `${width}px`;
  };

  return (
    <ImgSliderWrapp>
      <Container
        ref={containerRef}
        onMouseMove={dragTheImg}
        onTouchMove={dragTheImg}
      >
        <ImgAfterWrap>
          <Image
            src="https://images.unsplash.com/photo-1710362921917-2e33bb342a23?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTIzNjg0MTN8&ixlib=rb-4.0.3&q=85"
            alt="After"
          />
        </ImgAfterWrap>
        <ImgBeforeWrap ref={beforeRef}>
          <Image
            src="https://images.unsplash.com/photo-1706820642455-12b6d3ea4a66?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTIzNjgzMDB8&ixlib=rb-4.0.3&q=85"
            alt="Before"
          />
        </ImgBeforeWrap>
        <SliderIndicator ref={sliderRef}></SliderIndicator>
      </Container>
      <HeroContent>
        <H1>Your Title Here</H1>
        <HeroBtn>Learn More</HeroBtn>
      </HeroContent>
    </ImgSliderWrapp>
  );
};

export default Main2;
