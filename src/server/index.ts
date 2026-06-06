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
  const pageContextInit = {
    // c.req.url is a standard URL in Hono
    urlOriginal: c.req.url,
    // You can pass the original fetch Request object if needed in components
    fetchRequest: c.req.raw
  }

  try {
    // Call Vike to render the page
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext

    // If Vike doesn't know what to do with the URL (e.g., no page exists for this route)
    if (!httpResponse) {
      return next()
    }

    const { body, statusCode, headers } = httpResponse

    // Set the headers returned by Vike
    headers.forEach(([name, value]) => {
      c.header(name, value)
    })

    // Return the generated HTML with the appropriate status code (e.g., 200 or 404)
    c.status(statusCode as any)
    return c.body(body)
  } catch (error) {
    console.error('Error during Vike rendering:', error)
    return c.text('Internal Server Error', 500)
  }
})

export default app
