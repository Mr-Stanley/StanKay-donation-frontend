import React from 'react';


import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  return (
    <header className="bg-teal-700 text-white">
      {/* Top Bar */}
      <div className="bg-teal-800 flex justify-between items-center px-4 py-2 text-sm">
        <div className="flex space-x-4">
          <span>
            <i className="fas fa-phone mr-1"></i> +234-814-701-4806
          </span>
          <span>
            <i className="fas fa-envelope mr-1"></i> info@Stankay-donation@gmail.com
          </span>
          <span>
            <i className="fas fa-clock mr-1"></i> Mon–Fri / 9:00 AM – 19:00 PM
          </span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-gray-300">
            <i className="fab fa-instagram"></i>
          </a>
          {/* <a href="#" className="hover:text-gray-300">
            <i className="fab fa-behance"></i>
          </a> */}
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center px-4 py-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="/image.jpg" alt="Hand Icon" className="w-10 h-10 mr-2" />
          <div>
            <h1 className="text-2xl font-bold">StanKay</h1>
            <p className="text-xs">Donation Hub</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <a href="#" className="text-xl hover:text-gray-300">
            <i className="fas fa-search"></i>
          </a>
          <a
            href="#"
            className="bg-yellow-500 text-white px-4 py-2 rounded-full font-bold hover:bg-yellow-600"
          >
            Donate
          </a>
          <a href="#" className="text-xl hover:text-gray-300">
            <i className="fas fa-bars"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;