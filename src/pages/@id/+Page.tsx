import { useData } from 'vike-solid/useData'

function Page() {
  const data = useData<{ title: string }>()
  const url = data.title === 'Next' ? 'Prev' : 'Next'
  return (
    <>
      Hello World

      <br />

      <a href={url}>{url}</a>
    </>
  )
}

export { Page }
