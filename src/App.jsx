import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import Search from "./page/Search";
import Rank from "./page/Rank";
import Service from "./page/Service";
import KakaoMap from "./page/KaKaoMap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeHN />} />
        <Route path="/search" element={<SearchHN />} />
        <Route path="/rank" element={<RankHN />} />
        <Route path="/service" element={<ServiceHN />} />
      </Routes>
    </BrowserRouter>
  );
}

// 나머지 페이지에서는 Header와 NavigationBar를 포함하여 컴포넌트를 렌더링
const HomeHN = () => (
  <div>
    <Header />
    <NavigationBar />
    <KakaoMap />
    <Home />
    <Search />
  </div>
);

const SearchHN = () => (
  <div>
    <Header />
    <NavigationBar />
  </div>
);

const RankHN = () => (
  <div>
    <Header />
    <NavigationBar />
    <Rank />
  </div>
);

const ServiceHN = () => (
  <div>
    <Header />
    <NavigationBar />
    <Service />
    <KakaoMap />
  </div>
);

export default App;
