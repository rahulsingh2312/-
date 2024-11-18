import React, { useState, useEffect } from 'react';
import { CgChevronRight } from "react-icons/cg";
import { useWallet } from '@solana/wallet-adapter-react';
import { useSingleTokenSwap } from './useSingleTokenSwap';
import { WalletMultiButton } from "@tiplink/wallet-adapter-react-ui";
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
// import '@solana/wallet-adapter-react-ui/styles.css';


const SwapYen = ({ isDarkMode = true }) => {
  const connection = new Connection(
    'https://mainnet.helius-rpc.com/?api-key=1c4915ef-e7f3-4cdb-b032-1a126a058ff8',
    "confirmed"
  );
  const { connected: walletConnected, publicKey, wallet } = useWallet();
  const { executeSwap, loading, error, swapResult } = useSingleTokenSwap();
  
  const [fromToken] = useState("SOL");
  const [toToken] = useState("YEN");
  const [swapAmount, setSwapAmount] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [estimatedFees] = useState("0.00₅0");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [estimatedOutput, setEstimatedOutput] = useState(0);

  // YEN token address
  const YEN_TOKEN_ADDRESS = "8HfFvgutvKBjdbTqm8h6qZ2VSJ3TxwrZxHT3m34Cpump";

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (wallet?.publicKey) {
          const balance = await connection.getBalance(wallet.publicKey);
          const solBalance = balance / LAMPORTS_PER_SOL;
          setAvailableBalance(solBalance);
        }
      } catch (err) {
        console.error('Error fetching balance:', err);
        setAvailableBalance(0);
      }
    };

    if (walletConnected) {
      fetchBalance();
    } else {
      setAvailableBalance(0);
    }
  }, [walletConnected, wallet?.publicKey, connection]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://api.jup.ag/price/v2?ids=${YEN_TOKEN_ADDRESS}&vsToken=So11111111111111111111111111111111111111112`);
        const data = await response.json();
        const price = parseFloat(data.data[YEN_TOKEN_ADDRESS].price);
        setTokenPrice(price);
      } catch (err) {
        console.error('Error fetching price:', err);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update price every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Calculate estimated output based on current price
    if (tokenPrice && swapAmount) {
      const output = swapAmount / tokenPrice;
      setEstimatedOutput(output);
    } else {
      setEstimatedOutput(0);
    }
  }, [swapAmount, tokenPrice]);


  const handleSwap = async () => {
    if (!walletConnected) {
      alert('Please connect your wallet.');
    }

    if (swapAmount <= 0) {
      alert("how to swap 0 SOL? actually why to swap 0 SOL?");
      return;
    }



    try {
      await executeSwap(swapAmount);
      if (swapResult?.status === 'success') {
        setSwapAmount(0);
        alert('Swap successful!');
      }
    } catch (err) {
      console.error('Swap error:', err);
      alert(`Swap failed: ${err.message}`);
    }
  };

  return (
    <div id="buy" className={`flex-col md:my-32 mx-auto my-12 w-fit ${isDarkMode ? 'text-white' : 'text-black'}`}>
      {/* From Section */}
      <div className={`p-4 rounded-3xl min-w-[543px] max-sm:min-w-[310px] ${
        isDarkMode ? 'bg-[#232323]' : 'bg-gray-100'
      }`}>
        <div className="w-full flex justify-between items-center px-2 mb-2">
          <h1 className={`font-medium ${isDarkMode ? 'text-white/25' : 'text-black/50'}`}>
            Swap from
          </h1>
          <div className={`border rounded-full px-2 py-1 flex items-center ${
            isDarkMode ? 'border-gray-600' : 'border-gray-300'
          }`}>
            <span className='mx-1'>{fromToken} </span> <img className='w-4 mx-1' src='/solja.png'></img><CgChevronRight />
          </div>
        </div>

        <div className="flex gap-4 items-end mb-4 border-b border-b-zinc-700 pb-6">
          <input
            type="number"
            value={swapAmount}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (!isNaN(value)) {
                setSwapAmount(Number(value.toFixed(9)));
              } else {
                setSwapAmount(0);
              }
            }}
            className={`bg-transparent text-5xl font-bold w-full focus:outline-none ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
            placeholder="0.00"
            min="0"
            step="0.1"
            disabled={loading}
          />
        </div>

        <div className={`flex justify-between w-full items-center mb-4 ${
          isDarkMode ? 'text-white/60' : 'text-black/60'
        }`}>
          <span className='flex'>
              Est Fees: {estimatedFees} {fromToken} , cause using <img className='mx-2 w-6' src='https://jup.ag/svg/jupiter-logo.svg' />
            </span>
          {/* <div>
            <span className="font-medium">
              {availableBalance.toFixed(4)} {fromToken}
            </span>{" "}
            available
          </div> */}
          {/* <button
            onClick={handleMaxClick}
            className="px-4 cursor-pointer py-1 bg-green-500/25 text-green-500 rounded-full"
            disabled={loading || availableBalance <= 0}
          >
            MAX
          </button> */}
        </div>
      </div>

      {/* Swap Button */}
      {!walletConnected ? (
        <div className="w-full flex justify-center items-center mt-4">
          <WalletMultiButton  style={{
              background: "#A9F605",
              color: "black",
              borderRadius: "180px",
            }} className={`w-full py-3 rounded-lg font-medium transition-colors ${
            isDarkMode 
              ? 'text-white bg-custom-green hover:bg-green-700' 
              : 'text-white border bg-custom-green hover:bg-green-600'
          }`} />
        </div>
      ) : (
        <div  className='flex justify-center items-center'>
        <button
        style={{
          background: "#A9F605",
          color: "black",
          borderRadius: "1000px",
        }}
          onClick={handleSwap} 
          disabled={loading }
          className={`w-[150px] flex justify-center items-center my-8 py-3 rounded-lg font-medium transition-colors ${
            isDarkMode ? 'text-white' : 'text-white border'
          } bg-custom-green hover:bg-green-700
            ${loading  ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}
          `}
        >
          {loading ? 'Buying...' : 'Buy Now'}
        </button>
        </div>
      )}

      {/* To Section */}
      <div className="flex-col mx-auto mt-4">
        <div className={`p-4 rounded-3xl ${
          isDarkMode 
            ? 'bg-gradient-to-b from-[#0A4A00] to-[#073000]' 
            : 'bg-gradient-to-b from-green-100 to-green-200'
        }`}>
          <div className="w-full flex justify-between items-center px-2 mb-2">
            <h1 className={`font-medium ${isDarkMode ? 'text-white/25' : 'text-black/50'}`}>
              To
            </h1>
            <div className="border rounded-full bg-white px-2 py-1 flex items-center">
              <span className="text-black font-semibold mx-1">{toToken} 💹</span>
            </div>
          </div>

          <div className="flex gap-4 items-end mb-4 border-b border-b-zinc-700 pb-6">
            <h1 className={`text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {estimatedOutput.toLocaleString(undefined, { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </h1>
          </div>

          <div className={`flex justify-between w-full items-center mb-4 ${
            isDarkMode ? 'text-white/60' : 'text-black/60'
          }`}>
            
            <span>
              Rate: 1 SOL = {(1 / tokenPrice).toLocaleString()} {toToken}
            </span>
          </div>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm mt-2 text-center">
            {error}
          </div>
        )}
        
        {swapResult?.status === 'success' && (
          <div className="text-green-500 text-sm mt-2 text-center">
            Swap successful! 
            <a 
              href={`https://solscan.io/tx/${swapResult.signature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-1"
            >
              View transaction
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapYen;