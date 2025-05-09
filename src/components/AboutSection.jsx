import React, { useEffect } from 'react';
import 'animate.css';

const AboutSection = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;
    const colors = ['#FFFF00', '#FFA500', '#FFD700', '#FF6347', '#FF4500', '#FF8C00'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        }
      }
      
      requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div className="py-16 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              background: `rgba(255, ${Math.random() * 155 + 100}, 0, ${Math.random() * 0.2 + 0.1})`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.3
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center mb-4 animate__animated animate__fadeInDown">
          <div className="w-12 h-0.5 bg-teal-600 mr-3"></div>
          <p className="text-teal-500 text-bold uppercase text-sm tracking-widest">About Us</p>
          <div className="w-12 h-0.5 bg-teal-600 ml-3"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-[#FFFF00] mb-6 animate__animated animate__fadeInDown">
          Step Forward And Serve Humanity <br />
        </h2>

        <p className="text-white-1000 text-lg mb-8 animate__animated animate__fadeInUp">
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
          <button className="bg-[#FFFF00] text-black font-semibold py-3 px-6 rounded-full hover:bg-amber-600 transition duration-300">
            Join Now
          </button>
          <div className="flex items-center">
            <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 5v14h18V5M3 5l9 7 9-7"></path>
            </svg>
            <p className="text-white-800">
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


