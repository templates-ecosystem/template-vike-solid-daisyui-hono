import type { Config } from 'vike/types'
import vikePhoton from 'vike-photon/config'
import vikeSolid from 'vike-solid/config'

export default {
  prerender: true,
  extends: [
    vikeSolid,
    vikePhoton
  ],
  photon: {
    server: 'server/index.ts'
  }
} satisfies Config
