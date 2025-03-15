import type { PageContext } from 'vike/types'

export const title = (pageContext: PageContext<{ title: string }>) => pageContext.data.title
