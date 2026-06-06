import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import standaloner from 'standaloner/vite'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig, Plugin } from 'vite'

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
      {
        /** @link https://github.com/magne4000/universal-middleware/blob/main/packages/node/src/request.ts */
        name: 'vite:dev-server',
        configureServer(server) {
          return () => {
            server.middlewares.use(async (req, res, next) => {
              try {
                const { default: app } = await server.ssrLoadModule('/server/index.ts')

                const protocol = req.headers['x-forwarded-proto'] || 'http'
                const host = req.headers.host || 'localhost'
                const url = new URL(req.url || '/', `${protocol}://${host}`)

                const webHeaders = new Headers()
                for (const [key, value] of Object.entries(req.headers)) {
                  if (key.startsWith(':')) continue // Ignore pseudo-headers HTTP/2

                  if (Array.isArray(value)) {
                    // Node can return an array for multiple headers (e.g. Accept or Cookie)
                    for (const v of value) {
                      webHeaders.append(key, v)
                    }
                  } else if (value !== undefined) {
                    webHeaders.set(key, value)
                  }
                }

                const body = req.method === 'GET' || req.method === 'HEAD'
                  ? undefined
                  // Use internal V8 bindings with backpressure that are more efficient than a manual wrapper
                  : Readable.toWeb(req) as ReadableStream

                const request = new Request(url.href, {
                  method: req.method,
                  headers: webHeaders,
                  body,
                  // @ts-expect-error
                  duplex: 'half'
                })

                // Hono + Vike will handle the request and return a response
                const response = await app.fetch(request)

                // Pass back to Vite if the Hono app doesn't find a route and falls back (e.g. static assets not seen by Vite)
                if (response.status === 404 && !url.pathname.startsWith('/api')) {
                  return next()
                }

                res.statusCode = response.status
                res.statusMessage = response.statusText

                const cookies = response.headers.getSetCookie()
                if (cookies.length > 0) {
                  res.setHeader('Set-Cookie', cookies)
                }
                for (const [name, value] of response.headers) {
                  if (name !== 'set-cookie') {
                    res.setHeader(name, value)
                  }
                }

                if (response.body) {
                  await pipeline(Readable.fromWeb(response.body as any), res)
                } else {
                  res.end()
                }
              } catch (e) {
                // If headers have already been sent, Vite cannot show the error overlay
                // We need to cut the connection to avoid leaving the client hanging
                if (res.headersSent) {
                  req.destroy(e instanceof Error ? e : new Error(String(e)))
                } else {
                  // If headers have NOT been sent, Vite can safely catch the error
                  // and show the red overlay in the browser (very convenient in dev)
                  next(e)
                }
              }
            })
          }
        }
      } as Plugin
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
