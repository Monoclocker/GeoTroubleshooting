import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  define: {
    "process.env.VITE_MAP_API_KEY": JSON.stringify(process.env.VITE_MAP_API_KEY)
  }
})
