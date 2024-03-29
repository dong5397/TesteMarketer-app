import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    overflow: auto;
    height: 100%;
    background-color: #ffffff; /* 하얀색 배경으로 변경 */
    color: #1a1a1a; /* 텍스트 색상 변경 */
    font-size: 1rem;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5 {
    font-weight: bold;
    color: #1a1a1a; /* 텍스트 색상 변경 */
    margin-bottom: 1rem;
  }

  p {
    color: #666666; /* 텍스트 색상 변경 */
    margin-bottom: 1rem;
  }

  a {
    color: #1a1a1a; /* 링크 색상 변경 */
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #555555; /* 링크 hover 색상 변경 */
  }

  ul {
    list-style: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff; /* 스크롤바 트랙 색상 변경 */
  }

  ::-webkit-scrollbar-thumb {
    background: #cccccc; /* 스크롤바 색상 변경 */
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #aaaaaa; /* 스크롤바 hover 색상 변경 */
  }
`;
