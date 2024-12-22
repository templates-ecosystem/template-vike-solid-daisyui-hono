import fs from 'node:fs'
import path from 'node:path'
import { build, type Plugin, type ResolvedConfig } from 'vite'

type PluginOptions = {
  entry: string // File path to bundle
  pattern?: string // File path pattern to bundle
}

export default function bundleFilesPlugin(options: string | PluginOptions): Plugin {
  let isBuild: boolean
  let config: ResolvedConfig
  return {
    name: 'vite-plugin-api-autorouter',
    enforce: 'post',
    config(_config, { command }) {
      isBuild = command === 'build'
    },
    configResolved: (config_) => {
      if (!isBuild) return
      config = config_
    },
    async buildStart() {
      if (!isBuild) return
      const { entry, pattern = '**/*.ts' } = typeof options === 'string' ? { entry: options } : (options as PluginOptions)

      const entryFull = path.resolve(config.root, entry)
      const outFull = path.resolve(config.root, config.build.outDir)

      const filepaths = fs.globSync(pattern, { cwd: entryFull })

      // const entries: Record<string, string> = {}
      // for (const filepath of filepaths) {
      //   const targetFilepath = path.resolve(outFull, filepath)
      //   const targetDir = path.dirname(targetFilepath)
      //   fs.mkdirSync(targetDir, { recursive: true })
      // }
      // const entries = filepaths.map((filepath) => path.resolve(entryFull, filepath).replaceAll('\\', '/'))

      // Create an input map for Rollup
      const entries: Record<string, string> = {}
      for (const rawFilepath of filepaths) {
        // Normalize file paths for Windows
        const filepath = rawFilepath.replaceAll('\\', '/')
        // Use relative paths as keys to preserve directory structure
        const resolvedFilepath = path.resolve(entryFull, filepath)
        // const relativePath = path.relative(entryFull, resolvedFilepath)
        const relativePath = filepath.replace(/\.ts$/, '')
        entries[relativePath] = resolvedFilepath
      }

      // Run a build for each file
      await build({
        configFile: false, // Avoid conflicts with the main Vite config
        build: {
          ssr: true,
          target: 'esnext',
          rollupOptions: {
            input: entries,
            output: {
              dir: outFull, // Directory for this specific file
              format: 'esm',
              entryFileNames: 'api/[name].mjs', // File name pattern
              chunkFileNames: 'chunks/chunk-[hash].mjs' // Output for chunks
            }
          },
          emptyOutDir: false // Do not clear the output folder for incremental builds
        },
        ...config.resolve && { resolve: config.resolve }
      })
    }
  }
}
