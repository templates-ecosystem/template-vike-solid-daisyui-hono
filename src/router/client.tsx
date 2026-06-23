import { createSignal } from 'solid-js'

export function RouterApp() {
  const [Page] = createSignal<any>(null)

  return (
    (() => {
      const P = Page()
      return <P />
    })()
  )
}
