import React from 'react';
import { X, Send } from 'lucide-react';

export default function Matrix() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background with Matrix style binary */}
      <div className="absolute top-0 left-0 w-full h-full bg-black">
        <img
          src="/matrix.png"
          alt="Matrix"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Main Text */}
        <div className="text-center mt-8 px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-2">
            Stop Trading & Believe in Something
          </h1>
          <p className="text-white text-lg sm:text-xl opacity-90">
            you can be the next
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mt-4">
          {/* X (Twitter) Circle */}
          <div className="rounded-full bg-black p-3 cursor-pointer hover:bg-gray-900 transition-colors">
            <X className="w-6 h-6 text-white" />
          </div>
          
          {/* Telegram Circle */}
          <div className="rounded-full bg-[#0088cc] p-3 cursor-pointer hover:opacity-90 transition-opacity">
            <Send className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Bottom Images Container */}
        <div className="mt-auto flex justify-between items-end">
          {/* Left Waifu */}
          <div className="w-1/3">
            <img
              src="/Waifu.png"
              alt="Anime character"
              className="h-[60vh] object-contain"
            />
          </div>

          {/* Center Dog with Trading Icon */}
          <div className="w-1/3 flex flex-col items-center">
           
            <img
              src="/Cutudog.png"
              alt="Shiba dog"
              className="h-[40vh] object-contain"
            />
          </div>

          {/* Right Figure */}
          <div className="w-1/3 flex justify-end">
            <img
              src="/Khali.png"
              alt="Muscular figure"
              className="h-[60vh] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}