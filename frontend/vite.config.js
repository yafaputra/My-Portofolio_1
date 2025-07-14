// frontend/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // atau react jika pakai React

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist' // defaultnya dist, jadi tetap ok
  }
})
