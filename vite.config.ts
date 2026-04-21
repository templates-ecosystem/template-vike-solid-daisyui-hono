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
        isolated: true
      },
      minify
    }),
    vike(),
    vikeSolid(),
    {
      name: "emit-server-entrypoint",
      apply: "build",
      config() {
        return {
          environments: {
            ssr: {
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
      },
      configResolved(config) {
        const ssrBuild = config.environments?.ssr?.build
        if (!ssrBuild) return
        const rolldownOutput = ssrBuild.rolldownOptions?.output
        const rollupOutput = ssrBuild.rollupOptions?.output
        if (rolldownOutput) {
          console.log('rolldownOutput: YES');
          delete rolldownOutput.codeSplitting
          delete rolldownOutput.manualChunks
        }
        if (rollupOutput) {
          console.log('rollupOutput: YES');
          delete rollupOutput.manualChunks
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
