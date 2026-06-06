import { MY_SETTING } from '../dist/server/index.mjs'

export default async function handler(request, response) {
  const authHeader = request.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return response.status(401).json({ error: 'Not authorized' })
  }

  try {
    console.log('MY_SETTING:', MY_SETTING)
    console.log('CRON completed!')
    return response.status(200).json({ success: true, message: 'OK' })

  } catch (error) {
    console.error('Error during CRON:', error)
    return response.status(500).json({ error: 'Internal server error' })
  }
}
