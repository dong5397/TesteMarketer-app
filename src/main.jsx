import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global.js";
import Modal from "react-modal"; // react-modal import 추가
import { RecoilRoot } from "recoil"; // RecoilRoot import 추가

Modal.setAppElement("#root"); // 루트 요소 설정 추가

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={{}}>
      <RecoilRoot>
        <App />
        <GlobalStyles />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>
);
