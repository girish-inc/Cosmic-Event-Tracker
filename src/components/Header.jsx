import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="bg-primary-900 border-b border-primary-700 px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">
            🌌 Cosmic Event Tracker
          </h1>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-primary-200">
              Welcome, {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header