import type { Server } from 'vike/types'

import app from './index'

export default {
  fetch: app.fetch
} satisfies Server
