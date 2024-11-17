import { StrictMode, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Navbar from './components/navbar/index.jsx';
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter";
import { WalletModalProvider, TipLinkWalletAutoConnectV2, WalletMultiButton } from '@tiplink/wallet-adapter-react-ui';

// import '@solana/wallet-adapter-react-ui/styles.css';
const wallets = [
  new TipLinkWalletAdapter({
    title: "Emoji Buy",
    clientId: "f7d3033a-a221-42e2-b8cb-0b73c1bc3c27",
    theme: "light",
    hideDraggableWidget: false
  }),
];
function Root() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      // Add your wallet adapters here
    ],
    [network]
  );

  return (
    <StrictMode>
 <WalletProvider wallets={wallets} autoConnect>
 {typeof window !== 'undefined' && (
      <TipLinkWalletAutoConnectV2 isReady query={new URLSearchParams(window.location.search)}>
        <WalletModalProvider>
         
            <div className="min-h-screen flex flex-col">
              <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
                <Navbar />
              </div>
              <div className="mt-24 flex-grow">
                <App />
               
              </div>
            </div>
            <WalletMultiButton />
          </WalletModalProvider>
          </TipLinkWalletAutoConnectV2>
    )}
        </WalletProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />);