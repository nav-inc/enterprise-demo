import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/use-user'

function App() {
  const user = useUser()
  const navigate = useNavigate()

  return (
    <div className="App-container">
      <h1 className="App-name">Hello {user.first_name}</h1>
      <h3>Here&apos;s the information you&apos;ve saved for your business:</h3>
      <p className="App-business-information">{user.business_name}</p>
      <p className="App-business-information">
        {user.business_state}, {user.business_zip}
      </p>
      <h3>Is this correct?</h3>
      <button
        className="App-confrim-business-button"
        onClick={(e) => {
          const target = e.target as HTMLButtonElement
          target.disabled = true
          target.textContent = 'Confirming...'
          fetch('/api/create-nav-account', { method: 'post' }).then((res) => {
            if (res.ok) {
              navigate('/cta')
            }
          })
        }}
      >
        Confirm Business
      </button>
    </div>
  )
}

export default App
