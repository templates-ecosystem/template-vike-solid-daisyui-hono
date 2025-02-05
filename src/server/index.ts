import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import vike from 'vike-node/hono'

import telefuncHandler from './telefunc-handler'

const app = new Hono()

app.get('/api', (c) => {
  return c.text('Hello, World!')
})

app.post('/_telefunc', telefuncHandler)

app.use(vike())

const port = +(process.env.PORT || 3000)

serve({
  fetch: app.fetch,
  port
}, () => console.log(`Server running at http://localhost:${port}`))
