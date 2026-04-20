import fs from 'node:fs'
import path from 'node:path'

const distFilePath = path.resolve('dist')
fs.cpSync(path.join(distFilePath, 'server'), path.join(distFilePath, 'client', 'server'), { recursive: true })
