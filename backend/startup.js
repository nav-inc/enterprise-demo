const {
  NAV_API_KEY,
  NAV_PARTNER_ID,
  NAV_PARTNER_API_URL,
  CLIENT_NAV_CONTENT_SPACE,
  CLIENT_NAV_SUBDOMAIN,
  CLIENT_NAV_ENV,
} = process.env

if (
  !NAV_API_KEY ||
  !NAV_PARTNER_ID ||
  !NAV_PARTNER_API_URL ||
  !CLIENT_NAV_CONTENT_SPACE ||
  !CLIENT_NAV_SUBDOMAIN ||
  !CLIENT_NAV_ENV
) {
  console.error(
    'Required ENVS have not been set. Look at the .env.example file for reference on what is needed'
  )
  process.exit(1)
}
