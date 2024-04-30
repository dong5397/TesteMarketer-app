import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import MainHeader from "./page/MainHeader";

import Rank from "./page/Rank";
import Service from "./page/Service";
import KakaoMap from "./page/KaKaoMap";
import Main from "./page/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHN />} />
        <Route path="/food" element={<FoodHN />} />

        <Route path="/rank" element={<RankHN />} />
        <Route path="/service" element={<ServiceHN />} />
      </Routes>
    </BrowserRouter>
  );
}

// 나머지 페이지에서는 Header와 NavigationBar를 포함하여 컴포넌트를 렌더링
const MainHN = () => (
  <div>
    <MainHeader />
    <Main />
  </div>
);
const FoodHN = () => (
  <div>
    <MainHeader />

    <Home />
  </div>
);

const SearchHN = () => (
  <div>
    <MainHeader />
  </div>
);

const RankHN = () => (
  <div>
    <MainHeader />
    <Rank />
  </div>
);

const ServiceHN = () => (
  <div>
    <MainHeader />
    <Service />
    <KakaoMap />
  </div>
);

export default App;
