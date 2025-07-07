import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-currency/', 
  build: {
    outDir: 'docs' // Собирать в папку docs (GitHub Pages умеет с ней работать)
  }
})
