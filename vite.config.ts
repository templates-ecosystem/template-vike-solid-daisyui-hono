import standaloner from 'standaloner/vite'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig, Plugin } from 'vite'

function devServerPlugin(): Plugin {
  return {
    name: 'vite:dev-server',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          try {
            const { default: app } = await server.ssrLoadModule('/server/index.ts')

            const protocol = req.headers['x-forwarded-proto'] || 'http'
            const host = req.headers.host || 'localhost'
            const url = new URL(req.url || '/', `${protocol}://${host}`)

            /** @link https://github.com/magne4000/universal-middleware/blob/main/packages/node/src/request.ts */
            const body = req.method === 'GET' || req.method === 'HEAD'
              ? undefined
              // Node's `fetch` (undici) accepts a Node `Readable` directly as body;
              // it converts internally with backpressure preserved
              : req as unknown as BodyInit

            const request = new Request(url.href, {
              method: req.method,
              headers: req.headers as HeadersInit,
              body
            })

            const response = await app.fetch(request)

            // If the Hono app doesn't find a route and falls back (e.g. static assets not seen by Vite),
            // we pass it back to Vite
            if (response.status === 404 && !url.pathname.startsWith('/api')) {
              return next()
            }

            res.statusCode = response.status
            for (const [name, value] of response.headers) {
              res.setHeader(name as string, value)
            }

            if (response.body) {
              const reader = response.body.getReader()
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                res.write(value)
              }
            }
            res.end()
          } catch (e) {
            next(e)
          }
        })
      }
    }
  }
}

const { NODE_ENV, PORT } = process.env

const port = PORT ? parseInt(PORT) : 3000
const minify = false

export default {
  root: 'src',
  cacheDir: '../.vite',
  plugins: [
    ...NODE_ENV === 'production' ? [
      standaloner({
        bundle: true,
        minify
      })
    ] : [
      devServerPlugin()
    ],
    vike(),
    vikeSolid()
  ],
  server: {
    port
  },
  build: {
    target: 'esnext',
    outDir: '../dist',
    emptyOutDir: true,
    minify
  }
} satisfies UserConfig
