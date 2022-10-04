const fetch = require('node-fetch')

async function createNavAccount(user) {
  try {
    const createAccountResponse = await fetch(process.env.NAV_PARTNER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NAV_API_KEY,
        'x-partner-id': process.env.NAV_PARTNER_ID,
      },
      body: JSON.stringify({
        query: `
            mutation CreateNavAccount(
              $userID: String!,
              $email: String,
              $businessName: String!,
              $businessState: String!,
              $businessZip: String!,
            ) {
              createAccount(
                userID: $userID,
                email: $email,
                businessName: $businessName,
                businessState: $businessState,
                businessZip: $businessZip,
              ) {
                userID
                email
                businesses {
                  name
                  duns
                  experianBIN
                  equifaxID
                }
              }
            }`,
        variables: {
          userID: user.user_id,
          email: user.email,
          businessName: user.business_name,
          businessState: user.business_state,
          businessZip: user.business_zip,
        },
      }),
    })
    const createAccountResponseData = await createAccountResponse.json()

    // Couldn't successfully create the account
    if (!createAccountResponseData?.data?.createAccount) {
      return [false, null]
    }
    // Account created
    return [true, null]
    //
  } catch (error) {
    // Error when making the request
    return [null, error]
  }
}

module.exports = createNavAccount
