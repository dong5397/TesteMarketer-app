import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import Potodance from "../components/Potodance";

import TopNav from "../components/TopNav"; // 하단 네비게이션 컴포넌트 추가

const Header = ({ setAuth, isAuthenticated }) => {
  const [name, setName] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // 모바일 뷰 감지

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoutSuccessfully = () => toast("로그아웃 성공!");

  const logout = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/v1/logout", {
        method: "GET",
        credentials: "include",
      });
      localStorage.removeItem("sessionId");
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
    <>
      {/* 모바일 뷰가 아닐 경우 상단 네비게이션 렌더링 */}
      {!isMobileView && (
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
        </HeaderContainer>
      )}

      {/* 모바일 뷰일 경우 하단 네비게이션 렌더링 */}

      {showLoginModal && (
        <LoginModal
          show={showLoginModal}
          onClose={closeLoginModal}
          setAuth={setAuth}
        />
      )}
      {showProfileModal && (
        <ProfileModal show={showProfileModal} onClose={closeProfileModal} />
      )}
      {isMobileView && <TopNav />}
    </>
  );
};

export default Header;

// 스타일 컴포넌트 정의
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: linear-gradient(#b6b654, #e7e78b);

  @media screen and (max-width: 768px) {
    display: none; /* 모바일에서 숨김 */
  }
`;

const LogoContainer = styled(Link)`
  width: 150px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: 480px) {
    width: 120px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media screen and (max-width: 768px) {
    display: none; /* 모바일에서 숨김 */
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 10px 15px;
  font-size: 18px;
  font-weight: bold;
  transition: transform 0.3s ease;
  font-family: "GowunDodum-Regular";
  color: #333;
  white-space: nowrap;

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (max-width: 768px) {
    display: none; /* 모바일에서 숨김 */
  }
`;
