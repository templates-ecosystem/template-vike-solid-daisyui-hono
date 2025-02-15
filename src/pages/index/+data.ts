import type { DataAsync } from 'vike/types'

export const data: DataAsync = async (pageContext) => {
  console.log('pageContext.urlOriginal: ', pageContext.urlOriginal)
  return {
    urlOriginal: pageContext.urlOriginal
  }
}
