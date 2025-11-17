### ▲ Adapt to Deploy on Vercel
- Create `/api/ssr.js`
  ```ts
  import app from '../dist/server/index.mjs'

  export const GET = app.fetch
  export const POST = app.fetch
  ```

- Update `/pages/+config.ts`
  ```diff
  import type { Config } from 'vike/types'
  import vikePhoton from 'vike-photon/config'
  import vikeSolid from 'vike-solid/config'

  export default {
    ...
    // Needed to generate /dist/server files
  + prerender: false,
    // OR
    // If you have path parameter pages and want to prerender all pages except the path parameter pages,
    // use prerender.partial=true in /pages/+config to prerender all pages and
    // use prerender=false in /pages/<pathParameter>/+config to disable prerender in that page and children pages
    // See https://vike.dev/prerender#partial
  + prerender: {
  +   partial: true
  + },
    extends: [
      vikeSolid,
      vikePhoton
    ],
    photon {
  -   server: 'server/index.ts'
      // Vercel
  +   server: process.env.NODE_ENV === 'production' ? 'server/index.ts' : 'server/entry.node.ts'
      // OR
  +   server: process.env.NODE_ENV === 'production'
        // (Preview deployment OR Docker) + Vercel
        // run build:node-entry and then run preview or run node dist/server/index.mjs
  +     ? (process.env.ENTRY_NODE === 'true'
          // Preview deployment OR Docker
  +       ? 'server/entry.node.ts'
          // Vercel
  +       : 'server/index.ts')
        // development
  +     : 'server/index.ts'
  +   }
    }
  } satisfies Config
  ```

- Create `/server/entry.node.ts`
  ```ts
  import { serve } from '@photonjs/hono'

  import app from './index'

  const port = +(process.env.PORT || 3000)

  export default serve(app, { port })
  ```

- Update `/server/index.ts`
  ```diff
  import { Hono } from 'hono'
  -import { apply, serve } from '@photonjs/hono'
  +import { apply } from '@photonjs/hono'

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
