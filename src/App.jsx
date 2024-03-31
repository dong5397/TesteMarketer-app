import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Main from "./page/Main";
import Home from "./page/Home";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import Search from "./page/Search";
import Rank from "./page/Rank";
import Service from "./page/Service";
import KakaoMap from "./page/KakaoMap";
import Register from "./page/Register";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try{
      const response = await fetch("http://localhost:3000/is-verify", {
        method: "GET",
        headers: {token : localStorage.token}
      })

      const parseRes = await response.json()
      
      parseRes === true ? setIsAuthenticated(true):
      setIsAuthenticated(false)
    } catch (err){
      console.error(err.message);
    }
  }

  useEffect(()=> {
    isAuth()
  })
  return (
    <BrowserRouter>
    <ToastContainer />
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
        <Route path="/home" element={
        !isAuthenticated ? (
          <Navigate to="/" />
        ) : (
        <HomeHN setAuth={setAuth} /> 
        )
      } 
      />
        <Route path="/search" element={<SearchHN />} />
        <Route path="/rank" element={<RankHN />} />
        <Route path="/service" element={<ServiceHN />} />
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
const HomeHN = ({setAuth}) => (
  <div>
    <Header setAuth={setAuth}/>
    <NavigationBar />
    <Home setAuth={setAuth} />
    <KakaoMap />
  </div>
);

const SearchHN = ({setAuth}) => (
  <div>
    <Header setAuth={setAuth}/>
    <NavigationBar />
    <Search />
    <KakaoMap />
  </div>
);


const RankHN = ({setAuth}) => (
  <div>
    <Header setAuth={setAuth}/>
    <NavigationBar />
    <Rank />
    <KakaoMap />
  </div>
);

const ServiceHN = ({setAuth}) => (
  <div>
    <Header setAuth={setAuth}/>
    <NavigationBar />
    <Service />
    <KakaoMap />
  </div>
);


export default App;
