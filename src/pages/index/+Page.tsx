import { useData } from 'vike-solid/useData'

function Page() {
  const data = useData<{ urlOriginal: string }>()
  return (
    <>
      Hello World
      <br />
      Data: {JSON.stringify(data)}
    </>
  )
}

export { Page }
