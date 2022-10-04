const express = require('express')
const setupCleanupHelpers = require('./cleanup')
const devApiRouter = require('./dev-router')
const apiRouter = require('./api-routes/api-router')
const spaRouter = require('./spa-router')

const app = express()
const port = process.env.PORT || 4000

app.get('/healthcheck', (_req, res) =>
  res.json({
    status: 'ok',
  })
)

/**
 * DEV API ROUTES - We use these dev routes for testing on our different environments - you can safely ignore it
 */
if (process.env.NODE_ENV !== 'production') app.use(devApiRouter)

/**
 * BACKEND SERVER API ROUTES
 */
app.use(apiRouter)

/**
 * CLIENT SIDE SPA ROUTES
 */
app.use(spaRouter)

app.listen(port, () => {
  console.log(`Credit Revival app listening on port ${port}`)
})

setupCleanupHelpers()
