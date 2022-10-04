const fetch = require('node-fetch')

async function checkNavAccountExists(userID) {
  try {
    const response = await fetch(process.env.NAV_PARTNER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NAV_API_KEY,
        'x-partner-id': process.env.NAV_PARTNER_ID,
      },
      body: JSON.stringify({
        query: `
        query CheckAccountExists($userID: String!) {
            account(userID: $userID) {
                userID
            }
        }`,
        variables: {
          userID,
        },
      }),
    })

    const responseData = await response.json()

    // We didn't get account data back, the Nav user does not exist
    if (!responseData?.data?.account) {
      return [false, null]
    }
    // Nav user exists
    return [true, null]
    //
  } catch (error) {
    // Error when making the request
    return [null, error]
  }
}

module.exports = checkNavAccountExists
