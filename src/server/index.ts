import { Hono } from 'hono'
import { renderPage } from 'vike/server'

import apiRoutes from './api/index'

const app = new Hono()

// 1. CUSTOM API HANDLING
// All requests starting with /api will be passed to the apiRoutes router
app.route('/api', apiRoutes)

// 2. SERVER-SIDE RENDERING (Vike) HANDLING
// Catch-all: Everything that is not /api is passed to Vike
app.get('*', async (c, next) => {
  try {
    // Call Vike to render the page
    const pageContext = await renderPage({
      urlOriginal: c.req.url,
      headersOriginal: c.req.raw.headers,
      _reqWeb: c.req.raw
    })
    const { httpResponse } = pageContext

    // If Vike doesn't know what to do with the URL (e.g., no page exists for this route)
    if (!httpResponse) {
      return next()
    }

    // Vike provides a standard web stream for its response
    const readable = httpResponse.getReadableWebStream()
    return new Response(readable, {
      status: httpResponse.statusCode,
      headers: httpResponse.headers
    })
  } catch (error) {
    console.error('Error during Vike rendering:', error)
    return c.text('Internal Server Error', 500)
  }
})

export default app
