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
    server: 'server/index.ts'
  }
} satisfies Config
