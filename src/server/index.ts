import { Hono } from 'hono'
import { apply } from '@photonjs/hono'

const app = new Hono()

// app.get('/api', (c) => {
//   return c.text('API Hello, World!')
// })

apply(app)

export default app
