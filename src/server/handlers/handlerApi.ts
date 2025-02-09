import type { Context } from 'hono'

import api from '../api'

export async function handlerApi(c: Context) {
  const rpcFunction = c.req.param('rpcFunction') as keyof typeof api
  if (!(rpcFunction in api)) {
    return c.json({ error: 'Function not found' }, 400)
  }
  try {
    return await api[rpcFunction](c)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Internal server error' }, 500)
  }
}
