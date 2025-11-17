import type { Config } from 'vike/types'
import vikePhoton from 'vike-photon/config'
import vikeSolid from 'vike-solid/config'

// Default config (can be overridden by pages)
export default {
  // title: '', // <title>
  // description: '', // <meta name='description'>
  prerender: {
    partial: true
  },
  extends: [
    vikeSolid,
    vikePhoton
  ],
  photon: {
    server: process.env.NODE_ENV === 'production'
      // (Preview deployment OR Docker) + Vercel
      // run build:node-entry and then run preview or run node dist/server/index.mjs
      ? (process.env.ENTRY_NODE === 'true'
        // Preview deployment OR Docker
        ? 'server/entry.node.ts'
        // Vercel
        : 'server/index.ts')
      // development
      : 'server/index.ts'
  }
} satisfies Config
