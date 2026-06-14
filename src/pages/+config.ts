import type { Config } from 'vike/types'
import vikeSolid from 'vike-solid/config'

export default {
  prerender: {
    partial: true
  },
  extends: [
    vikeSolid
  ],
  server: 'import:../server/index.ts:default'
} satisfies Config
