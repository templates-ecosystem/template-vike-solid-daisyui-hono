# template-vike-solid-daisyui-hono

### 📚 Template stack
- **Vike**
- **Solid**
- **DaisyUI**
- **Hono**
- **ESLint**
- **TypeScript**

<a href="https://github.com/tandpfun/skill-icons">
  <img align="center" src="https://skills-icons.vercel.app/api/icons?i=vike,solid,daisyui,hono,eslint,ts" />
</a>

### ⬇️ Clone
```sh
git clone https://github.com/templates-ecosystem/template-vike-solid-daisyui-hono.git
```

### ⚙️ Install
```sh
yarn
```

### 🚀 Start
```sh
yarn dev
```

### ▲ Deploy on Vercel
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
    extends: [
      vikeSolid,
      vikeServer
    ],
  -  server: 'server/index.ts'
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

- On Vercel:
  - Go to create a [new project](https://vercel.com/new)
  - Search and import the repository
  - `Framework Preset` = `Vite`
  - `Root Directory` = `./`
  - `Build and Output Settings` → `Output Directory` = `dist/client`
  - Set evnironment variables
