import React, { useState, useEffect } from "react";
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
import FoodIndex from "./components/FoodIndex"; // FoodIndex 임포트 추가
import styled from "styled-components"; // styled-components 임포트 추가
import ServiceFoods from "./components/ServiceFoods";

function App() {
  const [mapMoveFunction, setMapMoveFunction] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    if (mapMoveFunction) {
      console.log("MapMoveFunction is set");
    }
  }, [mapMoveFunction]);

  const handleMapMove = (latitude, longitude) => {
    console.log("handleMapMove called with:", latitude, longitude);
    setMapMoveFunction({ latitude, longitude });
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsModalOpen(false);
    setSelectedRestaurant(null);
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
              selectedRestaurant={selectedRestaurant}
              handleRestaurantClick={handleRestaurantClick}
              isModalOpen={isModalOpen}
              handleCloseDetails={handleCloseDetails}
              error={error}
            />
          }
        />
        <Route path="/service" element={<ServiceHN />} />
        <Route path="/servicefoods" element={<ServiceFoodHN />} />
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

const FoodHN = ({
  handleMapMove,
  mapMoveFunction,
  selectedRestaurant,
  handleRestaurantClick,
  isModalOpen,
  handleCloseDetails,
  error,
}) => (
  <div>
    <Header />
    <Home
      handleMapMove={handleMapMove}
      mapMoveFunction={mapMoveFunction}
      selectedRestaurant={selectedRestaurant}
    />
    <KakaoMap
      mapMoveFunction={mapMoveFunction}
      handleRestaurantClick={handleRestaurantClick}
    />
    {isModalOpen && selectedRestaurant && (
      <Modal>
        <FoodIndex restaurant={selectedRestaurant} />
        <CloseButton onClick={handleCloseDetails}>X</CloseButton>
      </Modal>
    )}
  </div>
);

const ServiceHN = () => (
  <div>
    <Header />
    <ServicePage />
  </div>
);

const ServiceFoodHN = () => (
  <div>
    <Header />
    <ServiceFoods />
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

const Modal = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1000;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export default App;
