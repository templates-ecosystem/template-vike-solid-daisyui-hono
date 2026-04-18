import path from 'node:path'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig } from 'vite'

process.env.SERVER_PATH = path.resolve(import.meta.dirname, 'src/server/index.ts')

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    vike(),
    vikeSolid()
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext',
    outDir: '../dist',
    emptyOutDir: true
  }
} satisfies UserConfig
