### ▲ Adapt to Deploy on Vercel
- Create `/api/ssr.js`
  ```ts
  import app from '../dist/server/index.js'

  export const GET = app.fetch
  export const POST = app.fetch
  ```

- Update `/pages/+config.ts`
  ```diff
  import type { Config } from 'vike/types'
  import vikeServer from 'vike-server/config'
  import vikeSolid from 'vike-solid/config'

  export default {
    ...
  // Needed to generate /dist/server files
  +  prerender: false
  // OR with at least another +config with prerender: false
  +  prerender: {
  +    partial: true
  +  }
    extends: [
      vikeSolid,
      vikeServer
    ],
  -  server: 'server/index.ts'
  +  // To run serve script, enable next line
  +  // server: 'server/entry.node.ts'
  +  server: process.env.NODE_ENV === 'production' ? 'server/index.ts' : 'server/entry.node.ts'
  } satisfies Config
  ```

- Create `/server/entry.node.ts`
  ```ts
  import { serve } from 'vike-server/hono/serve'

  import app from './index'

  const port = +(process.env.PORT || 3000)

  serve(app, { port })
  ```

- Update `/server/index.ts`
  ```diff
  import { Hono } from 'hono'
  import { apply } from 'vike-server/hono'
  -import { serve } from 'vike-server/hono/serve'

  const app = new Hono()

  apply(app)

  -const port = +(process.env.PORT || 3000)

  -serve(app, { port })
  +export default app
  ```

### ▲ Config Vercel Website
  - Go to create a [new project](https://vercel.com/new)
  - Search and import the repository
  - `Framework Preset` = `Vite`
  - `Root Directory` = `./`
  - `Build and Output Settings` → `Output Directory` = `dist/client`
  - Set evnironment variables
