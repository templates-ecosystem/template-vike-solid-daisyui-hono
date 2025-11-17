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
    server: {
      id: 'server/index.ts',
      standalone: true
    }
  }
} satisfies Config
