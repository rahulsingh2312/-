import TokenIcon from "./TokenIcon.jsx";
import BuyButton from "./BuyButton";
import { WalletMultiButton } from "@tiplink/wallet-adapter-react-ui";
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import "@solana/wallet-adapter-react-ui/styles.css";

const Navbar = () => {
  return (
    <section className="flex mx-auto justify-between overflow-hidden flex-wrap gap-5 md:gap-10 px-3 md:px-5 py-2 md:py-3 border border-solid bg-zinc-600 bg-opacity-20 border-white border-opacity-10 max-w-[939px] lg:ounded-[31px] md:rounded-[31px] rounded-[20px]   backdrop-blur-md">
      <div className="flex gap-1 md:gap-1.5 items-center my-auto text-sm md:text-base text-white whitespace-nowrap">
        <span
          className="self-stretch my-auto text-sm md:text-base"
          aria-hidden="true"
        >
          <img
            className="md:w-5 w-4 mx-2"
            src="/yenemoji.webp"
            alt="Yen emoji"
          />
        </span>
        <span className="barrio-regular self-stretch my-auto text-sm md:text-base">
          $YEN
        </span>
      </div>
      <div className="flex gap-2 md:gap-3.5">
        <div className="flex gap-1.5 md:gap-2.5 items-center">
          
        <a target="_blank" href="https://jup.ag/swap/SOL-8HfFvgutvKBjdbTqm8h6qZ2VSJ3TxwrZxHT3m34Cpump">
            <TokenIcon src="https://jup.ag/svg/jupiter-logo.svg" />
          </a>
          <a target="_blank" href="https://t.me/YENonSol">
            <TokenIcon src="/t2.webp" />
          </a>
          <a
            target="_blank"
            href="https://x.com/i/communities/1854412179182645683"
          >
            <TokenIcon src="/x2.webp" />
          </a>
        </div>
        {/* <div className='z-[999999991000] hidden md:block'>
       <WalletMultiButton  className='' style={{
          background: "#A9F605",
          color: "black",
          borderRadius: "1000px",
          height: "40px",
        
        }} />
        </div>
        <div className='z-[999999991000] md:hidden block'>
       <WalletMultiButton  className='' style={{
          background: "#A9F605",
          color: "black",
          borderRadius: "1000px",
          height: "40px",
         width:"80px"
        }} />
        </div> */}

        <BuyButton />
      </div>
    </section>
  );
};

export default Navbar;
