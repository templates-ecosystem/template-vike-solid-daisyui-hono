import vike from '@vikejs/hono'
import { Hono } from 'hono'

const app = new Hono()

app.get('/hello', (c) => {
  return c.text('API Hello, World!')
})

vike(app)

export default app
