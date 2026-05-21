#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { applyPatchMultiple } from 'depatcher'

console.log('⏳ Applying patches …')

await applyPatchMultiple({
  vike: {
    '/dist/node/vite/plugins/pluginUniversalDeploy.js': './scripts/patches/vike_pluginUniversalDeploy.patch'
  }
})

console.log('✅ Patches applied!')
