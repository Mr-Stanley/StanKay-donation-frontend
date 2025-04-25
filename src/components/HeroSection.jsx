import React from 'react';
import 'animate.css'; 
import HeroImage from '/Herosection-image.jpg?url';
import { Link } from 'react-router-dom';

<public></public>

const HeroSection = () => {
  return (
    <div
      className="relative h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${HeroImage})`, 
      }}
    >
      
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-8 md:p-50">
        
        <div className="flex items-center mb-4 animate__animated animate__fadeInDown">
          <div className="w-6 h-0.5 bg-amber-500 mr-3"></div>
          <p className="text-amber-500 uppercase text-sm tracking-widest">
            Help Other People
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white  leading-tight mb-8 animate__animated animate__bounceInDown">
          We Dream to Create a Bright <br />
          Future of the Underprivileged <br />
          Children
        </h1>

    
        <div className="flex items-center animate__animated animate__fadeInUp">
          <Link to="/LoginPage" 
              className="bg-amber-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-amber-600 transition duration-300">
            Donate Now
          </Link>
           
          </div>
        </div>
      </div>

  );
};

export default HeroSection;