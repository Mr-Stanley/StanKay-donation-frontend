import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const handleLogin = () => {
    // Handle login logic here (e.g., collect form data)
    console.log("Sign In clicked");
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
            <h2 className="text-2xl font-semibold">Sign In</h2>
            <Link to="/sign-up" className="text-teal-500 text-sm hover:underline">
              Don't have an account? Sign Up
            </Link>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder=""
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;