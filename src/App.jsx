import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";

import Search from "./page/Search";
import Rank from "./page/Rank";
import Service from "./page/Service";
import KakaoMap from "./page/KaKaoMap"; // KakaoMap 컴포넌트 import
import Joinmembership from "./page/Joinmembership";
import Login from "./page/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <KakaoMap />
      <NavigationBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="rank" element={<Rank />} />
        <Route path="service" element={<Service />} />
        <Route path="Joinmembership" element={<Joinmembership />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
