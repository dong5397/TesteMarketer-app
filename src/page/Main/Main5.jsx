import React from "react";
import styled, { css } from "styled-components";

const Section = styled.section`
  min-height: 100vh;
  background-color: #1f2937;
  color: #ffffff;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .text-gray {
    color: #718096;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .grid-offer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const Card = styled.div`
  position: relative;
  background-color: #4f46e5;
  padding: 2rem;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0.063rem 0.063rem 1.25rem 0.375rem rgba(0, 0, 0, 0.53);
  }

  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    transition: clip-path 0.6s;
    background-color: #4f46e5;
    z-index: -1;
  }

  p {
    transition: color 0.8s;
  }

  &:hover::before {
    clip-path: circle(110vw at 100% 100%);
  }
`;

const Circle = styled.div`
  @media screen and (min-width: 62.5rem) {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  ${({ position }) =>
    position === "bottom-right" &&
    css`
      background: url("https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
        no-repeat 50% 50% / cover;
      bottom: 0;
      right: 0;
      clip-path: circle(calc(6.25rem + 7.5vw) at 100% 100%);
    `}

  ${({ position }) =>
    position === "bottom-left" &&
    css`
      background: url("https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
        no-repeat 50% 50% / cover;
      bottom: 0;
      left: 0;
      clip-path: circle(calc(6.25rem + 7.5vw) at 0% 100%);
    `}

  ${({ position }) =>
    position === "top-right" &&
    css`
      background: url("https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
        no-repeat 50% 50% / cover;
      top: 0;
      right: 0;
      clip-path: circle(calc(6.25rem + 7.5vw) at 100% 0%);
    `}

  ${({ position }) =>
    position === "top-left" &&
    css`
      background: url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
        no-repeat 50% 50% / cover;
      top: 0;
      left: 0;
      clip-path: circle(calc(6.25rem + 7.5vw) at 0% 0%);
    `}
`;

const StyledSVG = styled.svg`
  fill: none;
  stroke-width: 1.5px;
  stroke: #818cf8;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.75rem;
`;

const Services = () => {
  return (
    <Section>
      <span className="text-gray text-lg max-w-lg mx-auto mb-2 capitalize flex items-center">
        what we're offering
        <StyledSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </StyledSVG>
      </span>
      <h1>Services Built Specifically for your Business</h1>
      <div className="grid-offer">
        <Card>
          <Circle position="bottom-right" />
          <div className="relative lg:pr-52">
            <h2>uI/uX creative design</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames.
            </p>
          </div>
        </Card>
        <Card>
          <Circle position="bottom-left" />
          <div className="relative lg:pl-48">
            <h2>visual graphic design</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames.
            </p>
          </div>
        </Card>
        <Card>
          <Circle position="top-right" />
          <div className="relative lg:pr-44">
            <h2>strategy & digital marketing</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames.
            </p>
          </div>
        </Card>
        <Card>
          <Circle position="top-left" />
          <div className="relative lg:pl-48">
            <h2>effective business growth</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default Services;
