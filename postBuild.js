import fs from 'node:fs'
import path from 'node:path'

const distFilePath = path.resolve('dist')

// Move
// - /dist/server/entrypoint.mjs → /dist/server/index.mjs
fs.renameSync(path.join(distFilePath, 'server', 'entrypoint.mjs'), path.join(distFilePath, 'server', 'index.mjs'))

// Remove
// - /dist/server/chunks
// - /dist/server/entry.mjs
fs.rmSync(path.join(distFilePath, 'server', 'chunks'), { recursive: true, force: true })
fs.unlinkSync(path.join(distFilePath, 'server', 'entry.mjs'))

// Debug
// - Copy server from dist/server to dist/client/server
fs.cpSync(path.join(distFilePath, 'server'), path.join(distFilePath, 'client', 'server'), { recursive: true })
