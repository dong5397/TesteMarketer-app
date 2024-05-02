import React from "react";
import MainHeader from "./page/MainHeader";
import Main from "./page/Main";
import KakaoMap from "./page/KaKaoMap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Service from "./page/Service";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHN />} />
        <Route path="/food" element={<FoodHN />} />
        <Route path="/service" element={<ServiceHN />} />
      </Routes>
    </BrowserRouter>
  );
}

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
    <KakaoMap />
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
