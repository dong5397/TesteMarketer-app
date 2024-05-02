import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Main2Container = styled.div`
  position: relative;
  width: 100vw;
  height: 75vh;
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
    <Main2Container>
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
    </Main2Container>
  );
};

export default Main2;
