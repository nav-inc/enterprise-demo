import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './Header'

export default function Layout() {
  const [user, setUser] = useState(null)
  const [ctaConfig, setCtaConfig] = useState(null)
  useEffect(() => {
    fetch('/api/me')
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Not authorized')
      })
      .then((res) => {
        setUser(res.user)
        setCtaConfig(res.ctaConfig)
      })
      .catch((e) => {
        console.log(e)
        window.location.assign('/api/logout')
      })
  }, [])

  return user ? (
    <>
      <Header />
      <div>
        <Outlet context={{ user, ctaConfig }} />
      </div>
    </>
  ) : null
}
