import type { UserConfig } from 'vite'

export default {
  root: 'src',
  cacheDir: '../.vite',
  server: {
    port: 3000
  },
  environments: {
    client: {
      build: {
        outDir: '../dist/client',
        emptyOutDir: true,
        cssMinify: true,
        manifest: true,
        rolldownOptions: {
          input: 'entry-client.tsx',
        }
      }
    }
  }
} satisfies UserConfig
