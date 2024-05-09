import React from "react";
import styled from "styled-components";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
const Container= styled.div`
background: linear-gradient(#f0f0c3, #f0f0c3)



`
const BlogSliderWrapper = styled.div`
  border: 5px solid black;
  
  margin-left:25%;
  width: 50%;
  position: flex;
  background: #fff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 25px;
  border-radius: 25px;
  height: 400px;
  transition: all 0.3s;

  @media screen and (max-width: 992px) {
    max-width: 680px;
    height: 400px;
  }

  @media screen and (max-width: 768px) {
    min-height: 500px;
    height: auto;
    margin: 180px auto;
  }

  @media screen and (max-height: 500px) and (min-width: 992px) {
    height: 350px;
  }
`;

const BlogSliderItem = styled.div`

  display: flex;
  align-items: center;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  &.swiper-slide-active {
    .blog-slider__img {
      img {
        opacity: 1;
        transition-delay: 0.3s;
      }
    }
    .blog-slider__content > * {
      opacity: 1;
      transform: none;

      @for $i from 0 to 15 {
        &:nth-child(#{$i + 1}) {
          transition-delay: $i * 0.1 + 0.3s;
        }
      }
    }
  }
`;

const BlogSliderImg = styled.div`
  border: 5px solid black;  
  margin:100px;
  width: 300px;
  flex-shrink: 0;
  height: 300px;
  background-color:#8f8f7a;
  box-shadow: 4px 13px 30px 1px rgba(252, 56, 56, 0.2);
  border-radius: 20px;
  transform: translateX(-80px);
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
   
   
    background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
    border-radius: 20px;
    opacity: 0.8;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0;
    border-radius: 20px;
    transition: all 0.3s;
  }

  @media screen and (max-width: 992px) {
    // width: 45%;
  }
  @media screen and (max-width: 768px) {
    transform: translateY(-50%);
    width: 90%;
  }
  @media screen and (max-width: 576px) {
    width: 95%;
  }
  @media screen and (max-height: 500px) and (min-width: 992px) {
    height: 270px;
  }
`;

const BlogSliderContent = styled.div`
  padding-right: 25px;

  @media screen and (max-width: 992px) {
    // width: 55%;
  }
  @media screen and (max-width: 768px) {
    margin-top: -80px;
    text-align: center;
    padding: 0 30px;
  }

  @media screen and (max-width: 576px) {
    padding: 0;
  }
  > * {
    opacity: 0;
    transform: translateY(25px);
    transition: all 0.4s;
  }
`;

const BlogSliderCode = styled.span`
  color: #7b7992;
  margin-bottom: 15px;
  display: block;
  font-weight: 500;
`;

const BlogSliderTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0d0925;
  margin-bottom: 20px;
`;

const BlogSliderText = styled.div`
  color: #4e4a67;
  margin-bottom: 30px;
  line-height: 1.5em;
`;

const BlogSliderButton = styled.a`
  display: inline-flex;
  background-image: linear-gradient(147deg, #fe8a39 0%, #fd3838 74%);
  padding: 15px 35px;
  border-radius: 50px;
  color: #fff;
  box-shadow: 0px 14px 80px rgba(252, 56, 56, 0.4);
  text-decoration: none;
  font-weight: 500;
  justify-content: center;
  text-align: center;
  letter-spacing: 1px;

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

const BlogSliderPagination = styled.div`
  position: absolute;
  z-index: 21;
  right: 20px;
  width: 11px !important;
  text-align: center;
  left: auto !important;
  top: 50%;
  bottom: auto !important;
  transform: translateY(-50%);

  @media screen and (max-width: 768px) {
    transform: translateX(-50%);
    left: 50% !important;
    top: 205px;
    width: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 8px 0;

    @media screen and (max-width: 768px) {
      margin: 0 5px;
    }
  }

  .swiper-pagination-bullet {
    width: 11px;
    height: 11px;
    display: block;
    border-radius: 10px;
    background: #062744;
    opacity: 0.2;
    transition: all 0.3s;

    &-active {
      opacity: 1;
      background: #fd3838;
      height: 30px;
      box-shadow: 0px 0px 20px rgba(252, 56, 56, 0.3);

      @media screen and (max-width: 768px) {
        height: 11px;
        width: 30px;
      }
    }
  }
`;

class Main2 extends React.Component {
  componentDidMount() {
    this.swiper = new Swiper(".blog-slider", {
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      mousewheel: {
        invert: false,
      },
      pagination: {
        el: ".blog-slider__pagination",
        clickable: true,
      },
    });
  }

  render() {
    return (
      <Container>
      <BlogSliderWrapper className="blog-slider">
        <div className="blog-slider__wrp swiper-wrapper">
          <BlogSliderItem className="blog-slider__item swiper-slide">
            <BlogSliderImg className="blog-slider__img">
              <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp" alt="" />
            </BlogSliderImg>
            <BlogSliderContent className="blog-slider__content">
              <BlogSliderCode className="blog-slider__code">26 December 2019</BlogSliderCode>
              <BlogSliderTitle className="blog-slider__title">Lorem Ipsum Dolor</BlogSliderTitle>
              <BlogSliderText className="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</BlogSliderText>
              <BlogSliderButton href="#" className="blog-slider__button">READ MORE</BlogSliderButton>
            </BlogSliderContent>
          </BlogSliderItem>
          <BlogSliderItem className="blog-slider__item swiper-slide">
            <BlogSliderImg className="blog-slider__img">
              <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp" alt="" />
            </BlogSliderImg>
            <BlogSliderContent className="blog-slider__content">
              <BlogSliderCode className="blog-slider__code">26 December 2019</BlogSliderCode>
              <BlogSliderTitle className="blog-slider__title">Lorem Ipsum Dolor2</BlogSliderTitle>
              <BlogSliderText className="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</BlogSliderText>
              <BlogSliderButton href="#" className="blog-slider__button">READ MORE</BlogSliderButton>
            </BlogSliderContent>
          </BlogSliderItem>
          <BlogSliderItem className="blog-slider__item swiper-slide">
            <BlogSliderImg className="blog-slider__img">
              <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp" alt="" />
            </BlogSliderImg>
            <BlogSliderContent className="blog-slider__content">
              <BlogSliderCode className="blog-slider__code">26 December 2019</BlogSliderCode>
              <BlogSliderTitle className="blog-slider__title">Lorem Ipsum Dolor</BlogSliderTitle>
              <BlogSliderText className="blog-slider__text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae voluptate repellendus magni illo ea animi?</BlogSliderText>
              <BlogSliderButton href="#" className="blog-slider__button">READ MORE</BlogSliderButton>
            </BlogSliderContent>
          </BlogSliderItem>
        </div>
        <BlogSliderPagination className="blog-slider__pagination"></BlogSliderPagination>
      </BlogSliderWrapper>
      </Container>
    );
  }
}

export default Main2;
