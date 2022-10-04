function logoutHandler(req, res) {
  res.cookie('session_id', '', {
    expires: new Date(1970, 0, 1),
    httpOnly: true,
  })
  res.redirect('/login')
}

module.exports = logoutHandler
