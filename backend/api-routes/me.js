function meHandler(req, res) {
  res.json({
    user: req.user,
    ctaConfig: {
      partner: process.env.CLIENT_NAV_SUBDOMAIN,
      env: process.env.CLIENT_NAV_ENV,
      contentSpace: process.env.CLIENT_NAV_CONTENT_SPACE,
      // We use dev for testing on our different environments - you can safely ignore it
      dev: process.env.NAV_DEV_JSON
        ? JSON.parse(process.env.NAV_DEV_JSON.replace(/`/g, '"'))
        : null,
    },
  })
}

module.exports = meHandler
