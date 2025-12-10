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
    server: 'server/index.ts',
    standalone: {
      bundle: true
    }
  }
} satisfies Config
