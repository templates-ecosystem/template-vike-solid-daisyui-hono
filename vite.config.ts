import path from 'node:path'
import { plugin as vike } from 'vike/plugin'
import { vikeNode } from 'vike-node/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig } from 'vite'

export default {
  root: 'src',
  cacheDir: path.resolve(import.meta.dirname, '.vite'),
  plugins: [
    vike(),
    vikeNode({
      entry: 'server/index.ts',
      standalone: true
    }),
    vikeSolid()
  ],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  build: {
    target: 'esnext',
    outDir: path.resolve(import.meta.dirname, 'dist')
  }
} satisfies UserConfig
