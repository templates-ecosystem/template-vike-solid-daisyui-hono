import path from 'node:path'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import { plugin as vike } from 'vike/plugin'
import { vikeNode } from 'vike-node/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig } from 'vite'

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    vike(),
    vikeSolid(),
    vikeNode('server/index.ts')
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext',
    outDir: '../dist'
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src')
    }
  }
} satisfies UserConfig
