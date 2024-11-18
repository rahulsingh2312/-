import React from "react";
// import { X, Send } from "lucide-react";
import TokenIcon from "./TokenIcon";
export default function Matrix() {
  return (
    <div>
      <div className="h-full w-full relative flex-col items-center justify-center">
        <div className="flex-col items-center justify-center absolute w-full mt-20 max-lg:mt-1">
          <h1 className="text-6xl text-center font-bold z-10 mx-auto mb-6 max-xl:text-5xl max-lg:text-4xl">
            Stop Trading & Believe in something
          </h1>
          <div className="px-4 py-1 rounded-full border border-gray-500 mx-auto  text-center z-10 bg-white/20 backdrop-blur-sm w-fit">
            You can be the next "MillYENaire"
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <a
              target="_blank"
              href="https://x.com/i/communities/1854412179182645683"
            >
              <TokenIcon src="/x2.webp" />
            </a>
            <a target="_blank" href="https://t.me/YENonSol">
              <TokenIcon src="/t2.webp" />
            </a>
          </div>
        </div>
        <img
          src="/stoptrading.webp"
          className="select-none max-md:hidden -z-10"
          draggable="false"
          alt=""
        />
        <img
          src="/stoptradingmd.webp"
          className="select-none md:hidden w-full -z-10"
          draggable="false"
          alt=""
        />
      </div>
    </div>
  );
}
