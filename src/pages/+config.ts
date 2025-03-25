import type { Config } from 'vike/types'
import vikeServer from 'vike-server/config'
import vikeSolid from 'vike-solid/config'

// Default config (can be overridden by pages)
export default {
  title: 'My Vike + Solid App', // <title>
  description: 'Demo showcasing Vike + Solid', // <meta name='description'>
  prerender: true,
  extends: [
    vikeSolid,
    vikeServer
  ],
  server: 'server/index.ts'
} satisfies Config
