import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Config variables
const SPREADSHEET_ID = "1FvOL5DB-SIoD1MTVz3g2yCo-WIqzS4EgB9OuDPq-26Y";
const RANGE = "B:B";
const API_KEY = import.meta.env.VITE_PVT_KEY;

// Cache for storing preloaded images
const imageCache = new Map();

const preloadImage = (src) => {
  if (!imageCache.has(src)) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        imageCache.set(src, src);
        resolve(src);
      };
      img.onerror = reject;
      img.src = src;
    });
  }
  return Promise.resolve(imageCache.get(src));
};

const getFormattedUrl = (url) => {
  const openIdMatch = url.match(/\/open\?id=(.+)$/);
  if (openIdMatch) {
    return `https://lh3.googleusercontent.com/d/${openIdMatch[1]}=s220?authuser=0`;
  }
  
  const fileIdMatch = url.match(/\/d\/(.+?)\/view/);
  if (fileIdMatch) {
    return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}=s220?authuser=0`;
  }
  
  return url;
};

const MemeImage = ({ src, alt, className, isCenter, style }) => {
  const [imageSrc, setImageSrc] = useState(null);
  
  useEffect(() => {
    const loadImage = async () => {
      try {
        const formattedUrl = getFormattedUrl(src);
        const cachedSrc = await preloadImage(formattedUrl);
        setImageSrc(cachedSrc);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [src]);

  return (
    <div
      className={`relative group cursor-pointer ${
        isCenter ? 'scale-110 z-10' : 'scale-90 opacity-70'
      } transition-all duration-500 ease-out hover:z-20`}
      style={style}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`object-cover transition-all duration-500 ease-out 
            ${className} 
            group-hover:scale-105 group-hover:shadow-2xl
            group-hover:brightness-110`}
          style={{
            transform: `perspective(1000px) ${isCenter ? 'rotateY(0deg)' : 'rotateY(15deg)'}`,
            transformStyle: 'preserve-3d'
          }}
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
    </div>
  );
};

// Rest of the component remains the same as in your current code...
const WallOfMeme = () => {
  const [memeImages, setMemeImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );

        if (!response.ok) throw new Error('Failed to fetch spreadsheet data');

        const data = await response.json();
        const images = data.values
          ?.slice(1)
          .filter(row => row && row[0])
          .map((row, index) => ({
            src: row[0],
            alt: `Meme image ${index + 1}`,
            className: "rounded-2xl aspect-[1.2] min-w-[240px] w-[346px]",
          })) || [];

        // Preload formatted URLs
        await Promise.all(
          images.map(img => preloadImage(getFormattedUrl(img.src)))
        );
        setMemeImages(images);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);
  useEffect(() => {
    autoPlayRef.current = () => {
      nextSlide();
    };
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (!isAnimating && memeImages.length > 0) {
      setDirection(1);
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % memeImages.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating && memeImages.length > 0) {
      setDirection(-1);
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + memeImages.length) % memeImages.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const getVisibleImages = () => {
    const length = memeImages.length;
    return [
      memeImages[(currentIndex - 1 + length) % length],
      memeImages[currentIndex],
      memeImages[(currentIndex + 1) % length],
    ];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-xl animate-pulse">Loading memes...</p>
        </div>
      </div>
    );
  }

  if (memeImages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">No memes found in spreadsheet</p>
      </div>
    );
  }

  return (
  
      <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <header className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block">
            <h1
              className="text-8xl text-white font-bold font-impact tracking-wide px-6 py-2 max-md:text-4xl whitespace-nowrap animate-title"
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
              }}
            >
              WALL OF MEME
            </h1>
          </div>
          <p className="mt-4 poppins-regular text-base text-white text-opacity-50 font-poppins animate-fade-in-up">
            Funniest meme of the week
          </p>
        </header>
    
        {/* Desktop View */}
        <section className="hidden md:flex items-center justify-center mt-8 w-full relative">
          <button
            onClick={prevSlide}
            className="absolute left-4 z-20 bg-white/10 rounded-full p-2 backdrop-blur-sm
              transition-all duration-300 hover:scale-110 hover:bg-white/20"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
    
          <div className="flex items-center justify-center gap-4 perspective-1000">
            {getVisibleImages().map((image, index) => (
              <MemeImage
                key={`${currentIndex}-${index}`}
                {...image}
                isCenter={index === 1}
                style={{

                  transform: `
                    translateX(${isAnimating ? direction * -20 : 0}px) 
                    scale(${index === 1 ? 1.2 : 0.8}) 
                    rotateY(${index === 1 ? 0 : 15 * (index - 1)}deg)`,
                  opacity: isAnimating ? (index === 1 ? 1 : 0.7) : 1,
                  transition: "transform 0.5s ease, opacity 0.5s ease",
                }}
                className={`transition-transform w-[29vw] rounded-md duration-500 ${
                  index === 1 ? "animate-bounce" : "animate-fade"
                }`}
              />
            ))}
          </div>
    
          <button
            onClick={nextSlide}
            className="absolute right-4 z-20 bg-white/10 rounded-full p-2 backdrop-blur-sm
              transition-all duration-300 hover:scale-110 hover:bg-white/20"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </section>
    
        {/* Mobile Carousel */}
        <section className="md:hidden w-full relative">
      <div className="flex justify-center items-center">
        <button
          onClick={() => {
            if (!isAnimating) {
              setDirection(-1); // Slide backward
              setIsAnimating(true);
              setCurrentIndex((prevIndex) => (prevIndex - 1 + memeImages.length) % memeImages.length);
              setTimeout(() => setIsAnimating(false), 500);
            }
          }}
          className="absolute left-2 z-10 bg-white/10 rounded-full p-2 backdrop-blur-sm
            transition-all duration-300 hover:scale-110 hover:bg-white/20"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="overflow-hidden w-full flex justify-center">
          <div
            className="transition-all rounded-lg duration-500 ease-out transform"
            style={{
              transform: `scale(${isAnimating ? 0.8 : 0.7}) translateX(${isAnimating ? direction * -50 : 0}px)`,
            }}
          >
            <MemeImage {...memeImages[currentIndex]} isCenter={true} />
          </div>
        </div>

        <button
          onClick={() => {
            if (!isAnimating) {
              setDirection(1); // Slide forward
              setIsAnimating(true);
              setCurrentIndex((prevIndex) => (prevIndex + 1) % memeImages.length);
              setTimeout(() => setIsAnimating(false), 300);
            }
          }}
          className="absolute right-2 z-10 bg-white/10 rounded-full p-2 backdrop-blur-sm
            transition-all duration-150 hover:scale-110 hover:bg-white/20"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {memeImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-500 
              ${index === currentIndex ? 
                "bg-white scale-125 w-4" : 
                "bg-white/30 hover:bg-white/50"
              }`}
            onClick={() => {
              if (!isAnimating) {
                setDirection(index > currentIndex ? 1 : -1);
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
    

};

export default WallOfMeme;