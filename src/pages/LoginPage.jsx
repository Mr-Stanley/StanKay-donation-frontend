import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      const response = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      const data = await response.json();

       if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('isLoggedIn', 'true'); // Add this line
    localStorage.setItem('userName', data.user?.name || 'User'); // Add this
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/UserDashboard');
  }else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900 p-4 font-sora">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-800 to-purple-800 p-8 flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white animate-pulse"></div>
            <div className="absolute top-2/3 left-1/3 w-24 h-24 rounded-full bg-white animate-pulse delay-100"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-white animate-pulse delay-200"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
            <p className="text-indigo-200 text-lg mb-8">Feed a child today!</p>
            
            <div className="space-y-4">
              {[
                "Access exclusive content",
                "Track your progress",
                "Connect with community"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
                    <FiArrowRight className="text-white" />
                  </div>
                  <span className="text-indigo-100">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Right Panel - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white"
            >
              Sign In
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/sign-up" 
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium hover:underline flex items-center"
              >
                New here? <span className="ml-1">Sign up</span>
              </Link>
            </motion.div>
          </div>
          
          <motion.form 
            onSubmit={handleLogin} 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="your@email.com"
                  autoComplete="username"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400 hover:text-gray-300" />
                  ) : (
                    <FiEye className="text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <Link to="/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </motion.div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {error}
              </motion.p>
            )}
            
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isLoading}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Sign In 
                    <motion.span
                      animate={{ x: hovered ? 5 : 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                      className="ml-2"
                    >
                      <FiArrowRight />
                    </motion.span>
                  </span>
                )}
              </button>
            </motion.div>
          </motion.form>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-gray-800"
          >
            <p className="text-xs text-gray-500 text-center">
              By signing in, you agree to our <a href="#" className="text-indigo-400 hover:underline">Terms</a> and <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
