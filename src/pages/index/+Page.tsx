import { createQuery } from '@tanstack/solid-query'
import { createSignal } from 'solid-js'
import { QueryBoundary } from 'vike-solid-query'

type DocType = string

const initialDoc = 'doc0'

const getUpdatedDoc = (): DocType => 'doc1'

function Page() {
  const [data, setData] = createSignal<DocType>(initialDoc)

  const query = createQuery<DocType>(() => ({
    initialData: initialDoc,
    queryKey: ['getUpdatedDoc'],
    queryFn: () => {
      const newDoc = getUpdatedDoc()
      setData(newDoc)
      return newDoc
    }
  }))

  return (
    <QueryBoundary query={query}>
      {() => data()}
    </QueryBoundary>
  )
}

export { Page }