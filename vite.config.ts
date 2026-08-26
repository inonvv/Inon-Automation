import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Inon-Automation/',
  plugins: [react(), tailwindcss()],
  server: {
    // allow Cloudflare quick-tunnel hosts when sharing the dev server
    allowedHosts: ['.trycloudflare.com'],
  },
})
