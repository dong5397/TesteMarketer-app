import React from "react";
import styled, { keyframes } from "styled-components";

const shadAnim = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% -100%;
  }
`;

const GlitchText = styled.h1`
  display: inline-block;
  color: white;
  font-family: "Righteous", serif;
  font-size: 6em;
  text-shadow: 0.03em 0.03em 0 black; /* text-shadow를 검은색으로 변경 */
  position: relative;
  margin: 0 auto;

  &:after {
    content: attr(data-shadow);
    position: absolute;
    top: 0.06em;
    left: 0.06em;
    z-index: -1;
    text-shadow: none;
    background-image: linear-gradient(
      45deg,
      transparent 45%,
      hsla(48, 20%, 90%, 1) 45%,
      hsla(48, 20%, 90%, 1) 55%,
      transparent 0
    );
    background-size: 0.05em 0.05em;
    background-clip: text;
    color: transparent;
    animation: ${shadAnim} 15s linear infinite;
  }
`;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 200px;
`;

export default function App() {
  return (
    <CenteredWrapper>
      <GlitchText data-shadow="dang!">CommunityPage!</GlitchText>
    </CenteredWrapper>
  );
}
