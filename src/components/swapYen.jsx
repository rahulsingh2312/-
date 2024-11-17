import React from "react";
import { CgChevronRight } from "react-icons/cg";
import BulkTokenSwapButton from "./bulkTokenSwapButton";

const swapYen = () => {
  return (
    <>
      {/* //from */}
      <div className="flex-col mx-auto my-4">
        <div className="bg-[#232323] p-4 rounded-3xl min-w-[543px] max-sm:min-w-[310px] ">
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
        <div className="flex w-full justify-between my-2">
          <button className="bg-white hover:bg-green-500 text-black text-sm font-semibold px-4 py-1 rounded-xl">
            Connect Wallet
          </button>
          <button className="bg-green-500 hover:bg-white text-black text-sm font-semibold px-4 py-1 rounded-xl">
            Swap{"->"}
          </button>
        </div>

        {/* //to  */}
        <div className="flex-col mx-auto mb-4">
          <div className="bg-gradient-to-b from-[#0A4A00] to-[#073000] p-4 rounded-3xl">
            <div className="w-full flex justify-between items-center px-2 mb-2">
              <h1 className="font-medium text-white/25">To</h1>

              <div className="border rounded-full bg-white px-2 py-1 flex items-center">
                <span className="text-black font-semibold">YEN 💹</span>
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
