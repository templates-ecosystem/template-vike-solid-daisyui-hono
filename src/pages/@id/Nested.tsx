import type { Component } from 'solid-js'
import { useAtomValue } from 'solid-jotai'

import { titleState } from './atoms'

const Nested: Component = () => {
  const title = useAtomValue(titleState)
  const otherPage = title() === 'Next' ? 'Prev' : 'Next'

  return (
    <>
      Current Page: {title()}

      <br />

      <br />

      <a href={`/${otherPage}`}>Go to "{otherPage}" Page</a>
    </>
  )
}

export default Nested
