import React from "react";
import styled from "styled-components";

const Main1Container = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3);
  color: white;
  padding: 20px;
`;
const PageContainer = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3); /* 변경된 부분 */
`;
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
  font-size: 80px;
  line-height: 1.2;
  margin-bottom: 0.3rem;
  font-family: "GowunDodum-Regular";
`;

const H2 = styled.h2`
  font-weight: 300;
  font-size: 30px;
  font-family: "GowunDodum-Regular";
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
  font-family: "GowunDodum-Regular";
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
  font-family: "GowunDodum-Regular";
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

  //1번 공간
  //1번 공간
  .table {
    width: 200px;
    height: 200px;
    top: 100px;
    left: 75px;
    z-index: 2;
    margin-right: -300px;
    animation-name: table-move;
    animation-delay: 0.2s;
    animation-duration: 0.8s;
  }

  .plate {
    width: 100px;
    height: 100px;
    top: 90px;
    left: 120px;
    z-index: 2;
    animation-name: plate-move;
    animation-delay: 0.2s;
    animation-duration: 0.8s;
  }
  .meat {
    width: 100px;
    height: 100px;
    top: 90px;
    left: 130px;
    z-index: 3;
    animation-name: meat-move;
    animation-delay: 0.2s;
    animation-duration: 0.8s;
  }
  .chair {
    width: 200px;
    height: 200px;
    top: 80px;
    left: 0px;
    z-index: 1;
    animation-name: chair-move;
    animation-delay: 0.2s;
    animation-duration: 0.8s;
  }
  .cook {
    width: 150px;
    height: 200px;
    top: 100px;
    left: 170px;
    z-index: 4;
    animation-name: cook-move;
    animation-delay: 1s;
    animation-duration: 0.8s;
  }

  //2번 공간
  .review {
    width: 200px;
    height: 200px;
    top: 70px;
    left: 100px;
    z-index: 1;
    animation-name: review-move;
    animation-delay: 0.5s;
    animation-duration: 0.8s;
  }
  .review2 {
    width: 150px;
    height: 150px;
    top: 120px;
    left: 250px;
    z-index: 3;
    animation-name: review2-move;
    animation-delay: 0.8s;
    animation-duration: 0.8s;
  }
  .review3 {
    width: 150px;
    height: 150px;
    top: 120px;
    left: 0px;
    z-index: 2;
    animation-name: review3-move;
    animation-delay: 1s;
    animation-duration: 0.8s;
  }

  //3번 공간
  .community1 {
    width: 250px;
    height: 200px;
    top: 70px;
    left: 50px;
    z-index: 4;
    animation-name: community1-move;
    animation-delay: 1.8s;
    animation-duration: 0.8s;
  }
  .community2 {
    width: 250px;
    height: 200px;
    top: 70px;
    left: 60px;
    z-index: 4;
    animation-name: community2-move;
    animation-delay: 1.5s;
    animation-duration: 0.8s;
  }
  .community3 {
    width: 150px;
    height: 70px;
    top: 220px;
    left: 100px;
    z-index: 3;
    animation-name: community3-move;
    animation-delay: 1s;
    animation-duration: 0.8s;
  }
  .community4 {
    width: 100px;
    height: 80px;
    top: 50px;
    left: 70px;
    z-index: 3;
    animation-name: community4-move;
    animation-delay: 2.4s;
    animation-duration: 0.8s;
  }
  .community5 {
    width: 100px;
    height: 80px;
    top: 50px;
    left: 180px;
    z-index: 3;
    animation-name: community5-move;
    animation-delay: 3s;
    animation-duration: 0.8s;
  }

  //4번 공간
  .teste1 {
    width: 200px;
    height: 150px;
    top: 130px;
    left: 120px;
    z-index: 1;
    animation-name: teste1-move;
    animation-delay: 1.7s;
    animation-duration: 0.8s;
  }
  .teste2 {
    width: 200px;
    height: 150px;
    top: 80px;
    left: 120px;
    z-index: 3;
    animation-name: teste2-move;
    animation-delay: 2s;
    animation-duration: 0.8s;
  }
  .teste3 {
    width: 100px;
    height: 100px;
    top: 180px;
    left: 30px;
    z-index: 3;
    animation-name: teste3-move;
    animation-delay: 2.5s;
    animation-duration: 0.8s;
  }
  .teste4 {
    width: 180px;
    height: 180px;
    position: absolute;
    top: 50px;
    left: 130px;
    z-index: 2;
    animation-name: teste4-move;
    animation-delay: 3s;
    animation-duration: 0.8s;
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
    background: #fadb7d;
    border-radius: 6px;
    border: 10px solid #000;
  }
  &:hover {
    transform: translateY(-5px) scale(1.02, 1.02);
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
  font-size: 30px;
  bottom: 0;
  left: 70px;
  right: 70px;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-name: home-link-move;
  transition: bottom 0.2s ease-out 100ms;
  z-index: 10;
  font-family: "GowunDodum-Regular";

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

  @keyframes home-link-move {
    0% {
      transform: translateY(300px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes table-move {
    0% {
      transform: translateY(-300px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
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

  @keyframes cook-move {
    0% {
      transform: translateY(300px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
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
      transform: translateY(300px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes review3-move {
    0% {
      opacity: 1;
      transform: translateY(300px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes community1-move {
    0% {
      opacity: 1;
      transform: translateX(-300px);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes community2-move {
    0% {
      opacity: 1;
      transform: translateX(300px);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes community3-move {
    0% {
      transform: translateY(-300px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes community4-move {
    0% {
      transform: translateY(-300px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes community5-move {
    0% {
      transform: translateY(-300px);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
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
  @keyframes teste4-move {
    0% {
      opacity: 1;
      transform: translate(0);
    }
    100% {
      transform: translate(0);
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

const Main1 = () => {
  return (
    <div>
      <Main1Container>
        <PageContainer>
          {" "}
          {/* 변경된 부분 */}
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
                    <Img src="../../images/1/table.png" className="table" />

                    <Img src="../../images/1/meat.png" className="meat" />
                    <Img src="../../images/1/chair.png" className="chair" />
                    <Img src="../../images/1/cook.png" className="cook" />
                  </Inner>
                  <Link className="link link-01" href="/food">
                    식당보기
                  </Link>
                </A>
                <A href="/review">
                  <Inner>
                    <Img src="../../images/2/review.png" className="review" />
                    <Img src="../../images/2/review2.png" className="review2" />
                    <Img src="../../images/2/review3.png" className="review3" />
                  </Inner>
                  <Link className="link link-01" href="/review">
                    리뷰 보기
                  </Link>
                </A>
              </Panel>
              <Panel className="second">
                <A href="/community">
                  <Inner>
                    <Img
                      src="../../images/3/community1.png"
                      className="community1"
                    />
                    <Img
                      src="../../images/3/community2.png"
                      className="community2"
                    />
                    <Img
                      src="../../images/3/community3.png"
                      className="community3"
                    />
                    <Img
                      src="../../images/3/community4.png"
                      className="community4"
                    />
                    <Img
                      src="../../images/3/community5.png"
                      className="community5"
                    />
                  </Inner>
                  <Link className="link link-01" href="/cumunite">
                    커뮤니티
                  </Link>
                </A>
                <A href="/service">
                  <Inner>
                    <Img src="../../images/4/teste1.png" className="teste1" />
                    <Img src="../../images/4/teste2.png" className="teste2" />
                    <Img src="../../images/4/teste3.png" className="teste3" />
                    <Img src="../../images/4/teste4.png" className="teste4" />
                  </Inner>
                  <Link className="link link-01" href="/service">
                    맛 조절
                  </Link>
                </A>
              </Panel>
            </Panels>
          </HomeHeader>
        </PageContainer>{" "}
        {/* 변경된 부분 */}
      </Main1Container>
    </div>
  );
};

export default Main1;
