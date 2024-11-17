import React from "react";
import MemeImage from "./MemeImage";
import { useState , useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const memeImages = [
  { src: "/soldier.png", alt: "Meme image 1", className: "rounded-2xl aspect-[1.2] min-w-[240px] w-[346px]" },
  { src: "/rocket.png", alt: "Meme image 2", className: "aspect-square min-w-[240px] rounded-[30px] w-[440px] max-md:max-w-full" },
  { src: "/samurai.png", alt: "Meme image 3", className: "rounded-3xl aspect-[1.04] min-w-[240px] w-[314px]" }
];

function WallOfMeme() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto-scroll functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 1000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % memeImages.length);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + memeImages.length) % memeImages.length);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <header className="text-center mb-12">
        <div className="relative inline-block">
          <h1 className="text-8xl text-white font-bold font-impact tracking-wide px-6 py-2 max-md:text-4xl whitespace-nowrap"
              style={{
                textShadow: `
                  -5px -5px 0 #000,
                  5px -5px 0 #000,
                  -5px 5px 0 #000,
                  5px 5px 0 #000,
                  0 -5px 0 #000,
                  0 5px 0 #000,
                  -5px 0 0 #000,
                  5px 0 0 #000
                `,
              }}>
            WALL OF MEME
          </h1>
        </div>
        <p className="mt-4 poppins-regular text-base text-white text-opacity-50 font-poppins">
          Funniest meme of the week
        </p>
      </header>

      {/* Desktop View */}
      <section className="hidden md:flex flex-wrap gap-10 items-center justify-center mt-8 w-full">
        {memeImages.map((image, index) => (
          <MemeImage key={index} {...image} />
        ))}
      </section>

      {/* Mobile Carousel */}
      <section className="md:hidden w-full relative">
        <div className="flex justify-center items-center">
          <button
            onClick={prevSlide}
            className="absolute left-2 z-10 bg-white/10 rounded-full p-2 backdrop-blur-sm transition-transform hover:scale-110"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="overflow-hidden  w-full  flex justify-center">
            <div 
              className="transition-all duration-300 ease-out transform"
              style={{
                transform: `scale(${isAnimating ? 0.7 : 1})`,
              }}
            >
              <MemeImage {...memeImages[currentIndex]} />
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-2 z-10 bg-white/10 rounded-full p-2 backdrop-blur-sm transition-transform hover:scale-110"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {memeImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/30'
              }`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 300);
                }
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default WallOfMeme;