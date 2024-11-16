import React from "react";
import { CgChevronRight } from "react-icons/cg";

const swapYen = () => {
  return (
    <>
      {/* //from */}
      <div className="flex-col mx-auto my-4">
        <div className="bg-[#232323] p-4 rounded-3xl w-[543px]">
          <div className="w-full flex justify-between items-center px-2 mb-2">
            <h1 className="font-medium text-white/25">Swap from</h1>

            <div className="border rounded-full border-gray-600 px-2 py-1 flex items-center">
              <span>SOL</span> <CgChevronRight />
            </div>
          </div>
          <div className="flex gap-4 items-end mb-4 border-b border-b-zinc-700 pb-6">
            <h1 className="text-5xl font-bold">24.02</h1>
            <p className="font-medium text-xl text-zinc-500">~$5125.6</p>
          </div>
          <div className="text-white/60 flex justify-between w-full items-center mb-4">
            <div>
              <span className="font-medium text-white">889.2SOL</span> available
            </div>
            <div className="px-4 cursor-pointer py-1 bg-green-500/25 text-green-500 rounded-full">
              MAX
            </div>
          </div>
        </div>

        <div className="rounded-full bg-white border border-[#171717] p-4 w-fit mx-auto"></div>
        {/* //to  */}
        <div className="flex-col mx-auto my-4">
          <div className="bg-gradient-to-b from-[#0A4A00] to-[#073000] p-4 rounded-3xl w-[543px]">
            <div className="w-full flex justify-between items-center px-2 mb-2">
              <h1 className="font-medium text-white/25">Swap from</h1>

              <div className="border rounded-full border-gray-600 px-2 py-1 flex items-center">
                <span>SOL</span> <CgChevronRight />
              </div>
            </div>
            <div className="flex gap-4 items-end mb-4 border-b border-b-zinc-700 pb-6">
              <h1 className="text-5xl font-bold">24.02</h1>
              <p className="font-medium text-xl text-zinc-500">~$5125.6</p>
            </div>
            <div className="text-white/60 flex justify-between w-full items-center mb-4">
              Est Fees: 0.0001 SOL
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default swapYen;
