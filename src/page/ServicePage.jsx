import React from "react";
import styled from "styled-components";
import { RecoilRoot } from "recoil"; // RecoilRoot를 추가로 가져옵니다.
import Service from "../components/Service";

const ServiceContainer = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ServicePage() {
  return (
    <RecoilRoot>
      {" "}
      <ServiceContainer>
        <Service />
      </ServiceContainer>
    </RecoilRoot>
  );
}

export default ServicePage;
