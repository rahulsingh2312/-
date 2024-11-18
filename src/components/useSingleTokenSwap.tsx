import React, { useState } from 'react';
import { 
  Connection, 
  PublicKey,
  SystemProgram, 
  TransactionMessage, 
  VersionedTransaction,
  SendTransactionError,
  Blockhash,
  Context
} from '@solana/web3.js';
import { createJupiterApiClient, QuoteResponse } from "@jup-ag/api";
import { useWallet } from '@solana/wallet-adapter-react';
import { Buffer } from 'buffer';

const SOL_MINT = 'So11111111111111111111111111111111111111112';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms
const CONFIRMATION_TIMEOUT = 60000; // 60 seconds

const connection = new Connection(
  import.meta.env.VITE_RPC_URL,
  "confirmed"
);
const jupiterQuoteApi = createJupiterApiClient();

interface SwapResult {
  signature: string;
  status: 'success' | 'error';
  error?: string;
}

interface BlockhashWithExpiryBlockHeight {
  blockhash: Blockhash;
  lastValidBlockHeight: number;
}

export const useSingleTokenSwap = () => {
  const { publicKey, signAllTransactions } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [swapResult, setSwapResult] = useState<SwapResult | null>(null);

  const getSwapQuote = async (amountInSol: number) => {
    const tokenAddress = "8HfFvgutvKBjdbTqm8h6qZ2VSJ3TxwrZxHT3m34Cpump";
    try {
      if (!PublicKey.isOnCurve(tokenAddress)) {
        throw new Error('Invalid token address');
      }

      const amountInLamports = Math.floor(amountInSol * 1000000000);
      const quoteParams = {
        inputMint: SOL_MINT,
        outputMint: tokenAddress,
        amount: amountInLamports,
        slippageBps: 50, // 0.5% slippage tolerance
      };

      const quote = await jupiterQuoteApi.quoteGet(quoteParams);
      if (!quote) {
        throw new Error('Failed to get valid quote data');
      }

      return quote;
    } catch (err) {
      console.error('Quote fetch error:', err);
      throw new Error('Failed to get swap quote');
    }
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const getLatestBlockhashWithRetry = async (): Promise<BlockhashWithExpiryBlockHeight> => {
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        const latestBlockhash = await connection.getLatestBlockhash('finalized');
        const currentBlockHeight = await connection.getBlockHeight('finalized');
        return {
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: currentBlockHeight + 150 // ~1 minute validity
        };
      } catch (err) {
        if (i === MAX_RETRIES - 1) throw err;
        await sleep(RETRY_DELAY);
      }
    }
    throw new Error('Failed to get latest blockhash');
  };

  const confirmTransaction = async (
    signature: string, 
    blockhashInfo: BlockhashWithExpiryBlockHeight
  ): Promise<boolean> => {
    const startTime = Date.now();
    
    while (Date.now() - startTime < CONFIRMATION_TIMEOUT) {
      try {
        const confirmation = await connection.confirmTransaction({
          signature,
          blockhash: blockhashInfo.blockhash,
          lastValidBlockHeight: blockhashInfo.lastValidBlockHeight
        }, 'confirmed');

        if (confirmation.value.err) {
          console.error('Transaction error:', confirmation.value.err);
          return false;
        }

        // Verify transaction success
        const txResponse = await connection.getTransaction(signature, {
          maxSupportedTransactionVersion: 0
        });

        if (!txResponse || txResponse.meta?.err) {
          console.error('Transaction verification failed:', txResponse?.meta?.err);
          return false;
        }

        return true;
      } catch (err) {
        if (err.toString().includes('BlockheightExceeded')) {
          return false;
        }
        
        // For other errors, wait and retry
        await sleep(RETRY_DELAY);
      }
    }

    throw new Error('Transaction confirmation timeout');
  };

  const executeSwap = async (amountInSol: number): Promise<SwapResult> => {
    if (!publicKey || !signAllTransactions) {
      throw new Error('Wallet not connected');
    }

    setLoading(true);
    setError(null);
    setSwapResult(null);

    try {
      // Get fresh blockhash before starting
      const blockhashInfo = await getLatestBlockhashWithRetry();
      
      // Get swap quote with retries
      const quote = await getSwapQuote(amountInSol);
      console.log('Received quote:', quote);

      // Get swap transaction
      const swapResponse = await jupiterQuoteApi.swapPost({
        swapRequest: {
          quoteResponse: quote,
          userPublicKey: publicKey.toString(),
          dynamicComputeUnitLimit: true,
          prioritizationFeeLamports: 'auto',
        },
      });

      if (!swapResponse?.swapTransaction) {
        throw new Error('Failed to retrieve swap transaction data');
      }

      // Deserialize and process transaction
      const swapTransactionBuf = Buffer.from(swapResponse.swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      // Sign transaction
      const [signedTx] = await signAllTransactions([transaction]);

      // Send transaction with retries
      let signature: string | undefined;
      for (let i = 0; i < MAX_RETRIES; i++) {
        try {
          signature = await connection.sendRawTransaction(signedTx.serialize(), {
            skipPreflight: false,
            maxRetries: 2,
            preflightCommitment: 'confirmed'
          });
          break;
        } catch (err) {
          if (i === MAX_RETRIES - 1) throw err;
          await sleep(RETRY_DELAY);
        }
      }

      if (!signature) {
        throw new Error('Failed to send transaction');
      }

      console.log('Transaction sent with signature:', signature);

      // Confirm transaction
      const confirmed = await confirmTransaction(signature, blockhashInfo);

      const result: SwapResult = {
        signature,
        status: confirmed ? 'success' : 'error',
        error: confirmed ? undefined : 'Transaction failed to confirm'
      };

      setSwapResult(result);

      if (!confirmed) {
        throw new Error('Transaction failed to confirm');
      }

      return result;

    } catch (err) {
      console.error('Swap error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Swap failed';
      setError(errorMessage);
      
      const failedResult: SwapResult = {
        signature: '',
        status: 'error',
        error: errorMessage
      };
      
      setSwapResult(failedResult);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    executeSwap,
    loading,
    error,
    swapResult,
  };
};