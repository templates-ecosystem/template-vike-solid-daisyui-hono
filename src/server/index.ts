import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import vike from 'vike-node/hono'

const port = +(process.env.PORT || 3000)

const app = new Hono()

app.get('/api', (c) => {
  return c.text('Hello, World!')
})

app.use(vike())

serve({
  fetch: app.fetch,
  port
}, () => console.log(`Server running at http://localhost:${port}`))
