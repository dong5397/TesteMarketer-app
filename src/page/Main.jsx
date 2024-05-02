import React from "react";
import styled from "styled-components";

const HomeHeader = styled.div`
  display: flex;
  width: 1170px;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 40px;
  margin: 0 auto;
`;

const Intro = styled.div`
  color: white;
  width: 350px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 40px;
  margin: 0 auto;
`;

const Header = styled.div``;

const H1 = styled.h1`
  font-size: 3.4rem;
  line-height: 1.2;
  margin-bottom: 0.3rem;
`;

const H2 = styled.h2`
  font-weight: 300;
`;

const Ul = styled.ul`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  padding: 1.2rem;
  list-style-type: none;
`;

const Li = styled.li`
  font-size: 1.2rem;
  margin: 1.2rem 0;
  color: black;
  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Trustpilot = styled.div`
  background: white;
  border-radius: 6px;
  padding: 0.8rem;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 400;
`;

const Panels = styled.div`
  width: 780px;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  max-width: 780px;
  margin: 0 auto;
  position: relative; /* 추가된 부분 */

  .table {
    width: 200px;
    height: 200px;
    top: 100px;
    left: 75px;
    z-index: 2;
    margin-right: -300px;
    animation-name: table-move;
    animation-delay: 0.5s;
    animation-duration: 1s;
  }

  .plate {
    width: 100px;
    height: 100px;
    top: 90px;
    left: 120px;
    z-index: 2;
    animation-name: plate-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }
  .meat {
    width: 100px;
    height: 100px;
    top: 90px;
    left: 130px;
    z-index: 3;
    animation-name: meat-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }
  .chair {
    width: 200px;
    height: 150px;
    top: 140px;
    left: 0px;
    z-index: 1;
    animation-name: teste2-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }
  .steward {
    width: 150px;
    height: 280px;
    top: 50px;
    left: 200px;
    z-index: 4;
    animation-name: steward-move;
    animation-delay: 0.2s;
    animation-duration: 3s;
  }

  .review {
    width: 200px;
    height: 200px;
    top: 70px;
    left: 80px;
    z-index: 1;
    animation-name: review-move;
    animation-delay: 0.2s;
    animation-duration: 1s;
  }
  .review2 {
    width: 150px;
    height: 150px;
    top: 100px;
    left: 200px;
    z-index: 3;
    animation-name: review2-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }
  .review3 {
    width: 150px;
    height: 150px;
    top: 100px;
    left: 200px;
    z-index: 2;
    animation-name: review2-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }

  .computer {
    width: 200px;
    height: 150px;
    top: 20px;
    left: 80px;
    z-index: 3;
    animation-name: computer-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }
  .computertable {
    width: 200px;
    height: 150px;
    top: 120px;
    left: 80px;
    animation-name: computertable-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }
  .teste1 {
    width: 200px;
    height: 150px;
    top: 80px;
    left: 120px;
    animation-name: teste1-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }
  .teste2 {
    width: 200px;
    height: 150px;
    top: 40px;
    left: 120px;
    animation-name: teste2-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }
  .teste3 {
    width: 100px;
    height: 100px;
    top: 130px;
    left: 30px;
    animation-name: teste2-move;
    animation-delay: 0.2s;
    animation-duration: 2s;
  }
`;

const A = styled.a`
  display: block;
  position: relative;
  height: 340px;
  width: 50%;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease-in-out;
  outline: 1px solid transparent;
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
  perspective: 1000;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 20px;
    left: 0;
    bottom: 20px;
    right: 0;
    background: #f7cb46;
    border-radius: 6px;
  }
`;

const Inner = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 20px;
  right: 0;
  overflow: hidden;
  border-radius: 6px;
`;

const Link = styled.span`
  opacity: 0;
  display: block;
  position: absolute;
  background: white;
  color: #2b2b2b;
  padding: 6px 0;
  border-radius: 6px;
  text-align: center;
  font-size: 1.4rem;
  bottom: 0;
  left: 70px;
  right: 70px;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-name: home-link-move;
  transition: bottom 0.2s ease-out 100ms;
  z-index: 10;

  &:before {
    content: "";
    position: absolute;
    right: 9px;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 9px solid rgba(0, 0, 0, 0.25);
  }

  @keyframes table-move {
    0% {
      margin-right: -300px;
      opacity: 1;
    }
    100% {
      margin-right: 0;
      opacity: 1;
    }
  }

  @keyframes table-move {
    0% {
      margin-right: -300px;
      opacity: 1;
    }
    100% {
      margin-right: 0;
      opacity: 1;
    }
  }

  @keyframes meat-move {
    0% {
      transform: translateY(-300px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes chair-move {
    0% {
      transform: translateX(-300px);
      opacity: 1;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes steward-move {
    0% {
      transform: translateX(-300px);
      opacity: 1;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes review-move {
    0% {
      opacity: 1;
      transform: translateX(-250px);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes review2-move {
    0% {
      opacity: 1;
      transform: translateY(-250px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes review3-move {
    0% {
      opacity: 1;
      transform: translateX(-300px);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes computer-move {
    0% {
      opacity: 1;
      transform: translateY(-300px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes computertable-move {
    0% {
      opacity: 1;
      transform: translateX(-300px);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes teste1-move {
    0% {
      opacity: 1;
      transform: translateX(-250px);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes teste2-move {
    0% {
      opacity: 1;
      transform: translateY(-250px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes teste3-move {
    0% {
      opacity: 1;
      transform: translateX(-350px);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Img = styled.img`
  position: absolute;
  opacity: 0;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;

const Main = () => {
  return (
    <div>
      <HomeHeader>
        <Intro>
          <Header>
            <H1>Maketer</H1>
            <H2>대전 전체의 맛집을 찾아줍니다</H2>
          </Header>
          <Ul>
            <Li>우리집 주변 맛집은 뭐지?</Li>
            <Li>오늘 뭐먹지?</Li>
          </Ul>
          <Trustpilot>- 맛케터 - </Trustpilot>
        </Intro>
        <Panels>
          <Panel>
            <A href="/food">
              <Inner>
                <Img src="../../images/table.png" className="table" />

                <Img src="../../images/meat.png" className="meat" />
                <Img src="../../images/chair.png" className="chair" />
                <Img src="../../images/steward.png" className="steward" />
              </Inner>
              <Link className="link link-01" href="/food">
                식당보기
              </Link>
            </A>
            <A href="/review">
              <Inner>
                <Img src="../../images/review.png" className="review" />
                <Img src="../../images/review2.png" className="review2" />
                <Img src="../../images/review3.png" className="review3" />
              </Inner>
              <Link className="link link-01" href="/review">
                리뷰 작성
              </Link>
            </A>
          </Panel>
          <Panel className="second">
            <A href="/cumunite">
              <Inner>
                <Img src="../../images/computer.png" className="computer" />
                <Img
                  src="../../images/computertable.png"
                  className="computertable"
                />
              </Inner>
              <Link className="link link-01" href="/cumunite">
                커뮤니티
              </Link>
            </A>
            <A href="#">
              <Inner>
                <Img src="../../images/teste1.png" className="teste1" />
                <Img src="../../images/teste2.png" className="teste2" />
                <Img src="../../images/teste3.png" className="teste3" />
              </Inner>
              <Link className="link link-01" href="/cumunite">
                맛 조절
              </Link>
            </A>
          </Panel>
        </Panels>
      </HomeHeader>
    </div>
  );
};

export default Main;
