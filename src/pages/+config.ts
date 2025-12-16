import type { Config } from 'vike/types'
import vikePhoton from 'vike-photon/config'
import vikeSolid from 'vike-solid/config'

export default {
  prerender: false,
  extends: [
    vikeSolid,
    vikePhoton
  ],
  photon: {
    server: process.env.NODE_ENV === 'production' ? 'server/index.ts' : 'server/entry.node.ts',
    standalone: {
      bundle: true
    },
    target: 'vercel'
  }
} satisfies Config
