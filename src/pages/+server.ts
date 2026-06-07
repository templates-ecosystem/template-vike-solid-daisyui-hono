import type { Server } from 'vike/server'

import app from '../server/index'

export default {
  fetch: app.fetch
} satisfies Server
