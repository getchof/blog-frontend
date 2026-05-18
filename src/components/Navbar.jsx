import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">✍️ BlogSpace</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">👤 {user.email}</span>
            <Link to="/create" className="btn-nav">New Post</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-nav">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar