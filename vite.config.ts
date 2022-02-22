import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import WindiCss from 'vite-plugin-windicss'

// https://vitejs.dev/config/1
export default defineConfig({
  plugins: [
    svelte(),
    WindiCss(),
  ],
  resolve: {
    extensions: ['.d.ts', '.ts'],
  }
})
