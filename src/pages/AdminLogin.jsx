import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/admin/login', {
        email: email.trim(),
        password: password.trim()
      });

      // Check for successful response structure
      if (response.data && response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        
        // Store admin data if available
        if (response.data.admin) {
          localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        }

        // Redirect to admin dashboard
        navigate('/AdminDashboard');
        return; // Important: Return after successful navigation
      }

      // Handle unexpected response structure
      throw new Error(response.data?.message || 'Login successful but no token received');

    } catch (err) {
      console.error('Login error:', err);
      
      // Handle different error types
      if (err.response) {
        // Server responded with error status
        setError(err.response.data.message || 'Login failed. Please check your credentials.');
      } else if (err.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection.');
      } else {
        // Other errors (including our custom error)
        // Only show error if it's not our success message
        if (err.message !== 'Login successful but no token received') {
          setError(err.message || 'An unexpected error occurred.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800">
      <div className="w-full max-w-md bg-black bg-opacity-60 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-purple-200">Sign in to continue</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 text-red-200 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-black bg-opacity-30 border border-white border-opacity-10 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;


