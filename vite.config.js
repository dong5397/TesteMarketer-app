import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://makterbackend.fly.dev", // 배포된 백엔드 서버 주소
        changeOrigin: true, // CORS 문제 해결
        rewrite: (path) => path.replace(/^\/api/, ""), // '/api'를 제거하고 백엔드로 전달
      },
      "/tashu": {
        target: "https://bikeapp.tashu.or.kr:50041", // Tashu API 서버 주소
        changeOrigin: true,
        secure: false, // 보안 연결을 무시 (개발 환경에서만 설정)
        rewrite: (path) => path.replace(/^\/tashu/, ""), // '/tashu'를 제거하고 API 서버로 전달
      },
    },
  },
});
