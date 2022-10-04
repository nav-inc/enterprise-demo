const express = require('express')
const cookieParser = require('cookie-parser')
const isLoggedInMiddleware = require('../middleware/is-logged-in')
const loginHandler = require('./login')
const meHandler = require('./me')
const logoutHandler = require('./logout')
const getAuthTokenHandler = require('./get-auth-token')
const createNavAccountHandler = require('./create-nav-account')

const apiRouter = express.Router()

apiRouter.use(express.json())
apiRouter.use(cookieParser())

apiRouter.post('/api/login', loginHandler)
apiRouter.use('/api/logout', logoutHandler)
apiRouter.use('/api/me', isLoggedInMiddleware, meHandler)

apiRouter.use(
  '/api/create-nav-account',
  isLoggedInMiddleware,
  createNavAccountHandler
)
apiRouter.use('/api/get-auth-token', isLoggedInMiddleware, getAuthTokenHandler)

apiRouter.use('/api/*', (_req, res) => {
  res.status(404).end('Not Found')
})

module.exports = apiRouter
