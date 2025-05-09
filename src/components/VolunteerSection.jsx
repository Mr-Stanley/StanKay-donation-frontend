import React, { useEffect } from 'react';
import 'animate.css';

const VolunteerSection = () => {
  useEffect(() => {
    const container = document.querySelector('.volunteer-section');
    if (!container) return;

    const existingParticles = document.querySelectorAll('.floating-particle');
    existingParticles.forEach(particle => particle.remove());

    const colors = [
      'rgba(245, 158, 11, 0.6)',  
      'rgba(16, 185, 129, 0.6)',  
      'rgba(59, 130, 246, 0.6)',  
      'rgba(236, 72, 153, 0.6)'   
    ];

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      const size = Math.random() * 20 + 5;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      particle.style.opacity = '0.8';
      particle.style.filter = 'blur(1px)';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      particle.style.zIndex = '0';
      
      container.appendChild(particle);
    }

    // Add styles
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% {
          transform: translate(0, 0) rotate(0deg);
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
        }
        100% {
          transform: translate(0, 0) rotate(360deg);
        }
      }
      
      .volunteer-section {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%);
      }
      
      .volunteer-content {
        position: relative;
        z-index: 10;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="volunteer-section py-16">
      <div className="volunteer-content max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-amber-600 animate__animated animate__fadeInDown">
            Our Expert Volunteer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-10 text-center animate__animated animate__fadeInUp relative z-10 hover:transform hover:scale-105 transition-transform duration-300">
            <img
              src="/DSC01416.jpg" 
              alt="Stanley Ugochukwu"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-amber-500"
            />
            <h3 className="text-xl font-semibold text-gray-800">Stanley Ugochukwu</h3>
            <p className="text-gray-600 mb-4">Volunteer</p>
            <div className="flex justify-center space-x-4 mb-4">
            </div>
            <div className="flex items-center justify-center">
              <div className="w-12 h-0.5 bg-teal-600 mr-3"></div>
              <a href="#" className="text-teal-600 uppercase text-sm hover:underline">
                Read More
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-10 text-center animate__animated animate__fadeInUp relative z-10 hover:transform hover:scale-105 transition-transform duration-300">
            <img
              src="/DSC01830.jpg" 
              alt="Korede"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-amber-500"
            />
            <h3 className="text-xl font-semibold text-gray-800">Korede</h3>
            <p className="text-gray-600 mb-4">Volunteer</p>
            <div className="flex justify-center space-x-4 mb-4">
            </div>
            <div className="flex items-center justify-center">
              <div className="w-12 h-0.5 bg-teal-600 mr-3"></div>
              <a href="#" className="text-teal-600 uppercase text-sm hover:underline">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerSection;