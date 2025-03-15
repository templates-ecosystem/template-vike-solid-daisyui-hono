import 'vlitejs/vlite.css'
import { createSignal, onCleanup, onMount } from 'solid-js'
import Vlitejs from 'vlitejs'

function Page() {
  const [videoRef, setVideoRef] = createSignal<HTMLVideoElement>()

  onMount(() => {
    if (videoRef()) {
      const player = new Vlitejs(videoRef()!, {
        options: {
          autoHide: true
        }
      })

      onCleanup(() => {
        player.destroy()
      })
    }
  })

  return (
    <video ref={setVideoRef} class="vlite-js" src="https://yoriiis.github.io/cdn/static/vlitejs/demo-video-html5.mp4" />
  )
}

export { Page }
