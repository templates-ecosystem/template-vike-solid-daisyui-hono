import standaloner from 'standaloner/vite'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { Plugin, UserConfig } from 'vite'

const minify = false

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    standaloner({
      bundle: true,
      minify
    }),
    vike(),
    vikeSolid(),
    {
      name: "emit-server",
      apply: "build",
      config() {
        return {
          environments: {
            ssr: {
              build: {
                rolldownOptions: {
                  input: {
                    index: '/server/entrypoint.ts'
                  }
                },
                minify
              }
            }
          }
        }
      }
    } as Plugin
  ],
  server: {
    port: 3000
  },
  build: {
    target: 'esnext',
    outDir: '../dist',
    emptyOutDir: true,
    minify
  }
} satisfies UserConfig
