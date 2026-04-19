import standaloner from 'standaloner/vite'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig } from 'vite'

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    standaloner({
      bundle: true
    }),
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
