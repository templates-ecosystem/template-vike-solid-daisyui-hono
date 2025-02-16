import { useData } from 'vike-solid/useData'

function Page() {
  const data = useData<{ urlOriginal: string, userId: string }>()
  return (
    <>
      userId: {data.userId}
      <br />
      urlOriginal: {data.urlOriginal}
    </>
  )
}

export { Page }
