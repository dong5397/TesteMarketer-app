import React from "react";
import styled from "styled-components";
import Service from "../components/Service";

const ServiceContainer = styled.div`
  background: linear-gradient(#e7e78b, #f0f0c3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ServicePage() {
  return (
    <ServiceContainer>
      <Service />
    </ServiceContainer>
  );
}

export default ServicePage;
