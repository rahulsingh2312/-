import React from 'react';

export default function Matrix() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/matrix.png"
        alt="Matrix"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Heading */}
        <div className="text-center mt-4 sm:mt-8">
          <h1 className="text-4xl font-bold text-white">Your Heading Here</h1>
        </div>
        
        {/* Bottom images container */}
        <div className=" flex -mb-40  justify-between items-end">
          {/* Left image */}
          <img
            src="/Waifu.png"
            alt="Waifu"
            className="w-[33%] -mb-40  object-contain"
          />
          
          {/* Center image with text */}
          <div className="flex  w-[33%] flex-col items-center">
            <div className="flex flex-col items-center mb-4 space-y-2 px-2">
              <div className="text-white text-sm sm:text-xl text-center">
                First text block above Cutudog
              </div>
              <div className="text-white text-sm sm:text-xl text-center">
                Second text block above Cutudog
              </div>
            </div>
            <img
              src="/Cutudog.png"
              alt="Cutudog"
              className=" object-contain"
            />
          </div>
          
          {/* Right image */}
          <img
            src="/Khali.png"
            alt="Khali"
            className="w-[43%] -mb-40 object-contain"
          />
        </div>
      </div>
    </div>
  );
}