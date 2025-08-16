import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import LoadingSpinner from './components/LoadingSpinner'

// Component to handle initial route based on auth state
const AppRoutes = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-950">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" replace /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={user ? <Navigate to="/" replace /> : <Signup />} 
      />
      
      {/* Protected routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/event/:id" 
        element={
          <ProtectedRoute>
            <EventDetail />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route */}
      <Route 
        path="*" 
        element={<Navigate to={user ? "/" : "/login"} replace />} 
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-primary-950">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
