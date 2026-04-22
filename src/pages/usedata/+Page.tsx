import { useData } from 'vike-solid/useData'

function Page() {
  const data = useData<{ test: string }>()
  return (
    <>Hello World Test Use Data {data.test}</>
  )
}

export { Page }
