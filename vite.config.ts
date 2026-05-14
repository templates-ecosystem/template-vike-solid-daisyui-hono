import devServer from '@hono/vite-dev-server'
import standaloner from 'standaloner/vite'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { Plugin, UserConfig } from 'vite'

const { NODE_ENV, PORT } = process.env

const port = PORT ? parseInt(PORT) : 3000
const minify = false

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    ...NODE_ENV === 'production' ? [
      standaloner({
        bundle: {
          input: {
            index: '../dist/server/index.mjs'
          }
        },
        minify
      }),
      {
        name: 'emit-server-entrypoint',
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
    ] : [devServer({
      entry: 'server/dev-entrypoint.ts',
      // Can conflit the Vike's HMR, so avoid injecting the default Vite client script
      // since Hono's dev server already handles HMR and live reload functionality
      injectClientScript: false
    })],
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
