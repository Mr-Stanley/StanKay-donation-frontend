import React from 'react';
import 'animate.css'; // Ensure animate.css is imported

const HowCanYouHelpSection = () => {
  return (
    <div className=" py-16 w-full">
      <div className="max-w-3xl mx-auto px-4">
        {/* Main Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 animate__animated animate__fadeInDown">
          How Can You Help?
        </h2>

        {/* Volunteer Opportunities */}
        <div className="mb-12 animate__animated animate__fadeInUp">
          <h3 className="text-2xl font-semibold text-white mb-4">Volunteer Opportunities</h3>
          <p className="text-gray-300 text-lg mb-6">
            Provide information about local volunteer opportunities with shelters, food banks, and outreach programs. Include details on how individuals can contribute their time and skills to make a positive impact on the lives of the homeless.
          </p>
          <button className="bg-transparent border-2 border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-gray-700 transition duration-300">
            More
          </button>
        </div>

        {/* Donations */}
        <div className="mb-12 animate__animated animate__fadeInUp">
          <h3 className="text-2xl font-semibold text-white mb-4">Donations</h3>
          <p className="text-gray-300 text-lg mb-6">
            Encourage monetary donations or the donation of essential items such as clothing, blankets, and non-perishable food items. Clearly outline the process for making financial contributions and specify the types of goods that are most needed by homeless individuals and shelters.
          </p>
          <button className="bg-transparent border-2 border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-gray-700 transition duration-300">
            More
          </button>
        </div>

        {/* Raise Awareness */}
        <div className="animate__animated animate__fadeInUp">
          <h3 className="text-2xl font-semibold text-white mb-4">Raise Awareness</h3>
          <p className="text-gray-300 text-lg mb-6">
            Empower visitors to the website to become advocates for homeless individuals by providing resources on how to raise awareness in their communities. This could include sharing information on social media, organizing community events, or engaging with local policymakers to address systemic issues related to homelessness.
          </p>
          <button className="bg-transparent border-2 border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-gray-700 transition duration-300">
            More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowCanYouHelpSection;