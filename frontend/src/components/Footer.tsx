import { ReactNode } from 'react'

export default function Footer({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <div className="Footer-container">
        <h4>
          This is a demo site showing how to integrate with Nav&apos;s CTA
          service. Visit the docs to{' '}
          <a href="https://developer.nav.com/docs/guides/embedded-widget/">
            learn more
          </a>
          .
        </h4>
      </div>
    </>
  )
}
