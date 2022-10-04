const path = require('node:path')
const { execSync } = require('node:child_process')
const { createProxyMiddleware } = require('http-proxy-middleware')
const express = require('express')
const compression = require('compression')

const spaRouter = express.Router()

spaRouter.use(
  '/widget',
  compression(),
  express.static(path.join(__dirname, './dist/widget'))
)

// In developent we use a dev server to handle auto refresh and HMR
// for frontend resources
if (process.env.NODE_ENV === 'development') {
  let gpUrl
  try {
    gpUrl = execSync('gp url 3000').toString().trim()
  } catch (error) {
    // not running in gitpod
  }
  spaRouter.use(
    '*',
    createProxyMiddleware({
      target: gpUrl || 'http://localhost:3000',
      changeOrigin: true,
    })
  )
} else {
  // For production use static assets
  spaRouter.use(
    '/assets',
    compression(),
    express.static(path.join(__dirname, './dist/frontend/assets'))
  )
  // Anything that doesn't match the /api/* or /assets/* routes should send
  // the index.html file to be handled by the client side SPA router
  spaRouter.use('*', compression(), (_req, res) => {
    res.sendFile(path.join(__dirname, './dist/frontend/index.html'))
  })
}

module.exports = spaRouter
