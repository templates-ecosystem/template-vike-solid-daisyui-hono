import type { Context } from 'hono'
import { telefunc } from 'telefunc'

const telefuncHandler = async (c: Context) => {
  const httpResponse = await telefunc({
    url: c.req.url,
    method: c.req.method,
    body: await c.req.text()
  })
  return c.text(httpResponse.body, httpResponse.statusCode, { 'Content-Type': httpResponse.contentType })
}

export default telefuncHandler
