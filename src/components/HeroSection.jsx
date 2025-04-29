import React, { useEffect } from 'react';
import 'animate.css'; 
import HeroImage from '/Herosection-image.jpg?url';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  useEffect(() => {
    // Create more complex particle effects
    const container = document.querySelector('.particle-container');
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    const particleTypes = [
      {
        shape: 'circle',
        colors: ['#F59E0B', '#FFFFFF', '#10B981'],
        sizes: [3, 6],
        animation: 'float'
      },
      {
        shape: 'rect',
        colors: ['rgba(245, 158, 11, 0.7)', 'rgba(255, 255, 255, 0.7)'],
        sizes: [2, 4],
        animation: 'swirl'
      }
    ];

    // Create particles
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      const size = Math.random() * (type.sizes[1] - type.sizes[0]) + type.sizes[0];
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 5;
      const color = type.colors[Math.floor(Math.random() * type.colors.length)];

      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = type.shape === 'circle' ? '50%' : '2px';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = '0.8';
      particle.style.filter = 'blur(0.5px)';
      particle.style.animation = `${type.animation} ${duration}s ease-in-out ${delay}s infinite`;
      particle.style.zIndex = '1';
      
      container.appendChild(particle);
    }

    // Add styles
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0%, 100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
      }
      
      @keyframes swirl {
        0% {
          transform: rotate(0deg) translateX(10px) rotate(0deg);
        }
        100% {
          transform: rotate(360deg) translateX(10px) rotate(-360deg);
        }
      }
      
      .hero-gradient-overlay {
        background: linear-gradient(
          135deg,
          rgba(0, 0, 0, 0.7) 0%,
          rgba(0, 0, 0, 0.3) 50%,
          rgba(0, 0, 0, 0.7) 100%
        );
      }
      
      .hero-content {
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      className="relative h-[500px] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${HeroImage})`,
      }}
    >
      {/* Particle Background Animation */}
      <div className="particle-container absolute inset-0" />
      
      {/* Gradient Overlay */}
      <div className="hero-gradient-overlay absolute inset-0" />
      
      {/* Foreground Content */}
      <div className="hero-content absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 z-10">
        <div className="flex items-center mb-4 animate__animated animate__fadeInDown">
          <div className="w-6 h-0.5 bg-amber-500 mr-3"></div>
          <p className="text-amber-500 uppercase text-sm tracking-widest">
            Help Other People
          </p>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 animate__animated animate__fadeIn">
          We Dream to Create a <br className="hidden md:block" />
          Bright Future for the <br className="hidden md:block" />
          Underprivileged
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 animate__animated animate__fadeInUp">
          <Link
            to="/LoginPage"
            className="bg-amber-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-amber-600 transition duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Donate Now
          </Link>
          <Link
            to="/About"
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:bg-opacity-20 transition duration-300 text-center"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;