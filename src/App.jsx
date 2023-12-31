import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import KakaoLogin from "./components/KakoLogin";
import Search from "./page/Search";
import Rank from "./page/Rank";
import Service from "./page/Service";
import KakaoMap from "./page/KaKaoMap"; // KakaoMap 컴포넌트 import

function App() {
  return (
    <BrowserRouter>
      <Header />
      <KakaoMap />
      <NavigationBar />

      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<KakaoLogin />} />
        <Route path="rank" element={<Rank />} />
        <Route path="service" element={<Service />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
