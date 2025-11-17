import { cors } from 'hono/cors'
import { Hono } from 'hono/quick'
import { apply } from '@photonjs/hono'

import { handlerApi } from './handlers/handlerApi'

const app = new Hono()

app.use(cors())

app.post('/api/:functionName', handlerApi)

apply(app)

export default app
