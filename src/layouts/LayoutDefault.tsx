import './styles.css'

import type { JSX } from 'solid-js'
import { usePageContext } from 'vike-solid/usePageContext'

function Content(props: { children: JSX.Element }) {
  return (
    <div id="page-container">
      <div
        id="page-content"
        style={{
          padding: '20px',
          'padding-bottom': '50px',
          'min-height': '100vh'
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

export function LayoutDefault(props: { children?: JSX.Element }) {
  const pageContext = usePageContext()
  return (
    <div
      style={{
        display: 'flex',
        'max-width': '900px',
        margin: 'auto'
      }}
    >
      <Content>{props.children}</Content>

      URL Pathname: {pageContext.urlPathname}
    </div>
  )
}
