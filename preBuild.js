import fs from 'node:fs'
import path from 'node:path'

const distFilePath = path.resolve('src')

// Remove
fs.unlinkSync(path.join(distFilePath, 'pages', '+server.ts'))
console.log('✅ Removed: /dist/pages/+server.ts')
