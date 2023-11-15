import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Sub1 from "./page/Sub1";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="sub1" element={<Sub1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
