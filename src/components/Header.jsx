import { Link } from "react-router-dom";
import styled from "styled-components";

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
      <Cell className="right">
        <Link to={"/sub1"}>서브1</Link>
        <Link to={"/sub2"}>서브2</Link>
        <Link to={"/sub3"}>서브3</Link>
      </Cell>
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
