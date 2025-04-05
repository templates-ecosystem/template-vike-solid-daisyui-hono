import { Hono } from 'hono'
import { apply } from 'vike-server/hono'
import { serve } from 'vike-server/hono/serve'

const app = new Hono()

// app.get('/api', (c) => {
//   return c.text('API Hello, World!')
// })

apply(app)

const port = +(process.env.PORT || 3000)

serve(app, { port })
