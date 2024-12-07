import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
// import { logger } from 'hono/logger'
import { autoloadRoutes } from 'hono-autoloader'
import vike from 'vike-node/hono'

const port = +(process.env.PORT || 3000)

const app = new Hono()

app.use(cors())

// app.use(logger())

let unregister
if (process.env.NODE_ENV === 'production') {
  unregister = () => { }
} else {
  const { register } = await import('tsx/esm/api')
  // Register tsx enhancement
  unregister = register()
}

await autoloadRoutes(
  app,
  {
    pattern: '**/*.ts',
    prefix: '/api',
    routesDir: './src/server/api'
  }
)

// Unregister when needed
unregister()

app.use(vike())

serve(
  {
    fetch: app.fetch,
    port
  },
  () => console.log(`Server running at http://localhost:${port}`)
)
