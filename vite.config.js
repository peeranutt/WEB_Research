import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  base: '/rass/',
  plugins: [
    vue(),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue'],
      routeStyle: 'nuxt'
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
