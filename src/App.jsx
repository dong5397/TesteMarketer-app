import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./page/Main";
import Dashboard from "./page/dashboard";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import Search from "./page/Search";
import Rank from "./page/Rank";
import Service from "./page/Service";
import KakaoMap from "./page/KakaoMap";
import Joinmembership from "./page/Joinmembership";
import Login from "./page/Login";
import Register from "./page/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Main 페이지에는 Header와 NavigationBar를 제외한 컴포넌트를 렌더링 */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <MainHN setAuth={setAuth} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Register setAuth={setAuth} />
            )
          }
        />
        {/* 나머지 페이지에는 Header와 NavigationBar를 포함하여 렌더링 */}
        <Route path="/dashboard" element={<DashboardHN setAuth={setAuth} />} />
        <Route path="/search" element={<SearchHN />} />
        <Route path="/login" element={<LoginHN />} />
        <Route path="/rank" element={<RankHN />} />
        <Route path="/service" element={<ServiceHN />} />
        <Route path="/Joinmembership" element={<JoinmembershipHN />} />
      </Routes>
    </BrowserRouter>
  );
}

// Main 페이지에서는 Header와 NavigationBar를 제외한 컴포넌트를 렌더링
const MainHN = ({ setAuth }) => (
  <div>
    <Main setAuth={setAuth} />
  </div>
);

// 나머지 페이지에서는 Header와 NavigationBar를 포함하여 컴포넌트를 렌더링
const DashboardHN = (setAuth) => (
  <div>
    <Header />
    <NavigationBar />
    <Dashboard setAuth={setAuth} />
    <KakaoMap />
  </div>
);

const SearchHN = () => (
  <div>
    <Header />
    <NavigationBar />
    <Search />
    <KakaoMap />
  </div>
);

const LoginHN = () => (
  <div>
    <Header />
    <NavigationBar />
    <Login />
    <KakaoMap />
  </div>
);

const RankHN = () => (
  <div>
    <Header />
    <NavigationBar />
    <Rank />
    <KakaoMap />
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

const JoinmembershipHN = () => (
  <div>
    <Header />
    <NavigationBar />
    <Joinmembership setAuth={setAuth} />
    <KakaoMap />
  </div>
);

export default App;
