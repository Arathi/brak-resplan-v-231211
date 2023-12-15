import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  server: {port: 13400,},
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@domains": path.resolve(__dirname, "src/domains"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@views": path.resolve(__dirname, "src/views"),
    }
  }
})
