import React, { useState, useEffect} from 'react';
import 'animate.css';


const slides = [
    {
      image: '/little-homeless-boy+web.jpg',
      title: <h1 className="animate__animated animate__animate__bounceInDown text-4xl font-bold text-white">To the Homeless People</h1>,
    },
    {
      image: '/slide2.jpg',
      title: <h1 className="animate__animated animate__bounceInDown text-4xl font-bold text-white">
      To the Homeless People
    </h1>
    },
    {
      image: '/slide3.jpg',
      title: <h1 className="animate__animated animate__animate__bounceInDown text-4xl font-bold text-white">Make a Difference Today</h1>,
    },
  ];

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [key, setKey] = useState(0); // Unique key to force re-render of text content
  
    // Update the key whenever the slide changes to trigger animation
    useEffect(() => {
      setKey((prev) => prev + 1);
    }, [currentSlide]);
   

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-shadow">
            <h1 className="text-5xl font-bold mb-5">{slide.title}</h1>
            <div className="flex gap-4">
              <button className="bg-orange-500 text-white px-5 py-2 rounded-md">
                JOIN US NOW
              </button>
              <button className="border-2 border-white text-white px-5 py-2 rounded-md">
                WATCH THE VIDEO
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 right+3 transform -translate-y-1/2 bg- bg-opacity-100 text-white p-2 rounded-full"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg- bg-opacity-50 text-white p-2 rounded-full"
      >
        →
      </button>
    </div>
  );
};


export default Slider;