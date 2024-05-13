import React from "react";
import Main from "./page/Main";
import KakaoMap from "../src/page/Map/KaKaoMap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/page/Map/Home";
import Header from "./page/Header";
import ServicePage from "./page/ServicePage";
import CommunityPage from "./page/Community/MainPage";
import ReviewRightPage from "./page/Review/ReviewRightPage";
import MainReviewPages from "./page/Review/MainReviewPages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHN />} />
        <Route path="/food" element={<FoodHN />} />
        <Route path="/service" element={<ServiceHN />} />
        <Route path="/review/:id" element={<ReviewHN />} />
        <Route path="/community" element={<CommunityHN />} />
        <Route path="/reviewrightpage" element={<ReviewrightpageHN />} />
      </Routes>
    </BrowserRouter>
  );
}

const MainHN = () => (
  <div>
    <Header />
    <Main />
  </div>
);
const ReviewHN = () => (
  <div>
    <Header />
    <ReviewRightPage />
  </div>
);
const FoodHN = () => (
  <div>
    <Header />
    <Home />
    <KakaoMap />
  </div>
);

const ServiceHN = () => (
  <div>
    <Header />
    <ServicePage />
  </div>
);

const CommunityHN = () => (
  <div>
    <Header />
    <CommunityPage />
  </div>
);
const ReviewrightpageHN = () => (
  <div>
    <Header />
    <MainReviewPages />
  </div>
);
export default App;
