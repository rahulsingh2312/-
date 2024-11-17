const TokenIcon = ({ src }) => {
  return (
    <img 
      loading="lazy" 
      src={src} 
      className="object-contain shrink-0 self-stretch my-auto aspect-square rounded-[20px] md:rounded-[31px] shadow-[0px_2px_0px_rgba(255,255,255,1)] md:shadow-[0px_4px_0px_rgba(255,255,255,1)] w-[24px] md:w-[30px]" 
      alt="Token icon" 
    />
  );
};

export default TokenIcon;
