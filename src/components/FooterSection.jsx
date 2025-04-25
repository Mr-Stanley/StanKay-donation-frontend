import React from 'react';
import 'animate.css'; 
import photo1 from '/photostream1.jpg';
import photo2 from '/photostream2.jpg';
import photo3 from '/photostream3.jpg';
import photo4 from '/photostream4.webp';
import photo5 from '/photostream5.webp';
import photo6 from '/photostream6.webp';


const FooterSection = () => {
    const photos = [photo1, photo2, photo3, photo4, photo5, photo6];

  return (
   
    <div className=" w-full">
         <h1 className="text-4xl font-bold text-center text-yellow-500 mb-8 animate__animated animate__fadeInDown">
         Our World Wide Partner</h1>
        <div className=" py-8 w-full">
          <div className="max-w-3xl mx-auto px-2 flex justify-between items-center flex-wrap gap-2">
            <img src="/semicolon-logo.svg" alt="Logo 1" className="h-10 animate__animated animate__fadeIn" />
            <img src="/samsung-logo.png" alt="Logo 2" className="h-10 animate__animated animate__fadeIn" />
            <img src="/sui-logo.jpeg" alt="Logo 3" className="h-10 animate__animated animate__fadeIn" />
            <img src="/amazon-logo.png" alt="Logo 4" className="h-10 animate__animated animate__fadeIn" />
          </div>
        </div>

        <footer className=" w-[100%]">
          <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
            className="relative text-white p-8 rounded-lg w-full"
            style={{
              backgroundImage: `url('/footer-bg.jpg')`, 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            >
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg "></div>
            <div className="relative z-10 animate__animated animate__fadeInLeft mt-10">
              <div className="flex items-center mb-4 mt-10">
                <img src="/image.jpg" alt="Gracious Logo" className="h-10 mr-2" />
                <h3 className="text-xl font-bold">StanKay Donation Hub</h3>
              </div>
``
              <p className="text-sm mb-4 mt-10">
              </p>
              <p>  
              </p>

              <p className="text-sm mb-2 mt-10">
                312, Sabo Yaba Lagos State, Nigeria.
              </p>

              <p className="text-sm mb-2 mt-10">+234-814-701-4806</p>

              <p className="text-sm mb-2 mt-10">info@StanKay-donation@gmail.com</p>

              <p className="text-sm mb-4 mt-10">Mon - Fri / 9:00 AM - 19:00 PM</p>

              <div className="flex space-x-15 mt-30">
                <a href="#" className="text-white hover:text-amber-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-amber-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-amber-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.4 2.86 8.13 6.84 9.45.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A9.96 9.96 0 0022 12c0-5.5-4.46-9.96-9.96-9.96z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-amber-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.165c-3.338.403-4.038-1.61-4.038-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.467-2.382 1.235-3.222-.123-.304-.535-1.528.117-3.184 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0112 5.803c1.02-.005 2.047.138 3.006.404 2.29-1.553 3.297-1.23 3.297-1.23.653 1.656.241 2.88.118 3.184.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 21.798 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-amber-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.615 3.184c-1.02-.45-2.117-.757-3.27-.897C15.15 2.12 13.72 2 12 2s-3.15.12-4.345.287c-1.153.14-2.25.447-3.27.897C2.154 4.04 1 5.95 1 8.5v7c0 2.55 1.154 4.46 2.385 5.316 1.02.45 2.117.757 3.27.897C7.85 21.88 9.28 22 11 22h2c1.72 0 3.15-.12 4.345-.287 1.153-.14 2.25-.447 3.27-.897C21.846 19.96 23 18.05 23 15.5v-7c0-2.55-1.154-4.46-2.385-5.316zM12 17.5c-3.038 0-5.5-2.462-5.5-5.5S8.962 6.5 12 6.5 17.5 8.962 17.5 12 15.038 17.5 12 17.5zm6.5-11.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="p-8 animate__animated animate__fadeInRight">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Update Every Week</h3>
            <div className="flex mb-8">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="flex-grow p-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="bg-teal-600 text-white font-semibold p-3 rounded-r-full hover:bg-teal-700 transition duration-300">
                Subscribe Now
              </button>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-4">Our Photostream</h4>
            <div className="grid grid-cols-2 gap-2 w-100 h-50 mb-8">
              {photos.map((image, index) => (
                <img key={index} src={image} alt={`Photostream ${index + 1}`} className="w-full h-16 object-cover rounded" />
              ))}
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-4">About Us</h4>
            <ul className="text-gray-600 space-y-2 mb-8">
              <li>
                <a href="#" className="hover:text-amber-500">
                  Our History
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500">
                  Our Services
                </a>
              </li>
             
            </ul>

            <div className="flex items-center">
              <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 5v14h18V5M3 5l9 7 9-7" />
              </svg>
              <p className="text-gray-800">Give us a call: <span className="font-semibold">+234-814-701-4806</span></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;