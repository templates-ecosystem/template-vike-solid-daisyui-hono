import telefunc from 'telefunc/vite'
import { plugin as vike } from 'vike/plugin'
import { vikeNode } from 'vike-node/plugin'
import type { UserConfig } from 'vite'

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    vike(),
    vikeNode('server/index.ts'),
    telefunc()
  ],
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  },
  build: {
    target: 'esnext',
    outDir: '../dist'
  }
} satisfies UserConfig
