import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'https://www.plz-project.site',
        changeOrigin: true,
        secure: true,
        ws: true
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets'
    }
  }
});
