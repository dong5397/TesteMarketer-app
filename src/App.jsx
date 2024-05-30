import React, { useEffect, useState } from "react";
import Main from "./page/Main";
import KakaoMap from "../src/page/Map/KaKaoMap"; // 경로 수정 필요
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

function App() {
  const [mapMoveFunction, setMapMoveFunction] = useState(null);

  useEffect(() => {
    if (mapMoveFunction) {
      console.log("MapMoveFunction is set");
    }
  }, [mapMoveFunction]);

  const handleMapMove = (latitude, longitude) => {
    console.log("handleMapMove called with:", latitude, longitude);
    setMapMoveFunction({ latitude, longitude });
  };

  console.log("handleMapMove called with:", mapMoveFunction);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHN />} />
        <Route
          path="/food"
          element={
            <FoodHN
              handleMapMove={handleMapMove}
              mapMoveFunction={mapMoveFunction}
            />
          }
        />
        <Route path="/service" element={<ServiceHN />} />
        <Route path="/review" element={<FullReviewHN />} />
        <Route path="/review/:id" element={<ReviewHN />} />
        <Route path="/MainListPage" element={<CommunityListHN />} />
        <Route path="/MainWritePage" element={<CommunityWriteHN />} />
        <Route path="/category/:category" element={<CategoryReviewHN />} />
        <Route path="/EditPage/:postId" element={<EditPageHN />} />
        <Route path="/Post/:postId" element={<DetailPostPageHN />} />
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
    <ReviewPage />
  </div>
);

const FullReviewHN = () => (
  <div>
    <Header />
    <MainReviewPages />
  </div>
);

const FoodHN = ({ handleMapMove, mapMoveFunction }) => (
  <div>
    <Header />
    <Home handleMapMove={handleMapMove} mapMoveFunction={mapMoveFunction} />
    <KakaoMap mapMoveFunction={mapMoveFunction} />
  </div>
);

const ServiceHN = () => (
  <div>
    <Header />
    <ServicePage />
  </div>
);

const CommunityListHN = () => (
  <div>
    <Header />
    <MainListPage />
  </div>
);

const CommunityWriteHN = () => (
  <div>
    <Header />
    <MainWritePage />
  </div>
);

const CategoryReviewHN = () => (
  <div>
    <Header />
    <CategoryReviewPage />
  </div>
);

const EditPageHN = () => (
  <div>
    <Header />
    <EditPage />
  </div>
);

const DetailPostPageHN = () => (
  <div>
    <Header />
    <DetailPost />
  </div>
);

export default App;
