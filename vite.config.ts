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
      bundle: {
        isolated: true,
        input: {
          index: '../dist/server/entrypoint.mjs'
        }
      },
      minify
    }),
    vike(),
    vikeSolid(),
    {
      name: 'emit-server-entrypoint',
      apply: 'build',
      config() {
        return {
          environments: {
            ssr: {
              resolve: {
                noExternal: true
              },
              build: {
                rolldownOptions: {
                  input: {
                    entrypoint: '/server/entrypoint.ts'
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
