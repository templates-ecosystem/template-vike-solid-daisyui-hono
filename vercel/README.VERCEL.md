### ▲ Adapt to Deploy on Vercel
- Install `@photonjs/vercel`
```sh
yarn add -D @photonjs/vercel
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
      server: 'server/index.ts',
      standalone: {
        bundle: true,
        minify: true
      }
    }
  } satisfies Config
  ```

- Create `/api/ssr.js`
  ```ts
  import app from '../dist/server/index.mjs'

  export const GET = app.fetch
  export const POST = app.fetch
  ```

- Create `/vercel.json`
  ```json
  {
    "outputDirectory": "dist/client",
    "installCommand": "yarn install --immutable",
    "rewrites": [
      {
        "source": "/((?!assets/).*)",
        "destination": "/api/ssr.js"
      }
    ]
  }
  ```

### ▲ Config Vercel Website
  - Go to create a [new project](https://vercel.com/new)
  - Search and import the repository
  - In the current **Settings**:
    - **Build and Deployment**
      - `Framework Preset` = `Vite`
      - `Root Directory` = `./`
      - `Build and Output Settings`
        → `Output Directory` = `dist/client`
        → `Install Command` = `yarn install --immutable`
    - **Environments**
      - Set evnironment variables
    - **Functions**
      - `Fluid Compute` = `Enabled`
