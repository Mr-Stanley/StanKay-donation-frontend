import React from 'react';

const helpItems = [
  {
    title: "Help For Education",
    description: "A wonderful serenity has taken possession of my entire soul",
    imageUrl: "/education.jpg", // replace with your real paths
  },
  {
    title: "Help For Humanity",
    description: "A wonderful serenity has taken possession of my entire soul",
    imageUrl: "/humanity.jpg",
  },
  {
    title: "Help For Water",
    description: "A wonderful serenity has taken possession of my entire soul",
    imageUrl: "/water.jpg",
  },
  {
    title: "Help For Food",
    description: "A wonderful serenity has taken possession of my entire soul",
    imageUrl: "/food.jpg",
  },
];

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-[#1A1A1A] p-6 font-sora relative overflow-hidden">
      {/* Starry Background Animation */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle animate-move-stars"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: Math.random() > 0.5 ? '#FFFFFF' : '#00FF00',
              boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="max-w-2xl text-center relative z-10 pt-8">
        <div className="flex items-center justify-center mb-4 animate-fade-in">
          <div className="w-12 h-0.5 bg-[#00FF00] mr-3"></div>
          <p className="text-[#00FF00] uppercase text-sm tracking-widest">
            StanKay's Donation Hub
          </p>
          <div className="w-12 h-0.5 bg-[#00FF00] ml-3"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6 ">
          Small Actions Lead To <span className="text-[#FFFF00]">Big Change</span>
        </h1>

        <p className="text-[#FFFFFF] mb-8 animate-fade-in">
          It's estimated that approximately 1.1 billion people are homeless worldwide,
          That’s 14% of the world’s population. Put another way, that’s 1 in 8 people alive today
          living without hope amongst trash, sewage, drugs, and abuse in unimaginable conditions.
          Life without secure housing is a life without basic needs being met.
        </p>

        <div className="flex justify-center space-x-12 mb-10">
          <div className="flex flex-col items-center bg-[#2A2A2A] rounded-2xl p-4 animate-fade-in">
            <div className="flex space-x-2 mb-2">
              <svg className="w-6 h-6 text-[#FFFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <span className="text-2xl font-bold text-[#FFFFFF]">3,750</span>
            </div>
            <p className="text-[#FFFFFF] uppercase text-sm">Individual Funds Donations</p>
          </div>

          <div className="flex flex-col items-center bg-[#2A2A2A] rounded-2xl p-4 animate-fade-in">
            <div className="flex space-x-2 mb-2">
              <svg className="w-6 h-6 text-[#FFFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-2.761 0-5 2.239-5 5v6h10v-6c0-2.761-2.239-5-5-5z"></path>
              </svg>
              <span className="text-2xl font-bold text-[#FFFFFF]">14,800</span>
            </div>
            <p className="text-[#FFFFFF] uppercase text-sm">Individual Food Donations</p>
          </div>
        </div>

        <button className="bg-[#FFFF00] text-[#1A1A1A] font-semibold py-3 px-6 rounded-full hover:bg-yellow-500 transition duration-300">
          Donate Now
        </button>
      </div>

      {/* Help Cards Section */}
      <div className="w-full mt-16 bg-brown relative z-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6">
          {helpItems.map((item, index) => (
            <div
              key={index}
              className="  rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-red font-semibold text-blue-600 mb-2">{item.title}</h3>
                <p className="text-white text-gray-600 mb-4">{item.description}</p>
                <a
                  href="#"
                  className="text-yellow-500 font-semibold hover:underline text-sm"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;






// import React from 'react';

// const Body = () => {
//   return (
//     <div className="min-h-screen flex items-center flex flex-col justify-start bg-[#1A1A1A] p-6 font-sora relative overflow-hidden">
//       {/* Starry Background Animation */}
//       <div className="absolute inset-0">
//         {[...Array(100)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full animate-twinkle animate-move-stars"
//             style={{
//               width: `${Math.random() * 5 + 2}px`, // Larger stars (2px to 7px)
//               height: `${Math.random() * 5 + 2}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               backgroundColor: Math.random() > 0.5 ? '#FFFFFF' : '#00FF00', // Mix of white and green stars
//               boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)', // Glow effect
//               animationDuration: `${Math.random() * 10 + 5}s`, // Faster movement (5s to 15s)
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="max-w-2xl text-center relative z-10 pt-8">
//         <div className="flex items-center justify-center mb-4 animate-fade-in">
//           <div className="w-12 h-0.5 bg-[#00FF00] mr-3"></div>
//           <p className="text-[#00FF00] uppercase text-sm tracking-widest">Welcome StanKay's Donation Hub</p>
//           <div className="w-12 h-0.5 bg-[#00FF00] ml-3"></div>
//         </div>

//         <h1 className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-6 animate-bounce">
//           Small Actions Lead To <span className="text-[#FFFF00]">Big Change</span>
//         </h1>

//         <p className="text-[#FFFFFF] mb-8 animate-fade-in">
//           It's estimated that approximately 1.1 billion people are homeless worldwide,
//           That’s 14% of the world’s population. Put another way, that’s 1 in 8 people alive today living without hope amongst trash, sewage, drugs, and abuse in unimaginable conditions. Life without secure housing is a life without basic needs being met.
//         </p>

//         <div className="flex justify-center space-x-12 mb-10">
//           <div className="flex flex-col items-center bg-[#2A2A2A] rounded-radius-2 p-4 animate-fade-in">
//             <div className="flex space-x-2 mb-2">
//               <svg className="w-6 h-6 text-[#FFFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
//               </svg>
//               <span className="text-2xl font-bold text-[#FFFFFF]">3,750</span>
//             </div>
//             <p className="text-[#FFFFFF] uppercase text-sm">Individual Funds Donations</p>
//           </div>

//           <div className="flex flex-col items-center bg-[#2A2A2A] rounded-radius-2 p-4 animate-fade-in">
//             <div className="flex space-x-2 mb-2">
//               <svg className="w-6 h-6 text-[#FFFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-2.761 0-5 2.239-5 5v6h10v-6c0-2.761-2.239-5-5-5z"></path>
//               </svg>
//               <span className="text-2xl font-bold text-[#FFFFFF]">14,800</span>
//             </div>
//             <p className="text-[#FFFFFF] uppercase text-sm">Individual Food Donations</p>
//           </div>
//         </div>

//         <button className="bg-[#FFFF00] text-[#1A1A1A] font-semibold py-3 px-6 rounded-full hover:bg-yellow-500 transition duration-300">
//           Donate Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Body;
























