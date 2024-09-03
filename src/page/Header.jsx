import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import Potodance from "../components/Potodance";
import LoginModal from "../components/LoginModal";
import ProfileModal from "../components/ProfileModal";

const Header = ({ setAuth, isAuthenticated }) => {
  const [name, setName] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const logoutSuccessfully = () => toast("로그아웃 성공!");

  const logout = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/v1/logout", {
        method: "GET",
        credentials: "include", // 세션 쿠키를 포함하여 전송
      });
      localStorage.removeItem("sessionId"); // 세션 ID 제거
      setAuth(false);
      console.log("로그아웃 성공!");
      logoutSuccessfully();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <HeaderContainer>
      <LogoContainer to={"/"}>
        <Potodance />
      </LogoContainer>
      <NavLinks>
        <NavLink to="/food">식당보기</NavLink>
        <NavLink to="/review">탐색 & 리뷰작성</NavLink>
        <NavLink to="/MainListPage">커뮤니티</NavLink>
        <NavLink to="/service">맛 설정 모드</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink as="div" onClick={handleProfileClick}>
              프로필
            </NavLink>
            <NavLink as="div" onClick={logout}>
              로그아웃
            </NavLink>
          </>
        ) : (
          <NavLink as="div" onClick={handleLoginClick}>
            로그인
          </NavLink>
        )}
      </NavLinks>
      {showLoginModal && (
        <LoginModal
          show={showLoginModal}
          onClose={closeLoginModal}
          setAuth={setAuth} // 로그인 성공 시 부모 컴포넌트의 상태를 업데이트
        />
      )}
      {showProfileModal && (
        <ProfileModal show={showProfileModal} onClose={closeProfileModal} />
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: linear-gradient(#b6b654, #e7e78b);
`;

const LogoContainer = styled(Link)`
  width: 200px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  margin-left: -5%;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 0 25px;
  font-size: 25px;
  font-weight: bold;
  transition: transform 0.3s ease;
  font-family: "GowunDodum-Regular";

  &:hover {
    transform: scale(1.1);
  }
`;
