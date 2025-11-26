import type { Config } from 'vike/types'
import vikePhoton from 'vike-photon/config'
import vikeSolid from 'vike-solid/config'

// Default config (can be overridden by pages)
export default {
  title: 'My Vike + Solid App', // <title>
  description: 'Demo showcasing Vike + Solid', // <meta name='description'>
  prerender: true,
  extends: [
    vikeSolid,
    vikePhoton
  ],
  photon: {
    server: 'server/index.ts',
    standalone: true
  }
} satisfies Config
