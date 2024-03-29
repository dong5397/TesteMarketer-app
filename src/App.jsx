import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./page/Main";
import Home from "./page/Home";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import Search from "./page/Search";
import Rank from "./page/Rank";
import Service from "./page/Service";
import KakaoMap from "./page/KakaoMap";
import Joinmembership from "./page/Joinmembership";
import Login from "./page/Login";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="home" element={<HomeWithMap />} />
          <Route path="search" element={<SearchWithMap />} />
          <Route path="login" element={<LoginWithMap />} />
          <Route path="rank" element={<RankWithMap />} />
          <Route path="service" element={<ServiceWithMap />} />
          <Route path="Joinmembership" element={<JoinmembershipWithMap />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// 지도를 포함한 홈 화면 컴포넌트
const HomeWithMap = () => (
  <div>
    <Home />
    <KakaoMap />
  </div>
);

// 지도를 포함한 검색 화면 컴포넌트
const SearchWithMap = () => (
  <div>
    <Search />
    <KakaoMap />
  </div>
);

// 지도를 포함한 로그인 화면 컴포넌트
const LoginWithMap = () => (
  <div>
    <Login />
    <KakaoMap />
  </div>
);

// 지도를 포함한 랭크 화면 컴포넌트
const RankWithMap = () => (
  <div>
    <Rank />
    <KakaoMap />
  </div>
);

// 지도를 포함한 서비스 화면 컴포넌트
const ServiceWithMap = () => (
  <div>
    <Service />
    <KakaoMap />
  </div>
);

// 지도를 포함한 회원가입 화면 컴포넌트
const JoinmembershipWithMap = () => (
  <div>
    <Joinmembership />
    <KakaoMap />
  </div>
);

export default App;
