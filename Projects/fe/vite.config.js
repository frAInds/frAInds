import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173, 
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // 백엔드 서버 주소
        changeOrigin: true,
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