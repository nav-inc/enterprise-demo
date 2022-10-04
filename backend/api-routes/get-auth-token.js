const getAuthToken = require('../nav-service-calls/get-auth-token')

async function getAuthTokenLoggedInHandler(req, res) {
  const [authToken, authTokenError] = await getAuthToken(req.user.user_id)
  if (authTokenError) {
    return res.status(400).json({ error: 'Could not get auth token' })
  }
  res.json({ authToken })
}

module.exports = getAuthTokenLoggedInHandler
