import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Sub1 from "./page/Sub1";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import KakaoLogin from "./components/KakoLogin";
import SearchBar from "./components/SearchBar";
import Search from "./page/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavigationBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<KakaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
