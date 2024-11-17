import React, { useState } from "react";
import { CgChevronRight } from "react-icons/cg";

const SwapYen = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("YEN");
  const [swapAmount, setSwapAmount] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(889.2); // Example value
  const [estimatedFees, setEstimatedFees] = useState(0.0001); // Example fee
  const [priceInUSD, setPriceInUSD] = useState(5125.6); // Example price

  const handleMaxClick = () => {
    setSwapAmount(availableBalance);
  };

  const handleSwap = () => {
    if (!walletConnected) {
      alert("Please connect your wallet first.");
      return;
    }
    if (swapAmount <= 0 || swapAmount > availableBalance) {
      alert("Invalid swap amount.");
      return;
    }
    // Add your swap logic here
    alert(`Swapping ${swapAmount} ${fromToken} to ${toToken}`);
  };

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setWalletConnected(true);
    alert("Wallet connected!");
  };

  return (
    <div className="flex-col mx-auto my-4 w-fit">
      {/* From Section */}
      <div className="bg-[#232323] p-4 rounded-3xl min-w-[543px] max-sm:min-w-[310px]">
        <div className="w-full flex justify-between items-center px-2 mb-2">
          <h1 className="font-medium text-white/25">Swap from</h1>
          <div className="border rounded-full border-gray-600 px-2 py-1 flex items-center">
            <span>{fromToken}</span> <CgChevronRight />
          </div>
        </div>

        <div className="flex gap-4 items-end mb-4 border-b border-b-zinc-700 pb-6">
          <input
            type="number"
            value={swapAmount}
            onChange={(e) => setSwapAmount(parseFloat(e.target.value) || 0)}
            className="bg-transparent text-5xl font-bold w-full focus:outline-none text-white"
            placeholder="0.00"
            min="0"
            max={availableBalance}
          />
          <p className="font-medium text-xl text-zinc-500">
            ~${(swapAmount * priceInUSD).toFixed(2)}
          </p>
        </div>

        <div className="text-white/60 flex justify-between w-full items-center mb-4">
          <div>
            <span className="font-medium text-white">
              {availableBalance} {fromToken}
            </span>{" "}
            available
          </div>
          <button
            onClick={handleMaxClick}
            className="px-4 cursor-pointer py-1 bg-green-500/25 text-green-500 rounded-full"
          >
            MAX
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex w-full justify-between my-2">
        {!walletConnected ? (
          <button
            onClick={handleConnectWallet}
            className="bg-white hover:bg-green-500 text-black text-sm font-semibold px-4 py-1 rounded-xl"
          >
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={handleSwap}
            className="bg-green-500 hover:bg-white text-black text-sm font-semibold px-4 py-1 rounded-xl"
          >
            Swap
          </button>
        )}
      </div>

      {/* To Section */}
      <div className="flex-col mx-auto mb-4">
        <div className="bg-gradient-to-b from-[#0A4A00] to-[#073000] p-4 rounded-3xl">
          <div className="w-full flex justify-between items-center px-2 mb-2">
            <h1 className="font-medium text-white/25">To</h1>
            <div className="border rounded-full bg-white px-2 py-1 flex items-center">
              <span className="text-black font-semibold">{toToken} 💹</span>
            </div>
          </div>

          <div className="flex gap-4 items-end mb-4 border-b border-b-zinc-700 pb-6">
            <h1 className="text-5xl font-bold">{swapAmount.toFixed(2)}</h1>
            <p className="font-medium text-xl text-zinc-500">
              ~${(swapAmount * priceInUSD).toFixed(2)}
            </p>
          </div>

          <div className="text-white/60 flex justify-between w-full items-center mb-4">
            <span>
              Est Fees: {estimatedFees} {fromToken}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapYen;
