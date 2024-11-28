import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Main from "./page/Main";
import KakaoMap from "./page/Map/KaKaoMap";
import KakaoMap2 from "../src/page/Map/KaKaoMap2";
import Home from "./page/Map/Home";
import Header from "./page/Header";
import ServicePage from "./page/ServicePage";
import MainWritePage from "./page/Community/MainWritePage";
import MainListPage from "./page/Community/MainListPage";
import CategoryReviewPage from "./page/Review/CategoryReivewPage";
import ReviewPage from "./page/Review/ReviewPage";
import MainReviewPages from "./page/Review/MainReviewPages";
import EditPage from "./components/Community/EditPage";
import DetailPost from "./components/Community/DetailPost";
import ServiceFoods from "./components/ServiceFoods";
import Mypage from "./components/User/Mypage";
import ResetPasswordPage from "./components/User/ResetPassword";
import TopNav from "./components/TopNav";

import { authState } from "./state/userAtoms"; // Recoil 상태 가져오기

function App() {
  const [auth, setAuth] = useRecoilState(authState);

  // 세션을 체크하는 함수 (API 호출)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          "https://maketerbackend.fly.dev/api/v1/check-session",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();

        // 응답 확인
        console.log("check-session API response:", result);

        if (result.isAuthenticated) {
          setAuth({
            isAuthenticated: true,
            userId: result.user.id, // userId 추가
            username: result.user.full_name,
            email: result.user.email,
          });
          console.log("Updated authState with userId:", result.user.id);
        } else {
          setAuth({
            isAuthenticated: false,
            userId: null,
            username: "",
            email: "",
          });
          console.log("User is not authenticated");
        }
      } catch (error) {
        setAuth({
          isAuthenticated: false,
          userId: null,
          username: "",
          email: "",
        });
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, [setAuth]);

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />
      <Header isAuthenticated={auth.isAuthenticated} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/food" element={<FoodHN />} />
        <Route path="/bicycle" element={<Bicycle />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/servicefoods" element={<ServiceFoods />} />
        <Route path="/review" element={<MainReviewPages />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/MainListPage" element={<MainListPage />} />
        <Route path="/MainWritePage" element={<MainWritePage />} />
        <Route path="/category/:category" element={<CategoryReviewPage />} />
        <Route path="/EditPage/:postId" element={<EditPage />} />
        <Route path="/Post/:postId" element={<DetailPost />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
      <MobileOnlyWrapper>
        <TopNav />
      </MobileOnlyWrapper>
    </BrowserRouter>
  );
}
const FoodHN = () => {
  return (
    <div>
      <Home />
      <KakaoMap />
    </div>
  );
};
const Bicycle = () => {
  return (
    <div>
      <Home />
      <KakaoMap2 />
    </div>
  );
};
export default App;
const MobileOnlyWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
