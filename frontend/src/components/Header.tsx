import ghostLogo from '../images/Ghost.png'
export default function Header() {
  return (
    <div className="Header-container">
      <div className="Header-image-container">
        <img src={ghostLogo} alt="Spooky Ghost" className="Header-image" />
      </div>
      <div className="Header-logout-container">
        <div>
          <a href="/api/logout" className="Header-logout-button">
            Logout
          </a>
        </div>
      </div>
    </div>
  )
}
