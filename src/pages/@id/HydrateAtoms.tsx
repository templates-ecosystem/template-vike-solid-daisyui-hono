import type { Component, JSXElement } from 'solid-js'
import { useHydrateAtoms } from 'solid-jotai/utils'

/** @doc https://jotai.org/docs/guides/initialize-atom-on-render */
const HydrateAtoms: Component<{
  initialValues: Parameters<typeof useHydrateAtoms>[0]
  children: JSXElement
}> = (props) => {
  // initialising on state with prop on render here
  useHydrateAtoms(props.initialValues)
  return <>{props.children}</>
}

export default HydrateAtoms
