import { defineConfig, mergeConfig, type Plugin, type UserConfig } from 'vite'
import solidPlugin, { type Options as SolidOptions } from "vite-plugin-solid";
import standaloner from 'standaloner/vite'

function overrideConfig(): Plugin {
  return {
    name: 'vite-plugin-vike-solid',
    config: () => ({
      optimizeDeps: {
        include: ['solid-js', 'vike-solid/__internal/integration/onRenderClient']
      }
    })
  }
}

type PluginInterop = Record<string, unknown> & { name: string }
function solid(options: Partial<SolidOptions> = {}): PluginInterop[] {
  const plugins: Plugin[] = [
    solidPlugin(
      mergeConfig(
        {
          ssr: true,
          typescript: {
            onlyRemoveTypeImports: true
          },
          solid: {
            hydratable: true
          },
        },
        options ?? {}
      )
    ),
    overrideConfig()
  ]
  return plugins as PluginInterop[]
}

const minify = false

export default defineConfig({
  root: 'src',
  cacheDir: '../.vite',
  environments: {
    ssr: {
      resolve: {
        noExternal: true
      },
      build: {
        emptyOutDir: true,
        rolldownOptions: {
          input: {
            index: '/server/entrypoint.ts'
          },
          output: {
            entryFileNames: '[name].mjs'
          }
        },
        minify
      }
    }
  },
  build: {
    target: 'esnext',
    outDir: '../dist',
    emptyOutDir: true,
    minify
  },
  plugins: [
    solid(),
    standaloner({
      bundle: {
        isolated: true,
        input: {
          index: '/dist/server/index.mjs'
        }
      },
      minify
    })
  ],
  server: {
    port: 3000
  }
}) satisfies UserConfig
