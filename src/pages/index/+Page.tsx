import { useData } from 'vike-solid/useData'

function Page() {
  const data = useData<{ urlOriginal: string }>()
  return (
    <>
      Hello World
      <br />
      urlOriginal: {data.urlOriginal}
    </>
  )
}

export { Page }
