import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import '../../styles/header.css'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const displayName = user?.fullName || user?.name || user?.email || 'Përdoruesi'

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="header">
      <h1 className="header-title">ProfitX</h1>
      <div className="header-user">
        <span className="header-user-name">{displayName}</span>
        <button type="button" className="header-logout" onClick={handleLogout}>
          Dil
        </button>
      </div>
    </header>
  )
}