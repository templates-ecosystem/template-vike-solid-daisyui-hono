import { app } from '../dist/server/entrypoint.mjs'

console.log('App loaded:', typeof app)

console.log('App.fetch:', typeof app?.fetch)

export const GET = app.fetch
export const POST = app.fetch
