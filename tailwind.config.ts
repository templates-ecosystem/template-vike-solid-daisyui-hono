import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: [
    './src/**/*.{ts,tsx}'
  ],
  daisyui: {
    themes: ['dark']
  },
  plugins: [daisyui]
} satisfies Config
