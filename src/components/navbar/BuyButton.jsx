import React from 'react';
import { WalletMultiButton } from '@tiplink/wallet-adapter-react-ui';
const BuyButton = () => {
  return (
    <button className="overflow-hidden z-[99999999] self-start ">
      <WalletMultiButton   style={{
          background: "#A9F605",
          color: "black",
          borderRadius: "1000px",
          height: "40px",
          width: "150px",
        }} />
    </button>
  );
};

export default BuyButton;