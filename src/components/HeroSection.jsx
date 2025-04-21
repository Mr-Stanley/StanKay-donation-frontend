import React from 'react';
import 'animate.css'; // Ensure animate.css is imported
import HeroImage from '/Herosection-image.jpg?url';
<public></public>

const HeroSection = () => {
  return (
    <div
      className="relative h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${HeroImage})`, // Replace with your image path
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-8 md:p-16">
        {/* Small Header */}
        <div className="flex items-center mb-4 animate__animated animate__fadeInDown">
          <div className="w-6 h-0.5 bg-amber-500 mr-3"></div>
          <p className="text-amber-500 uppercase text-sm tracking-widest">
            Help Other People
          </p>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8 animate__animated animate__bounceInDown">
          We Dream to Create a Bright <br />
          Future of the Underprivileged <br />
          Children
        </h1>

        {/* Donate Button with Checkmark */}
        <div className="flex items-center animate__animated animate__fadeInUp">
          <button className="bg-amber-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-amber-600 transition duration-300">
            Donate Now
          </button>
          <div className="ml-4 bg-amber-500 rounded-full p-2">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;