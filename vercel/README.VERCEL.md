### ▲ Adapt to Deploy on Vercel
- Patch `@photonjs/runtime` with `yarn patch @photonjs/runtime`
  ```diff
  diff --git a/dist/vite-BkSS511f.js b/dist/vite-BkSS511f.js
  index f7de9fc41d47e66b9dfd4c5b21c98f02fb7328ff..40a1722aea77f36a1fb81d224087c3da13ded899 100644
  --- a/dist/vite-BkSS511f.js
  +++ b/dist/vite-BkSS511f.js
  @@ -138,27 +138,6 @@ function serve() {
            if (userPort) return code.replaceAll("process.env.PORT", JSON.stringify(String(userPort)));
          }
        }
  -		}),
  -		singleton({
  -			name: "photon:serve:emit",
  -			apply: "build",
  -			enforce: "post",
  -			config: {
  -				order: "post",
  -				handler(config) {
  -					const photon$2 = resolvePhotonConfig(config.photon);
  -					if (!photon$2.target || nodeTargets.has(photon$2.target)) return { environments: { [photon$2.defaultBuildEnv]: { build: { rollupOptions: { input: { index: "virtual:photon:serve-entry" } } } } } };
  -				}
  -			},
  -			configResolved({ photon: photon$2 }) {
  -				if (photon$2.server.id.includes("virtual:photon:wrap-fetch-entry:") && (!photon$2.target || nodeTargets.has(photon$2.target))) {
  -					photon$2.middlewares ??= [];
  -					photon$2.middlewares.push((condition) => {
  -						if (condition === "node") return "@photonjs/runtime/sirv";
  -					});
  -				}
  -			},
  -			sharedDuringBuild: true
      })
    ];
  }

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
  -   server: 'server/index.ts',
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
  +     : 'server/entry.node.ts'
  +   },
      standalone: {
        bundle: true,
        minify: true
      }
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
