import standaloner from 'standaloner/vite'
import { plugin as vike } from 'vike/plugin'
import vikeSolid from 'vike-solid/vite'
import type { UserConfig, Plugin } from 'vite'

function customServerPlugin(): Plugin {
  return {
    name: 'custom-server-plugin',
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
              : new ReadableStream({
                start(controller) {
                  req.on('data', (chunk) => {
                    controller.enqueue(chunk)
                    if ((controller.desiredSize ?? 1) <= 0) req.pause()
                  })
                  req.on('end', () => controller.close())
                  req.on('error', (err) => controller.error(err))
                },
                pull() {
                  req.resume()
                },
                cancel(reason) {
                  req.destroy(reason instanceof Error ? reason : undefined)
                }
              })

            const request = new Request(url.href, {
              method: req.method,
              headers: req.headers as HeadersInit,
              body
            })

            const response = await app.fetch(request)

            // If the Hono app doesn't find a route and falls back (e.g., for static assets not seen by Vite), we pass it back to Vite
            if (response.status === 404 && !url.pathname.startsWith('/api')) {
              return next()
            }

            res.statusCode = response.status
            response.headers.forEach((value, name) => {
              res.setHeader(name, value)
            })

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
      customServerPlugin()
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
