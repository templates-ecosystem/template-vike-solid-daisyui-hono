import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
// import { logger } from 'hono/logger'
import autoloadRoutes from 'universal-autorouter'
import vike from 'vike-node/hono'

const pattern = process.env.NODE_ENV === 'production' ? '**/*.mjs' : '**/*.ts'

const app = await autoloadRoutes(new Hono(), {
  pattern,
  prefix: '/api',
  routesDir: './src/server/api',
  viteDevServer: globalThis.__vikeNode?.viteDevServer
})

app.use(cors())

// app.use(logger())

app.use(vike())

const port = +(process.env.PORT || 3000)

serve({
  fetch: app.fetch,
  port
}, () => console.log(`Server running at http://localhost:${port}`))
