import type { DataAsync } from 'vike/types'

export const data: DataAsync<{ title: string }> = async (pageContext) => {
  const { id } = pageContext.routeParams
  return { title: id }
}
