import { parse } from 'node:url'
import type { DataAsync } from 'vike/types'

export const data: DataAsync = async (pageContext) => {
  const { query } = parse(pageContext.urlOriginal, true)

  return {
    query
  }
}
