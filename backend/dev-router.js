/**
 * The routes in this file are used during development and testing in our different envs
 *
 * You can safely ignore them
 */

const express = require('express')
const db = require('./db')
const getAuthToken = require('./nav-service-calls/get-auth-token')

async function getAuthTokenHandler(_req, res) {
  const user = db.getUserWithPasswordByEmail('demo1@example.com')
  const [authToken, authTokenError] = await getAuthToken(user.user_id)
  if (authTokenError) {
    return res.status(400).json({ error: 'Could not get auth token' })
  }
  res.json({ authToken })
}

const devApiRouter = express.Router()

devApiRouter.use('/dev/api/get-auth-token', getAuthTokenHandler)

module.exports = devApiRouter
