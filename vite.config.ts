import standaloner from 'standaloner/vite'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig } from 'vite'

const { NODE_ENV, PORT } = process.env

const port = PORT ? parseInt(PORT) : 3000
const minify = false

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    ...NODE_ENV === 'production' ? [
      standaloner({
        bundle: true,
        minify
      })
    ] : [],
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
