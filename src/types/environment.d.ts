export { }

declare global {
  // eslint-disable-next-line no-var
  var __vikeNode: undefined | {
    isDev: boolean
    viteDevServer: import('vite').ViteDevServer
    setupHMRProxy: (req: IncomingMessage) => boolean
  }
}
