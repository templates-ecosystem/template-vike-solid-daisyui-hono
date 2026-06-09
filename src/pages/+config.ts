import type { Config } from 'vike/types'
import vikeSolid from 'vike-solid/config'

// Default config (can be overridden by pages)
export default {
  title: 'My Vike + Solid App', // <title>
  description: 'Demo showcasing Vike + Solid', // <meta name='description'>
  extends: [
    vikeSolid
  ]
} satisfies Config
