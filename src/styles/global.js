import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }
  * {
      /* font-family: 'Noto Sans KR', sans-serif !important; */
    /* font-family: LeferiFont; */
    font-family: Pretendard;
    box-sizing: border-box;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      width: 5px;
      height: 7px;
    }
    /* Track - ScrollBar-Track */
    ::-webkit-scrollbar-track {
      background: #e6e6e6;
      border-radius: 10px;
    }
    /* Handle - ScrollBar-Circle */
    ::-webkit-scrollbar-thumb {
      background: #9ea7af;
      border-radius: 10px;
      transition: 0.3s;
      cursor: pointer !important;
      &:hover {
        background: #868b90;
      }
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:active {
      background: #65717b;
      cursor: pointer;
    }
  }
  html {
    /* overflow: auto; */
    /* overflow: hidden; */
    overflow: auto;
  }
  body {
    /* overflow: hidden; */
    overflow: auto;
    height: 100%;
    background-color: black;
    color: white;
  }
  body,
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    /* font-family: 'Nanum Gothic', sans-serif !important; */
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
  h1,h2,h3,h4,h5,
  ul,
  li,
  a,s
  p {
    padding: 0;
    margin: 0;
    list-style: inherit;
    color: inherit;
    text-decoration: inherit;
  }

`;
