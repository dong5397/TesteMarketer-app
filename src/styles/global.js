import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    box-sizing: border-box;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      width: 5px;
      height: 7px;
    }
    ::-webkit-scrollbar-track {
      background: #e6e6e6;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: #9ea7af;
      border-radius: 10px;
      transition: 0.3s;
      cursor: pointer !important;
      &:hover {
        background: #868b90;
      }
    }
    ::-webkit-scrollbar-thumb:active {
      background: #65717b;
      cursor: pointer;
    }
  }
  html {
    overflow: auto;
  }
  body {
    overflow: auto;
    height: 100%;
    background-color: #fff; // 배경색을 흰색으로 변경
    color: #333; // 글자색을 어두운 회색으로 변경
  }
  body,
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1,h2,h3,h4,h5,
  ul,
  li,
  a,
  p {
    padding: 0;
    margin: 0;
    list-style: inherit;
    color: inherit;
    text-decoration: inherit;
  }
`;
