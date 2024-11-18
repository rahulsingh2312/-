import React from "react";

function CardContent() {
  return (
    <div className="relative flex flex-col px-8 py-1 w-full bg-blend-exclusion rounded-[30px] text-white">
      {/* <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e86524d660046e50af59f7f004b20ed4151a6ae42cad705a5acc76afaa632f9?placeholderIfAbsent=true&apiKey=d1ee9f6275604677bd2583ecebeab853" 
        className="object-cover absolute inset-0 w-full h-full rounded-[30px] opacity-30" 
        alt=""
      /> */}
      <img
        loading="lazy"
        src="/purple.webp"
        className="object-cover absolute     inset-0 w-[400px] h-[120px] md:h-[165px] rounded-[30px] opacity-30"
        alt=""
      />
      <div className="flex mt-2 justify-between">
        <h2 className="text-transparent my-2 bg-clip-text bg-gradient-to-b from-white to-[#ffffff66]">
          Web3 Dev
        </h2>
        <a className="z-[99999]" target="_blank" href="https://x.com/rrahulol">
          {" "}
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d3ac73ea28c5c18daa9d45fa9f00d217c2efcfba49b2cab878cc0c1b6e9b1aa?placeholderIfAbsent=true&apiKey=d1ee9f6275604677bd2583ecebeab853"
            className="object-contain aspect-square w-[27px]"
            alt="Web3 Dev icon"
          />
        </a>
      </div>
      <a target="_blank" href="https://rahulol.me">
        <div className="relative mt-5 md:mt-16 mb-3 text-3xl left-0 mr-20">
          rahulol.me
        </div>
      </a>
    </div>
  );
}

export default CardContent;
