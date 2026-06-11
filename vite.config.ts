import standaloner from 'standaloner/vite'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { Plugin, UserConfig } from 'vite'

const { NODE_ENV, PORT } = process.env

const port = PORT ? Number.parseInt(PORT) : 3000
const minify = false

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    ...NODE_ENV === 'production' ? [
      standaloner({
        bundle: true,
        minify
      }),
      {
        name: 'emit-server-index',
        apply: 'build',
        enforce: 'post',
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
                      index: 'server/entrypoint.ts'
                    }
                  }
                }
              }
            }
          }
        }
      } as Plugin
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
