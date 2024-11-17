import React from "react";

function MemeImage({ src, alt, className }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`object-contain self-stretch my-auto ${className}`}
    />
  );
}

export default MemeImage;