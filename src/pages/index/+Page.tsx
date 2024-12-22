import { useData } from 'vike-solid/useData'

function Page() {
  const { data } = useData<{ data: string[] }>()
  return (
    <>{JSON.stringify(data)}</>
  )
}

export { Page }
