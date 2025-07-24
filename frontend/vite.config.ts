// vite.config.ts o vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite accesos externos
    allowedHosts: ['.ngrok-free.app'], // permite cualquier subdominio ngrok-free.app
    // También podés poner directamente tu subdominio completo:
    // allowedHosts: ['65e23a76ba8a.ngrok-free.app']
  }
})
