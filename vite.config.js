import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: '/rass/',
  plugins: [
    vue(),
    vueDevTools(),
  ],

  server: {
    host: true,
    port: 5173,
    allowedHosts: 'all'
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})