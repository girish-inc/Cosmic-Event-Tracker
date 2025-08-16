import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for confirmation link!');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{backgroundColor: '#1E3A8A'}}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{color: '#1E3A8A'}}>
              Cosmic Event Tracker
            </h2>
            <p style={{color: '#1E3A8A'}}>
              Create your account
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                <p className="text-green-600 text-sm">{message}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-lg font-semibold mb-2" style={{color: '#1E3A8A'}}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2"
                style={{borderColor: '#1E3A8A', color: '#1E3A8A', focusRingColor: '#6B46C1'}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-lg font-semibold mb-2" style={{color: '#1E3A8A'}}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2"
                style={{borderColor: '#1E3A8A', color: '#1E3A8A', focusRingColor: '#6B46C1'}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-semibold mb-2" style={{color: '#1E3A8A'}}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2"
                style={{borderColor: '#1E3A8A', color: '#1E3A8A', focusRingColor: '#6B46C1'}}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  } glass-button-orange`}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </div>

            <div className="text-center">
              <p style={{color: '#1E3A8A'}}>
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium underline transition-colors"
                  style={{color: '#6B46C1'}}
                  onMouseEnter={(e) => e.target.style.color = '#553C9A'}
                  onMouseLeave={(e) => e.target.style.color = '#6B46C1'}
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;