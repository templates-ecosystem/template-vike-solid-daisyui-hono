import testTelefunc from '../../_telefunc/testTelefunc.telefunc'

function Page() {
  const onClick = () => async () => {
    testTelefunc()
  }
  return (
    <>
      <>Hello World</>

      <button onClick={onClick()}>Click me to Test Telefunc</button>
    </>
  )
}

export { Page }
