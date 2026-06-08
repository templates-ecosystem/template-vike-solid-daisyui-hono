import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig } from 'vite'

const { PORT } = process.env

const port = PORT ? Number.parseInt(PORT) : 3000
const minify = false

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    vike(),
    vikeSolid()
  ],
  server: {
    port
  },
  build: {
    target: 'esnext',
    outDir: '../dist',
    emptyOutDir: true,
    minify
  }
} satisfies UserConfig
