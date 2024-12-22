import path from 'node:path'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import vike from 'vike-node/hono'
import autoloadRoutes from 'universal-autorouter'

const pattern = process.env.NODE_ENV === 'production' ? '**/*.mjs' : '**/*.ts'

const app = await autoloadRoutes(new Hono(), {
  pattern,
  prefix: '/api',
  routesDir: path.resolve(import.meta.dirname, 'api'),
  viteDevServer: globalThis.__vikeNode?.viteDevServer
})

app.use(vike())

const port = +(process.env.PORT || 3000)

serve({
  fetch: app.fetch,
  port
}, () => console.log(`Server running at http://localhost:${port}`))
