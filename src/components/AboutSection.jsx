import React from 'react';
import 'animate.css'; 

const AboutSection = () => {
  return (
    <div className="py-16 bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4 animate__animated animate__fadeInDown">
          <div className="w-12 h-0.5 bg-teal-600 mr-3"></div>
          <p className="text-teal-600 uppercase text-sm tracking-widest">About Us</p>
          <div className="w-12 h-0.5 bg-teal-600 ml-3"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-amber-600 mb-6 animate__animated animate__fadeInDown">
          Step Forward And Serve Humanity <br />
        </h2>

        <p className="text-gray-600 text-lg mb-8 animate__animated animate__fadeInUp">

        We are a dedicated donation platform committed to connecting generous donors 
        with meaningful causes. Our mission is to make giving simple, transparent, and 
        impactful, empowering individuals and organizations to create positive change in 
        communities worldwide.
        <p>Founded with the belief that every contribution matters, we provide a trusted space
        where donors can support verified charity Homes and initiatives that align with their 
        values. Our user-friendly platform ensures secure transactions, real-time impact updates, 
        and clear insights into how donations are used.</p>
        <p>We strive to foster a culture of generosity and accountability, bridging the gap between 
        those who want to help and those who need it most. Join us in building a brighter future, 
        one donation at a time.</p>

        </p>

        <div className="flex justify-center space-x-6 animate__animated animate__fadeInUp">
          <button className="bg-amber-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-amber-600 transition duration-300">
            Join Now
          </button>
          <div className="flex items-center">
            <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 5v14h18V5M3 5l9 7 9-7"></path>
            </svg>
            <p className="text-gray-800">
              Contact Us <br />
              <span className="font-semibold">+234-814-701-4806</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;