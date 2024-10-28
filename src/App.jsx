import React, { useEffect } from "react";
import Main from "./page/Main";
import KakaoMap from "../src/page/Map/KaKaoMap";
import KakaoMap2 from "../src/page/Map/KaKaoMap2";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/page/Map/Home";
import Header from "./page/Header";
import ServicePage from "./page/ServicePage";
import MainWritePage from "./page/Community/MainWritePage";
import MainListPage from "./page/Community/MainListPage";
import CategoryReviewPage from "./page/Review/CategoryReivewPage";
import ReviewPage from "./page/Review/ReviewPage";
import MainReviewPages from "./page/Review/MainReviewPages";
import EditPage from "./components/Community/EditPage";
import DetailPost from "./components/Community/DetailPost";
import { ToastContainer } from "react-toastify";
import ServiceFoods from "./components/ServiceFoods";
import Mypage from "./components/User/Mypage";
import ResetPasswordPage from "./components/User/ResetPassword";
import { useRecoilState } from "recoil";
import { authState } from "./state/userAtoms"; // Import the Recoil state
import TopNav from "./components/TopNav";
import styled from "styled-components";
function App() {
  const [isAuthenticated, setAuth] = useRecoilState(authState);

  // Check session and load authentication state on mount
  useEffect(() => {
    const savedAuthState = sessionStorage.getItem("isAuthenticated");
    if (savedAuthState) {
      setAuth(true);
    } else {
      checkSession(); // 서버에서 세션 확인
    }
  }, [setAuth]);

  // Persist authentication state in session storage
  // Persist authentication state in session storage
  useEffect(() => {
    sessionStorage.setItem(
      "isAuthenticated",
      isAuthenticated ? "true" : "false"
    );
  }, [isAuthenticated]);

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
      if (result.isAuthenticated) {
        setAuth(true); // Set to true if session is valid
      } else {
        setAuth(false); // Set to false if not authenticated
      }
    } catch (error) {
      setAuth(false); // Handle error and set as unauthenticated
    }
  };

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />
      <Header isAuthenticated={isAuthenticated} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<MainHN />} />
        <Route path="/food" element={<FoodHN />} />
        <Route path="/bicycle" element={<Bicycle />} />
        <Route path="/service" element={<ServiceHN />} />
        <Route path="/servicefoods" element={<ServiceFoodHN />} />
        <Route path="/review" element={<FullReviewHN />} />
        <Route path="/review/:id" element={<ReviewHN />} />
        <Route path="/MainListPage" element={<CommunityListHN />} />
        <Route path="/MainWritePage" element={<CommunityWriteHN />} />
        <Route path="/category/:category" element={<CategoryReviewHN />} />
        <Route path="/EditPage/:postId" element={<EditPageHN />} />
        <Route path="/Post/:postId" element={<DetailPostPageHN />} />
        <Route path="/mypage" element={<MypageHN />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
      <MobileOnlyWrapper>
        <TopNav />
      </MobileOnlyWrapper>
    </BrowserRouter>
  );
}

const MainHN = () => (
  <div>
    <Main />
  </div>
);

const ReviewHN = () => (
  <div>
    <ReviewPage />
  </div>
);

const FullReviewHN = () => (
  <div>
    <MainReviewPages />
  </div>
);

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

const ServiceHN = () => (
  <div>
    <ServicePage />
  </div>
);

const ServiceFoodHN = () => (
  <div>
    <ServiceFoods />
  </div>
);

const CommunityListHN = () => (
  <div>
    <MainListPage />
  </div>
);

const CommunityWriteHN = () => (
  <div>
    <MainWritePage />
  </div>
);

const CategoryReviewHN = () => (
  <div>
    <CategoryReviewPage />
  </div>
);

const EditPageHN = () => (
  <div>
    <EditPage />
  </div>
);

const DetailPostPageHN = () => (
  <div>
    <DetailPost />
  </div>
);

const MypageHN = () => (
  <div>
    <Mypage />
  </div>
);

export default App;
const MobileOnlyWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
