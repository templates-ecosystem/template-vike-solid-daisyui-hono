import { useData } from 'vike-solid/useData'

function Page() {
  const data = useData<{ query: Record<string, string> }>()
  return (
    <>
      Hello World
      <br />
      Query: {JSON.stringify(data.query)}
    </>
  )
}

export { Page }
