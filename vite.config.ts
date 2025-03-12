import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://pradnyakuswara.web.id',
      exclude: [
        '/404',
        '/admin',
        '/admin/dashboard',
        '/admin/certificate',
        '/admin/blog',
        '/admin/project-category',
        '/admin/project',
        '/login'
      ],
    }),
  ],
})
