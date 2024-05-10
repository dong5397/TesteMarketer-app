import { Container as MuiContainer } from "@mui/material";
import { DeviceFrameset } from "react-device-frameset";
import styled from "styled-components";
import HeaderText from "./HeaderText";
import List from "./ListPage";

function MainCumintePage() {
  return (
    <MainContainer>
      <DeviceFrameset device="iPad Mini" color="black" width="95%" height="80%">
        <StyledContainer>
          <HeaderText />
          <DivContainer>
            <List />
          </DivContainer>
        </StyledContainer>
      </DeviceFrameset>
    </MainContainer>
  );
}

export default MainCumintePage;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #add8e6; /* 연한 하늘색으로 설정 */
`;

const DivContainer = styled.div`
  flex: 1;
`;

const MainContainer = styled.div`
  height: 1200px;
  background: linear-gradient(#e7e78b, #f0f0c3);
`;
