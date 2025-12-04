import type { Config } from 'vike/types'
import vikePhoton from 'vike-photon/config'
import vikeSolid from 'vike-solid/config'

// Default config (can be overridden by pages)
export default {
  prerender: {
    partial: true
  },
  extends: [
    vikeSolid,
    vikePhoton
  ],
  photon: {
    server: 'server/index.ts',
    standalone: {
      bundle: true,
      minify: true
    }
  }
} satisfies Config
