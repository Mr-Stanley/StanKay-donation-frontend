import React, { useRef } from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/little-homeless-boy+web.jpg',
    title: 'Raising Hope\nTo the Homeless People',
  },
  {
    image: '/slide2.jpg',
    title: 'To the Homeless People',
  },
  {
    image: '/slide3.jpg',
    title: 'Make a Difference Today',
  },
  {
    image: '/Rectangle 43.png',
    title: 'Make a Difference Today',
  },
  {
    image: '/Rectangle 41.png',
    title: 'Make a Difference Today',
  },
  {
    image: '/Rectangle 40.png',
    title: 'Make a Difference Today',
  },
  {
    image: '/1.jpeg',
    title: 'Make a Difference Today',
  },
  {
    image: '/3.avif',
    title: 'Make a Difference Today',
  },
  {
    image: '/2.avif',
    title: 'Make a Difference Today',
  },
];

const Slider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = slider.offsetWidth;
    if (direction === 'left') {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-black w-full h-[800px] overflow-hidden">
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-full h-full"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full relative snap-center"
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white">
              <h1 className="animate__animated animate__fadeInUp text-5xl font-bold whitespace-pre-line">
                {slide.title}
              </h1>
              <div className="mt-4 display flex  gap-10">
              <div className="mt-4">
              <Link
                        to="/DonateNowPage"
                        className="bg-orange-500 text-white px-6 py-3 rounded-md">
                        DONATE NOW
                    </Link>
              </div>
              <div className="mt-4 bg-transparent">
                <Link
                      to="/sign-up" 
                      className="bg-transparent text-white px-6 py-3 rounded-md border border-white">
                  SIGN-UP
                </Link>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Buttons on the right side */}
      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex flex-row gap-4 z-10">
        <button
          onClick={() => scroll('left')}
          className="text-white p-4 rounded-full border-2 border-white text-xl"
        >
          ←
        </button>
        <button
          onClick={() => scroll('right')}
          className="text-white p-4 rounded-full border-2 border-white text-xl"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Slider;