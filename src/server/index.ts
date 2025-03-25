import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { apply } from 'vike-server/hono'

const app = new Hono()

// app.get('/api', (c) => {
//   return c.text('API Hello, World!')
// })

apply(app)

const port = +(process.env.PORT || 3000)

serve({
  fetch: app.fetch,
  port
}, () => console.log(`Server running at http://localhost:${port}`))
