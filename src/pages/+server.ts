import type { Server } from 'vike/types'

import app from '../server/index'

export default {
  fetch: app.fetch,
  entry: '../server/entrypoint.ts'
} satisfies Server
