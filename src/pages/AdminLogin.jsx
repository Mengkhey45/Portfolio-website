import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { validateEmail } from '../utils/validation';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAdminAuth();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate login attempt
    setTimeout(() => {
      if (login(email)) {
        navigate('/admin/dashboard');
      } else {
        setError('Access denied. You are not authorized as an admin.');
        setEmail('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400">Sign in to manage your portfolio</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-white font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              disabled={isLoading}
            />
            <p className="text-slate-400 text-xs mt-2">
              Only the registered admin email can access this panel.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors duration-200"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Info Message */}
          <p className="text-slate-400 text-xs text-center mt-6">
            This is a secure area. Only authorized admins can access the dashboard.
          </p>
        </form>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm text-center">
            Demo email: mengkheykhorn8@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
