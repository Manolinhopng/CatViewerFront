import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  assetsInclude: ['**/*.png'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages')
    }
  }
})