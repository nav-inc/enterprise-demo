import { useEffect, useRef, useState } from 'react'
import useCtaConfig from '../hooks/use-cta-config'

let navCtaWidgetPromise: Promise<any>

function getNavCtaWidget() {
  navCtaWidgetPromise =
    navCtaWidgetPromise ??
    import(
      /* @vite-ignore */ window.location.origin + '/widget/nav-cta-widget.es.js'
      // We use the above url so we can test things in our dev environments, you will want to use the url below
      // https://unpkg.com/@navinc/cta-widget@1?module
    ).then((module) => module.default)
  return navCtaWidgetPromise
}

async function getAuthToken(): Promise<string> {
  const res = await fetch('/api/get-auth-token')
  const json = await res.json()
  return json.authToken
}

export default function Cta() {
  const { partner, env, contentSpace, dev } = useCtaConfig()
  const divRef = useRef<null | HTMLDivElement>(null)
  const navCtaWidgetRef = useRef<any>(null)
  const [cta, setCta] = useState<any>(null)

  useEffect(() => {
    getNavCtaWidget().then((navCtaWiget) => {
      navCtaWidgetRef.current = navCtaWiget({
        element: divRef.current,
        getAuthToken,
        env,
        contentSpace,
        partner,
        // We use dev for testing on our different environments - you can safely ignore it
        dev,
      })
      navCtaWidgetRef.current.on('cta', ({ cta }: any) => setCta(cta))
      navCtaWidgetRef.current.init()
    })
    return () => navCtaWidgetRef.current?.cleanup()
  }, [])

  return (
    <div className="Cta">
      <div className="Cta-container" ref={divRef}>
        {!cta ? (
          <div className="loader" />
        ) : (
          <>
            <img
              className="Cta-logo"
              src="https://assets.nav.com/design-assets/logos/Nav-Logo-110x60.png"
              alt="Logo of Nav Inc."
            />
            <img
              className="Cta-image"
              src={cta.imageURL}
              alt={cta.imageAltText}
            />
            <h2 className="Cta-title">{cta.title}</h2>
            <p className="Cta-body">{cta.body}</p>
            {cta.additionalDetails ? (
              <div className="Cta-details">
                <div>
                  <span className="Cta-details-header">Amount:</span>
                  <br />
                  <span>{cta.additionalDetails.fundingAmount}</span>
                </div>
                <div>
                  <span className="Cta-details-header">Cost:</span>
                  <br />
                  <span>{cta.additionalDetails.cost}</span>
                </div>
                <div>
                  <span className="Cta-details-header">Speed:</span>
                  <br />
                  <span>{cta.additionalDetails.fundingSpeed}</span>
                </div>
              </div>
            ) : null}
            <button className="Cta-button" data-nav-cta-button>
              {cta.linkText}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
