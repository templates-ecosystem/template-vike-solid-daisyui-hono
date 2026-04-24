import type { Config } from 'vike/types'
import vikeSolid from 'vike-solid/config'

export default {
  prerender: {
    partial: true
  },
  extends: [
    vikeSolid
  ],
  serverEntrypoint: 'import:../server/entrypoint.ts:default'
} satisfies Config
