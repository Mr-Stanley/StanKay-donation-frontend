import React from 'react';

const Body = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-0.5 bg-teal-600 mr-3"></div>
          <p className="text-teal-600 uppercase text-sm tracking-widest">Welcome StanKay's Donation Hub</p>
          <div className="w-12 h-0.5 bg-teal-600 ml-3"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-6">
          Small Actions Lead To Big Change
        </h1>

        <p className="text-gray-600 text-lg mb-8">
        It's estimated that approximately 1.1 billion people are homeless worldwide,
          That’s 14% of the world’s population. Put another way, that’s 1 in 8 people alive today living without hope amongst trash, sewage, drugs, and abuse in unimaginable conditions. Life without secure housing is a life without basic needs being met.
        </p>

        <div className="flex justify-center space-x-12 mb-10">
          <div className="flex flex-col items-center">
            <div className="flex space-x-2 mb-2">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span className="text-2xl font-bold text-gray-800">3,750</span>
            </div>
            <p className="text-gray-600 uppercase text-sm">Individual Funds Donations</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex space-x-2 mb-2">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-2.761 0-5 2.239-5 5v6h10v-6c0-2.761-2.239-5-5-5z"></path>
              </svg>
              <span className="text-2xl font-bold text-gray-800">14,800</span>
            </div>
            <p className="text-gray-600 uppercase text-sm">Individual Food Donations</p>
          </div>
        </div>

        <button className="bg-amber-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-amber-700 transition duration-300">
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default Body;