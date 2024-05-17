import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      // 프록시 경로 설정 1
      '/api': {
        target: 'http://127.0.0.1:8000/', // Django 서버
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [react()],
})
/*

export default defineConfig({
  
});
*/