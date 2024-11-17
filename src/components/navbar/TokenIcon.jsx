import React from 'react';

function TokenIcon({ src }) {
  return (
    <img 
      loading="lazy" 
      src={src} 
      className="object-contain shrink-0 self-stretch my-auto aspect-square rounded-[31px] shadow-[0px_4px_0px_rgba(255,255,255,1)] w-[30px]" 
      alt="Token icon" 
    />
  );
}

export default TokenIcon;