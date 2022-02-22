import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['src/**/*.{svelte,html,jsx,tsx,css}'],
    exclude: ['node_modules', '.git'],
  },
  plugins: [
    require('windicss/plugin/forms'),
  ]
})