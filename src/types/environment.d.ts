export { }

declare global {
  // eslint-disable-next-line no-var
  var __vikeNode: undefined | {
    isDev: boolean
    viteDevServer?: ViteDevServer
    setupHMRProxy: (req: IncomingMessage) => boolean
  }
}
