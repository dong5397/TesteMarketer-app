import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuButton from "./MenuButton";

function Header() {
  return (
    <Container>
      <Cell className="left">
        <Link to={"/"}>
          <Img
            src="https://modo-phinf.pstatic.net/20150520_153/1432118386155aFLGK_JPEG/mosaBygLif.jpeg?type=f320_320"
            alt="로고"
          />
        </Link>
      </Cell>

      <MenuButton />
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 2.5rem;
  padding: 0.5rem 0;
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  &.right {
    font-size: 1.3rem;
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 80px;
  cursor: pointer;
  display: block;
`;
