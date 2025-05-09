import React, { useEffect, useState } from 'react';
import 'animate.css';

const HowCanYouHelpSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const emojis = ['❤️', '🍞', '🧥', '🏠', '🤲', '🌍', '💵', '🔄'];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
      const emoji = document.createElement('div');
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.position = 'absolute';
      emoji.style.fontSize = `${Math.random() * 30 + 20}px`;
      emoji.style.left = `${Math.random() * 100}%`;
      emoji.style.top = `${Math.random() * 100}%`;
      emoji.style.opacity = '0.5';
      emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
      emoji.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
      container.appendChild(emoji);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(container);
      document.head.removeChild(style);
    };
  }, []);

  const tabs = [
    {
      title: "Volunteer Opportunities",
      content: "Provide information about local volunteer opportunities with shelters, food banks, and outreach programs. Include details on how individuals can contribute their time and skills to make a positive impact on the lives of the homeless.",
      emoji: "👐"
    },
    {
      title: "Donations",
      content: "Encourage monetary donations or the donation of essential items such as clothing, blankets, and non-perishable food items. Clearly outline the process for making financial contributions and specify the types of goods that are most needed by homeless individuals and shelters.",
      emoji: "💰"
    },
    {
      title: "Raise Awareness",
      content: "Empower visitors to the website to become advocates for homeless individuals by providing resources on how to raise awareness in their communities. This could include sharing information on social media, organizing community events, or engaging with local policymakers to address systemic issues related to homelessness.",
      emoji: "📢"
    }
  ];

  return (
    <div className="py-16 w-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(${Math.random() * 55 + 200}, ${Math.random() * 55 + 200}, ${Math.random() * 55 + 200}, ${Math.random() * 0.3 + 0.1}) 0%, transparent 70%)`,
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(30px)',
              animation: `pulse ${Math.random() * 10 + 5}s infinite alternate`
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 animate__animated animate__fadeInDown"
          style={{
            background: 'linear-gradient(45deg, #00ff88, #00b7ff, #ff00f7)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 10px rgba(255,255,255,0.3)',
            animation: 'gradientShift 5s ease infinite',
            backgroundSize: '300% 300%'
          }}
        >
          How Can You Help?
        </h2>

        <div className="flex justify-center mb-8 gap-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`text-xl font-bold py-3 px-6 rounded-full transition-all duration-300 ${activeTab === index ? 'bg-green-500 text-white scale-110' : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'}`}
              style={{
                transform: activeTab === index ? 'rotate(0deg)' : `rotate(${Math.random() * 10 - 5}deg)`,
                border: activeTab === index ? '2px solid #00ff88' : '2px solid rgba(255,255,255,0.3)',
                boxShadow: activeTab === index ? '0 0 20px #00ff88' : 'none'
              }}
            >
              {tab.emoji} {tab.title}
            </button>
          ))}
        </div>

        <div 
          className="relative bg-black bg-opacity-70 backdrop-blur-lg rounded-2xl p-8 mb-12 border-2 border-white border-opacity-20 overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            animation: isHovering ? 'shake 0.5s' : '',
            transition: 'all 0.3s ease'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute text-4xl opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 5}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                {['❤️', '🌟', '✨', '🎁', '🔄'][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <span className="mr-3 text-3xl">{tabs[activeTab].emoji}</span>
            {tabs[activeTab].title}
          </h3>
          <p className="text-gray-300 text-lg mb-6">
            {tabs[activeTab].content}
          </p>
          <button 
            className="bg-transparent border-2 border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-gray-700 transition duration-300 relative overflow-hidden"
            style={{
              boxShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          >
            <span className="relative z-10">More</span>
            <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition duration-300"></span>
          </button>
        </div>

        <div className="text-center mt-12">
          <button 
            className="text-2xl font-bold py-4 px-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition-all duration-500 transform hover:scale-105"
            style={{
              boxShadow: '0 0 20px rgba(0,255,136,0.5)',
              animation: 'pulse 2s infinite'
            }}
          >
            🚀 TAKE ACTION NOW! 🚀
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 20px rgba(0,255,136,0.5); }
          50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(0,255,136,0.8); }
          100% { transform: scale(1); box-shadow: 0 0 20px rgba(0,255,136,0.5); }
        }
      `}</style>
    </div>
  );
};

export default HowCanYouHelpSection;
