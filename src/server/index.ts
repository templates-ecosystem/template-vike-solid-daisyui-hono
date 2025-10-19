import { Hono } from 'hono'
import { apply, serve } from '@photonjs/hono'

const app = new Hono()

// app.get('/api', (c) => {
//   return c.text('API Hello, World!')
// })

apply(app)

const port = +(process.env.PORT || 3000)

export default serve(app, { port })
