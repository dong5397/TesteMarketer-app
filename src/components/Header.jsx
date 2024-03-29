import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuButton from "./MenuButton";

function Header({ userName }) {
  // props로 받은 userName을 사용하기 때문에, localStorage에서 다시 가져올 필요 없음
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
      {userName ? <p>안녕하세요, {userName}님</p> : <p></p>}
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
  align-items: center; /* 'cen' 오타를 'center'로 수정 */
  gap: 2rem;
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

// 사용자 이름을 보여주기 위한 스타일 컴포넌트 추가
const UserName = styled.span`
  margin-left: 1rem; /* MenuButton과의 간격을 주기 위해 */
  font-size: 1rem;
  font-weight: bold;
  color: #333; /* 적당한 색상 선택 */
  align-self: center; /* 세로 중앙 정렬 */
`;
