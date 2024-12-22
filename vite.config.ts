import { plugin as vike } from 'vike/plugin'
import { vikeNode } from 'vike-node/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig } from 'vite'
import viteApiAutoloader from './vitePluginApi'

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    vike(),
    vikeNode('server/index.ts'),
    vikeSolid(),
    viteApiAutoloader('server/api')
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
