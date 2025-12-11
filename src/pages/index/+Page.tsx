import { useData } from 'vike-solid/useData'

function Page() {
  const data = useData<{ message: string }>()
  return (
    <>{data.message}</>
  )
}

export { Page }
