import React from "react";
import styled from "styled-components";

const Section = styled.section`
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-style: normal;
  padding-block: min(20vh, 6rem);
  text-align: center;
  width: calc(min(90rem, 90%));
  margin-inline: auto;
  position: relative;

  span,
  p,
  h2,
  h3 {
    letter-spacing: 0.035rem;
  }

  p {
    line-height: 1.6;
    color: #a3a3a3;
    max-width: 50rem;
    margin: 0 auto;
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

  span {
    text-transform: uppercase;
    display: block;
    font-size: 1.2rem;
    color: #a3a3a3;
  }

  h2 {
    font-size: clamp(3rem, 2.5rem + 1.6vw, 4rem);
    margin-top: -0.625rem;
    color: #fff;
  }

  .cards {
    margin-top: 7rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr));
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
        background: #f2709c;
        background: -webkit-linear-gradient(to left, #ff9472, #f2709c);
        background: linear-gradient(to left, #ff9472, #f2709c);
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
    background: #f2709c;
    background: -webkit-linear-gradient(to left, #ff9472, #f2709c);
    background: linear-gradient(to left, #ff9472, #f2709c);
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
      <span>meet our</span>
      <h2>Team</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi,
        praesentium veritatis voluptatibus ut consequuntur quas consequatur
        omnis id rem obcaecati.
      </p>
      <span className="bg-watermark">team</span>
      <CardsContainer className="cards">
        <Card className="card">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Franklin Carlson"
          />
          <div className="card-content">
            <h3>franklin carlson</h3>
            <p>UX Designer</p>
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
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Antonia Moore"
          />
          <div className="card-content">
            <h3>antonia moore</h3>
            <p>product designer</p>
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
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Travis Lynch"
          />
          <div className="card-content">
            <h3>travis lynch</h3>
            <p>web developer</p>
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
