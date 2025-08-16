import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 text-white p-6 shadow-lg z-50 mb-8" style={{backgroundColor: '#1E3A8A'}}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1"></div>
        
        <Link to="/" className="text-3xl font-bold text-white text-center flex-1">
          Cosmic Event Tracker
        </Link>
        
        <div className="flex-1 flex justify-end">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white font-medium">Welcome, {user.email}</span>
              <button
                onClick={signOut}
                className="glass-button-primary"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="glass-button-primary"
              >
                LOGIN
              </Link>
              <Link 
                to="/signup" 
                className="glass-button-primary"
              >
                SIGNUP
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;