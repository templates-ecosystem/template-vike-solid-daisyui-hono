import type { Config } from 'vike/types'
import vikeSolid from 'vike-solid/config'

export default {
  prerender: false,
  extends: [
    vikeSolid
  ],
  server: process.env.NODE_ENV === 'production'
    ? 'import:./server/index.ts:default'
    : 'import:./server/entry.node.ts:default'
} satisfies Config
