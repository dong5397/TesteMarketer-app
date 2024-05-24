import React from "react";
import styled from "styled-components";
import KimDongWok from "/images/team/KimDongWok.jpg";
import BackMinKi from "/images/team/BackMinKi.jpg";
import NaJiMin from "/images/team/NaJiMin.jpg";

const P = styled.div`
  font-size: 30px;

  font-family: "GowunDodum-Regular";
`;
const H2 = styled.div`
  font-size: 80px;
  font-weight: bold;
  font-family: "GowunDodum-Regular";
`;
const Section = styled.section`
  background: linear-gradient(#f0f0c3, #e7e7c9);
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-style: normal;
  text-align: center;
  position: relative;
  padding-top: 50px;

  p,
  h2,
  h3 {
    letter-spacing: 0.035rem;
  }

  p {
    line-height: 1.6;
    color: #a3a3a3;
    max-width: 50rem;
    margin: auto;
    font-size: clamp(0.9rem, 0.825rem + 0.3vw, 1.2rem);
  }

  .bg-watermark {
    color: #1f1f1f;
    font-size: clamp(4rem, 1.3333rem + 7.9333vw, 10rem);
    font-weight: 800;
    position: absolute;
    z-index: -1;
    left: 50%;
    transform: translateX(-50%) translateY(-15%);
    user-select: none;
    letter-spacing: 0.5rem;
  }

  h2 {
    font-size: clamp(3rem, 2.5rem + 1.6vw, 4rem);
    margin-top: 50px;
    color: black;
  }

  .cards {
    margin-top: 7rem;
    display: grid;

    grid-template-columns: repeat(
      auto-fit,
      minmax(15rem, 1fr)
    ); /* 변경된 부분 */
    gap: 2rem;
    justify-content: center;

    @media screen and (min-width: 51rem) {
      gap: 0;
      padding-bottom: 2.5rem;
    }

    .card {
      position: relative;

      cursor: pointer;
      width: 100%;
      max-width: 20rem;
      margin: auto;

      h3,
      p {
        text-transform: capitalize;
      }

      h3 {
        font-size: clamp(1rem, 1rem + 0.2667vw, 1.25rem);
        font-weight: 400;
        color: #f6f6f6;
      }

      p {
        font-size: clamp(0.85rem, 0.75rem + 0.32vw, 1rem);
        letter-spacing: 0.12rem;
        font-weight: 300;
        max-width: 100%;
      }

      &::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        z-index: 0;
        transition: 0.3s ease-in-out;
        background: #000000;
        background: -webkit-linear-gradient(to left, #000000, #000000);
        background: linear-gradient(to left, #a59c66, #000000);
        top: -0.375rem;
        left: -0.375rem;
      }

      &::after {
        position: absolute;
        inset: 0;
        content: "";
        width: 100%;
        height: 100%;
        background: #232526;
        background: -webkit-linear-gradient(
          to bottom,
          hsl(210deg 2.99% 26.27% / 20%),
          hsl(0deg 0% 3.14% / 90%)
        );
        background: linear-gradient(
          to bottom,
          hsl(210deg 2.99% 26.27% / 20%),
          hsl(0deg 0% 3.14% / 90%)
        );
      }

      img {
        filter: grayscale(100%);
        transition: 0.5s ease;
        width: 100%;
        max-width: 100%;
        height: auto;
      }

      &-content {
        position: absolute;
        bottom: 0;
        z-index: 99;
        left: 0;
        color: #fff;
        width: 100%;
        padding: 1.875rem 1.25rem;
        text-align: center;

        ul {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          margin-top: 1.25rem;
        }
      }

      &:hover img {
        filter: grayscale(0%);
      }

      &:hover::before {
        transform: scale(1.03);
      }
    }
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 2rem;
  margin-top: 2rem;

  @media screen and (min-width: 51rem) {
    gap: 0;
    padding-bottom: 2.5rem;
  }
`;

const Card = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  max-width: 20rem;

  h3,
  p {
    text-transform: capitalize;
  }

  h3 {
    font-size: clamp(1rem, 0.9167rem + 0.2667vw, 1.25rem);
    font-weight: 400;
    color: #f6f6f6;
  }

  p {
    font-size: clamp(0.85rem, 0.75rem + 0.32vw, 1.15rem);
    letter-spacing: 0.12rem;
    font-weight: 300;
    max-width: 100%;
  }

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    z-index: 0;
    transition: 0.3s ease-in-out;
    background: #000000;
    background: -webkit-linear-gradient(to left, #000000, #000000);
    background: linear-gradient(to left, #000000, #000000);
    top: -0.375rem;
    left: -0.375rem;
  }

  &::after {
    position: absolute;
    inset: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: #232526;
    background: -webkit-linear-gradient(
      to bottom,
      hsl(210deg 2.99% 26.27% / 20%),
      hsl(0deg 0% 3.14% / 90%)
    );
    background: linear-gradient(
      to bottom,
      hsl(210deg 2.99% 26.27% / 20%),
      hsl(0deg 0% 3.14% / 90%)
    );
  }

  img {
    filter: grayscale(100%);
    transition: 0.5s ease;
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  &-content {
    position: absolute;
    bottom: 0;
    z-index: 99;
    left: 0;
    color: #fff;
    width: 100%;
    padding: 1.875rem 1.25rem;
    text-align: center;

    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.625rem;
      margin-top: 1.25rem;
    }
  }

  &:hover img {
    filter: grayscale(0%);
  }

  &:hover::before {
    transform: scale(1.03);
  }
`;

const Main4 = () => {
  return (
    <Section>
      <H2>Team</H2>
      <P>맛케터는 음식추천 웹사이트입니다.</P>
      <P>
        언제 어디서나 다양한 디바이스를 통해 접근하고 맛집을 탐색할 수 있습니다.
      </P>
      <P>
        원하는 맛을 선택할 수 있는 기능이 제공되고 사용자에게 선택지가
        주어집니다.
      </P>
      <P> 사용자간의 소통이 이루어지기 위한 커뮤니티가 제공됩니다.</P>
      <span className="bg-watermark">team</span>
      <CardsContainer className="cards">
        <Card className="card">
          <img src={KimDongWok} alt="Franklin Carlson" />
          <div className="card-content">
            <h3>KimDongWok</h3>
            <p>1951004</p>
            <ul>
              <li>
                <a href="#">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </Card>
        <Card className="card">
          <img src={BackMinKi} alt="Antonia Moore" />
          <div className="card-content">
            <h3>BackMinKi</h3>
            <p>19526</p>
            <ul>
              <li>
                <a href="#">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </Card>
        <Card className="card">
          <img src={NaJiMin} alt="Travis Lynch" />
          <div className="card-content">
            <h3>NaJiMin</h3>
            <p>19519</p>
            <ul>
              <li>
                <a href="#">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </Card>
      </CardsContainer>
    </Section>
  );
};

export default Main4;
