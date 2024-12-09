import vikeSolid from 'vike-solid/config'
import vikeSolidQuery from 'vike-solid-query/config'
import type { Config } from 'vike/types'

export default {
  extends: [
    vikeSolid,
    vikeSolidQuery
  ]
} satisfies Config