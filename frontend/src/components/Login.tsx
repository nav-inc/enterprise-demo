import { useState } from 'react'
import ghostImage from '../images/Ghost.png'

export default function Login() {
  const [error, setError] = useState('')

  function loginUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    fetch('/api/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
    })
      .then((res) => {
        if (res.ok) {
          window.location.assign('/')
          return
        }
        return res.json()
      })
      .then((errorResponse) => {
        if (errorResponse) {
          setError(errorResponse.error)
        }
      })
      .catch(() => {
        setError('Something went wrong')
      })
  }

  return (
    <>
      <form
        action="/api/login"
        method="post"
        onSubmit={loginUser}
        className="Login-form"
      >
        <div>
          <h1 className="Login-title">Credit Revival</h1>
        </div>
        <div className="Login-image-container">
          <img src={ghostImage} alt="spooky ghost" className="Login-image" />
        </div>
        <div className="Login-email-password-form">
          <div>
            <label htmlFor="email" className="Login-input-label">
              Email:
            </label>
            <input
              type="text"
              placeholder="test@email.com"
              className="Login-input"
              id="email"
              defaultValue="demo1@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="Login-input-label">
              Password:
            </label>
            <input
              type="password"
              placeholder="password"
              className="Login-input"
              id="password"
              defaultValue="nav-demo-site-password"
              required
            />
          </div>
        </div>
        <div>
          <button type="submit" className="Login-submit-button">
            Login
          </button>
        </div>
        {error ? (
          <div>
            <p className="Login-error">{error}</p>
          </div>
        ) : null}
      </form>
    </>
  )
}
