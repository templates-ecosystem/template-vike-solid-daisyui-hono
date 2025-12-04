import { cors } from 'hono/cors'
import { Hono } from 'hono/quick'
import { apply, serve } from '@photonjs/hono'

import { handlerApi } from '@/server/handlers/handlerApi'

const app = new Hono()

app.use(cors())

app.post('/api/:functionName', handlerApi)

apply(app)

const port = +(process.env.PORT || 3000)

export default serve(app, { port })
