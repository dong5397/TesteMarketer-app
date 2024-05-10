import React from "react";
import Main from "./page/Main";
import KakaoMap from "../src/page/Map/KaKaoMap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/page/Map/Home";
import Header from "./page/Header";
import ServicePage from "./page/ServicePage";
import CommunityPage from "./page/Community/MainCommunityPage";
import ReviewRight from "./page/Review/ReviewRightPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHN />} />
        <Route path="/food" element={<FoodHN />} />
        <Route path="/service" element={<ServiceHN />} />
        <Route path="/review/:id" element={<ReviewHN />} />
        <Route path="/community" element={<CommunityHN />} />
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
    <ReviewRight />
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

export default App;
