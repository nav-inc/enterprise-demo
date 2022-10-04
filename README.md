# Enterprise Demo

A demo application showing how to integrate Nav's embeded widget. See a running example of this [demo](https://ent-demo.sandbox.nav.com), or for more information, vist our docs at [https://developer.nav.com/](https://developer.nav.com/docs/guides/embedded-widget/).

## Running the application locally

### Setting up environment variables

Copy the `.env.example` file in the backend directory.

```sh
cp backend/.env.example backend/.env
```

Once copied over, fill out the needed values in the `backend/.env` file. Please only use your sandbox API key and Partner ID credentials for running this demo site locally - never your production credentials.

_Targeting the Sandbox env to test against:_

```sh
NAV_API_KEY=validSandBoxKey
NAV_PARTNER_ID=validSandboxID
NAV_PARTNER_API_URL=https://api.sandbox.nav.com/partners/graphql

CLIENT_NAV_CONTENT_SPACE=validContentSpaceForPartner
CLIENT_NAV_SUBDOMAIN=validPartnerSubdomain
CLIENT_NAV_ENV=sandbox
```

### Starting the application

```sh
npm i
npm run dev
# Then open http://localhost:4000
```

This starts up the [Express](https://expressjs.com/) backend server and the frontend [Vite](https://vitejs.dev/) dev server using [concurrently](https://www.npmjs.com/package/concurrently). The demo site is built as an SPA using the backend for frontend pattern. All requets go first to the Express server and then, if they don't match any defined backend api route, are proxied on to the frontend Vite dev server to be processed - `backend/index.js`.