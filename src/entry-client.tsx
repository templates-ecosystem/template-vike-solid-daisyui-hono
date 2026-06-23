import { hydrate } from 'solid-js/web'

import { RouterApp } from './router/client'

hydrate(() => <RouterApp />, document.querySelector('#root') as HTMLDivElement)
