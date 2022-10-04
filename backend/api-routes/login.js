const { getUserWithPasswordByEmail } = require('../db')
function loginHandler(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: 'Email and Password required' })
  }
  const user = getUserWithPasswordByEmail(req.body.email)
  if (!user) {
    return res.status(400).json({ error: 'Email and/or Password is incorrect' })
  }
  if (user.password === req.body.password) {
    res.cookie('session_id', user.user_id, {
      expires: new Date(Date.now() + 86_400_000),
      httpOnly: true,
    })
    return res.status(200).json({ success: 'true' })
  }
  res.status(400).json({ error: 'Email and/or Password is incorrect' })
}

module.exports = loginHandler
