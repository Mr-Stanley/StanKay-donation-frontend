import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCheck } from 'react-icons/fi';

const SignUpPage = () => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // Check password strength
  useEffect(() => {
    if (userProfile.password.length === 0) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    if (userProfile.password.length > 5) strength += 1;
    if (userProfile.password.length > 8) strength += 1;
    if (/[A-Z]/.test(userProfile.password)) strength += 1;
    if (/[0-9]/.test(userProfile.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(userProfile.password)) strength += 1;
    
    setPasswordStrength(Math.min(strength, 5));
  }, [userProfile.password]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setMessage('Please accept the terms and conditions');
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/user/register', userProfile);
      setMessage('🎉 Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/LoginPage', { state: { registered: true } });
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
      console.error('API error:', error.message, error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return colors[passwordStrength - 1] || 'bg-gray-200';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Left Panel - Visual Appeal */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 p-8 flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute top-2/3 left-1/3 w-24 h-24 rounded-full bg-white"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-white"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Join Our Community</h1>
            <p className="text-purple-100 text-lg mb-6">Start your journey with us today</p>
            
            <div className="space-y-4">
              {[
                "Exclusive member benefits",
                "Personalized experience",
                "Secure data protection"
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                    <FiCheck className="text-white" />
                  </div>
                  <span className="text-purple-100">{item}</span>
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
              className="text-3xl font-bold text-gray-800"
            >
              Create Account
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/LoginPage" 
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium hover:underline flex items-center"
              >
                Already have an account? <span className="ml-1">Sign In</span>
              </Link>
            </motion.div>
          </div>
          
          <motion.form 
            onSubmit={handleSignUp} 
            className="space-y-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your username"
                  value={userProfile.username}
                  onChange={handleInputChange}
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                  value={userProfile.email}
                  onChange={handleInputChange}
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your password"
                  value={userProfile.password}
                  onChange={handleInputChange}
                />
              </div>
              {userProfile.password && (
                <div className="mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i} 
                        className={`h-1 flex-1 rounded-full ${i <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {passwordStrength < 3 ? 'Weak' : passwordStrength < 5 ? 'Good' : 'Strong'} password
                  </p>
                </div>
              )}
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                />
              </div>
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
              </label>
            </motion.div>
            
            {message && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}
              >
                {message}
              </motion.p>
            )}
            
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'SIGN UP'}
              </button>
            </motion.div>
          </motion.form>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;

