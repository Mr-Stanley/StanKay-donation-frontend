import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSignUp = async () => {
    console.log('Sign Up button clicked', userProfile);
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', userProfile);
      console.log('Registration successful:', response.data);
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/3 bg-blue-200 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white">Lorem</h1>
          <p className="text-white mt-2">Lorem ipsum dolor sit amet</p>
        </div>
        {/* Right Panel */}
        <div className="w-2/3 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Create Account</h2>
            <Link to="/LoginPage" className="text-teal-500 text-sm hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your name"
                value={userProfile.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your email"
                value={userProfile.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your password"
                value={userProfile.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="h-4 w-4 text-teal-500" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the Terms and Privacy Policy.
              </label>
            </div>
            <button
              onClick={handleSignUp}
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;