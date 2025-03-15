import type { WritableAtom } from 'jotai'
import { Provider } from 'solid-jotai'
import { useData } from 'vike-solid/useData'

import HydrateAtoms from './HydrateAtoms'
import { titleState } from './atoms'
import Nested from './Nested'

const getInitialValues = (data: { title: string }) => {
  return [
    [titleState, data.title]
  ] as [WritableAtom<unknown, any[], any>, unknown][]
}

function Page() {
  const data = useData<{ title: string }>()

  return (
    <Provider>
      <HydrateAtoms initialValues={getInitialValues(data)}>
        <Nested />
      </HydrateAtoms>
    </Provider>
  )
}

export { Page }
