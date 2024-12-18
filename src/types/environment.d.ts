export { }

declare global {
  // eslint-disable-next-line no-var
  var __vikeNode: {
    isDev: boolean
    viteDevServer?: ViteDevServer
    setupHMRProxy: (req: IncomingMessage) => boolean
  }
}
