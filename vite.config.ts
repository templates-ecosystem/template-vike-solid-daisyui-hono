import devServer from '@hono/vite-dev-server'
import standaloner from 'standaloner/vite'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig } from 'vite'

const minify = false

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    ...process.env.NODE_ENV === 'production' ? [] : [devServer({
      entry: 'server/dev-entrypoint.ts',
      injectClientScript: false
    })],
    standaloner({
      bundle: {
        input: {
          index: '../dist/server/index.mjs'
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
                    index: '/server/entrypoint.ts'
                  }
                }
              }
            }
          }
        }
      }
    }
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
