import vike from '@vikejs/hono'
import { Hono } from 'hono'

const app = new Hono()

vike(app)

export default app
