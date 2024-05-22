import { DeviceFrameset } from "react-device-frameset";
import React, { useState } from "react";
import styled from "styled-components";
import ListPage from "../../components/Community/ListPage";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

function MainListpage() {
  const navigate = useNavigate(); // useNavigate로 네비게이션 설정

  const handleRoute = () => {
    navigate("/MainWritePage"); // '/write'로 이동
  };

  return (
    <MainContainer>
      <ListPageWrapper>
        <DeviceFrameset
          device="iPad Mini"
          color="black"
          width="100%"
          height="75%"
        >
          <StyledContainer>
            <DivContainer>
              <DeviceContent>
                <Container>
                  <Header>
                    <h1>Community</h1>
                    <Button onClick={handleRoute}>글쓰기</Button>{" "}
                  </Header>
                  <ListPage />
                </Container>
              </DeviceContent>
            </DivContainer>
          </StyledContainer>
        </DeviceFrameset>
      </ListPageWrapper>
    </MainContainer>
  );
}

export default MainListpage;

const MainContainer = styled.div`
  height: 1200px;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #9ad6e2;
`;

const DivContainer = styled.div`
  flex: 1;
  display: flex;
`;

const DeviceContent = styled.div`
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  padding: 20px;
  background-color: #ffcc66;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #ff6b6b;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  align-self: center;
`;
const ListPageWrapper = styled.div`
  max-width: 1000px;
  height: 1000px;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
`;
