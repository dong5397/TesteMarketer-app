import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Sub1 from "./page/Sub1";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <NavigationBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="sub1" element={<Sub1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
