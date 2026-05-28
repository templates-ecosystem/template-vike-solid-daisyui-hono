import type { Server } from 'vike/types'

import { app } from '../server/entrypoint'

export default {
  fetch: app.fetch,
  entry: '../server/entrypoint.ts'
} satisfies Server
