const fetch = require('node-fetch')

async function getNavAuthToken(userID) {
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
        query GetAuthToken($userID: String!) {
            authToken(userID: $userID)
        }`,
        variables: {
          userID,
        },
      }),
    })
    const responseData = await response.json()

    // We didn't get a auth token back
    if (!responseData?.data?.authToken) {
      return [null, new Error('Nav auth token was not returned')]
    }
    // We got a Nav auth token
    return [responseData.data.authToken, null]
    //
  } catch (error) {
    // Error when making the request
    return [null, error]
  }
}

module.exports = getNavAuthToken
