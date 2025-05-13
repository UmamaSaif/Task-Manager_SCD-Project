import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // or '0.0.0.0'
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:5000',  // Proxy API requests to backend
    }
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
