import React from "react";
import styled from "styled-components";
import Main1 from "../page/Main/Main1";
import Main2 from "../page/Main/Main2";
import Main4 from "../page/Main/Main4";

const MainContainer = styled.div`
  flex-direction: column;
  align-items: center; /* 세로 가운데 정렬을 위해 추가 */
`;

function Main() {
  return (
    <MainContainer>
      <Main1 />

      <Main4 />
    </MainContainer>
  );
}

export default Main;
