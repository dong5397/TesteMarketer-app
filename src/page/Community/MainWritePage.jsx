import { DeviceFrameset } from "react-device-frameset";
import React, { useState } from "react";
import styled from "styled-components";
import WritePage from "../../components/Community/WritePage";
import ListPage2 from "../../components/Community/ListPage2";
import { useNavigate } from "react-router-dom";

function MainWritePage() {
  const navigate = useNavigate();
  const handleRouter = (e) => {
    navigate("../MainListPage");
  };

  return (
    <MainContainer>
      <WritePageWrapper>
        <DeviceFrameset
          device="iPad Mini"
          color="black"
          width="100%"
          height="80%"
        >
          <StyledContainer>
            <DivContainer>
              <DeviceContent>
                <Container>
                  <Header>
                    <h1>Community</h1>
                    <Button onClick={handleRouter}>글목록</Button>{" "}
                  </Header>
                  <ListPage2 />
                  <WritePage />
                </Container>
              </DeviceContent>
            </DivContainer>
          </StyledContainer>
        </DeviceFrameset>
      </WritePageWrapper>
    </MainContainer>
  );
}

export default MainWritePage;
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
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #e1f5fe; /* 연한 하늘색으로 설정 */
`;

const DivContainer = styled.div`
  flex: 1;
  display: flex;
`;

const MainContainer = styled.div`
  height: 1200px;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;

const DeviceContent = styled.div`
  flex: 1;
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
const WritePageWrapper = styled.div`
  max-width: 1000px;
  height: 1000px;
  margin: 0 auto;
  padding: 20px;
  gap: 100px;
`;
