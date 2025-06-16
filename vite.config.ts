import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Base path for the project
  plugins: [
    react() // Vite plugin for React
  ],
  build: {
    // Sets the chunk size warning limit to 1000 KB instead of 500 KB
    chunkSizeWarningLimit: 1000
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://backend.realestate.rsworkspace.net', // Backend API URL
        changeOrigin: true, // Ensures the API server handles requests correctly
        rewrite: (path) => path.replace(/^\/api/, '') // Rewrite the /api prefix to match the API server
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias '@' to the 'src' directory
    },
  },
  optimizeDeps: {
    include: ['react-phone-number-input'], // Optimizes the 'react-phone-number-input' package
  },
});
