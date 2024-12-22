import type { Context } from 'hono'

import getData from '../../../utils/getData'

export default (c: Context) => {
  const data = getData()
  return c.json(data)
}
