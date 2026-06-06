import { Hono } from 'hono'

// Create a "sub-router" for the API
const apiApp = new Hono()

// Route: /api/hello
apiApp.get('/hello', (c) => {
  return c.json({ message: 'Hello from Hono-managed API!' })
})

// Route with dynamic parameter (e.g., /api/getUser)
apiApp.get('/:functionName', (c) => {
  const functionName = c.req.param('functionName')

  // Here you can implement a switch or strategy pattern
  if (functionName === 'status') {
    return c.json({ status: 'ok', time: new Date().toISOString() })
  }

  return c.json({ error: `Function ${functionName} not found` }, 404)
})

// Export the router to attach it to the main app
export default apiApp
