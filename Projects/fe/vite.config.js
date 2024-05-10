import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 프록시 경로 설정 1
      '/api/django': {
        target: 'http://localhost:8000/', // Django 서버
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/django/,'')
      },
      // 프록시 경로 설정 2
      '/api/spring': {
        target: 'http://localhost:8080/', // Spring 서버
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/spring/,'')
      }
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