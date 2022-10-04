const checkNavAccountExists = require('../nav-service-calls/check-nav-account-exists')
const createNavAccount = require('../nav-service-calls/create-nav-account')

async function createNavAccountHandler(req, res) {
  console.log('Checking if Nav account exists')
  const [accountExists, accountCheckErr] = await checkNavAccountExists(
    req.user.user_id
  )

  if (accountCheckErr) {
    return res.status(400).json({ error: 'Error verifying Nav account' })
  }

  if (!accountExists) {
    console.log('Nav account does not exists - creating...')
    const [accountCreated, accountCreatedError] = await createNavAccount(
      req.user
    )

    if (!accountCreated || accountCreatedError) {
      return res.status(400).json({ error: 'Account not created' })
    }
    console.log('Nav account was successfully created')
  }

  // Return a 200 ok if the account already exists or was successfully created
  res.status(200).end()
}

module.exports = createNavAccountHandler
