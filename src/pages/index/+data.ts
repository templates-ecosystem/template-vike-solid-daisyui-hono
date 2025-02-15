import type { DataAsync } from 'vike/types'

export const data: DataAsync = async (pageContext) => {
  return {
    urlOriginal: pageContext.urlOriginal
  }
}
