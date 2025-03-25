import type { Config } from 'vike/types'
import vikeServer from 'vike-server/config'
import vikeSolid from 'vike-solid/config'

export default {
  prerender: true,
  extends: [
    vikeSolid,
    vikeServer
  ],
  server: 'server/index.ts'
} satisfies Config
