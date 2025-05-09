import React, { useRef, useEffect } from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/homeless3.jpg',
    title: 'Make a Difference Today',
  },
];

const Slider = () => {
  const sliderRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    let hue = 0;
    
    const interval = setInterval(() => {
      hue = (hue + 1) % 360;
      overlay.style.background = `linear-gradient(45deg, hsla(${hue}, 80%, 20%, 0.3), hsla(${(hue + 120) % 360}, 80%, 20%, 0.3))`;
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = slider.offsetWidth;
    slider.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-black w-full h-[800px] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(30)].map((_, i) => {
          const size = `${Math.random() * 10 + 5}px`;
          const duration = `${Math.random() * 20 + 10}s`;
          const delay = `${Math.random() * 5}s`;
          
          return (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${duration} linear infinite ${delay}`,
                animationName: 'float',
                animationDuration: duration,
                animationDelay: delay,
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear'
              }}
            />
          );
        })}
      </div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-full h-full relative z-10"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full relative snap-center"
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-[5000ms] ease-in-out"
              style={{
                transitionProperty: 'transform',
                transitionDuration: '5000ms',
                transitionTimingFunction: 'ease-in-out'
              }}
            />
            
            <div 
              ref={overlayRef}
              className="absolute inset-0 mix-blend-multiply"
              style={{
                mixBlendMode: 'multiply'
              }}
            />
            
            <div className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white">
              <h1 
                className="animate__animated animate__fadeInUp text-5xl font-bold whitespace-pre-line"
                style={{
                  textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  position: 'relative'
                }}
              >
                {slide.title}
                <span 
                  className="absolute -bottom-2 left-0 h-1 w-full"
                  style={{
                    background: 'linear-gradient(to right, #4ade80, #3b82f6)',
                    animation: 'pulse 2s infinite',
                    borderRadius: '2px'
                  }}
                />
              </h1>
              
              <div className="mt-4 display flex gap-10">
                <div className="mt-4 relative group">
                  <Link
                    to="/DonateNowPage"
                    className="bg-green-500 text-white px-6 py-3 rounded-md"
                    style={{
                      display: 'inline-block',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <span 
                      className="group-hover:scale-105 group-hover:shadow-lg"
                      style={{
                        display: 'inline-block',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                      }}
                    >
                      DONATE NOW
                    </span>
                    <span 
                      className="absolute inset-0 rounded-md border-2 border-transparent group-hover:border-white/50"
                      style={{
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Link>
                </div>
                
                <div className="mt-4 relative group">
                  <Link
                    to="/sign-up" 
                    className="bg-transparent text-white px-6 py-3 rounded-md border border-white"
                    style={{
                      display: 'inline-block',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <span 
                      className="group-hover:scale-105 group-hover:bg-white/10 group-hover:shadow-lg"
                      style={{
                        display: 'inline-block',
                        transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease'
                      }}
                    >
                      SIGN-UP
                    </span>
                    <span 
                      className="absolute inset-0 rounded-md border-2 border-transparent group-hover:border-white/30"
                      style={{
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="w-3 h-3 rounded-full bg-white opacity-60"
            style={{
              animation: `bounce 1.5s infinite ${i * 0.2}s`,
              animationName: 'bounce',
              animationDuration: '1.5s',
              animationIterationCount: 'infinite',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
            100% { transform: translateY(0) rotate(360deg); }
          }
          @keyframes pulse {
            0% { opacity: 0.7; width: 0%; }
            50% { opacity: 1; width: 100%; }
            100% { opacity: 0.7; width: 0%; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
        `
      }} />
    </div>
  );
};

export default Slider;















