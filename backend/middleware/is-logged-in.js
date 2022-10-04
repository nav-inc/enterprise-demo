const { getUserBySessionId } = require('../db')

function isLoggedInMiddleware(req, res, next) {
  if (!req.cookies.session_id) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const user = getUserBySessionId(req.cookies.session_id)
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  req.user = user
  next()
}

module.exports = isLoggedInMiddleware
