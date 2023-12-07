import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import KakaoLogin from "./components/KakoLogin";
import Search from "./page/Search";
import FoodItem from "./components/FoodItem";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavigationBar />
      <FoodItem />
      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<KakaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
