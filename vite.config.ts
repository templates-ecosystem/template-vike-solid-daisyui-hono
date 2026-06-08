import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import solidPlugin from 'vite-plugin-solid'
import type { UserConfig } from 'vite'

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    solidPlugin(),
    tailwindcss()
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext',
    outDir: '../dist',
    minify: true,
    emptyOutDir: true,
    cssMinify: 'lightningcss'
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src')
    }
  }
} satisfies UserConfig
