import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['src/**/*.{vue,html,jsx,tsx,css}'],
    exclude: ['node_modules', '.git'],
  },
})