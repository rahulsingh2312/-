
import TokenIcon from './TokenIcon.jsx';
import BuyButton from './BuyButton';

function Navbar() {
  return (
    <section className="flex mx-auto justify-between my-4 overflow-hidden flex-wrap gap-10 px-5 py-3 border border-solid bg-zinc-600 bg-opacity-20 border-white border-opacity-10 max-w-[939px] rounded-[31px]">
      <div className="flex gap-1.5 items-center my-auto text-base text-white whitespace-nowrap">
        <span className="self-stretch my-auto" aria-hidden="true">💹</span>
        <span className="barrio-regular self-stretch my-auto">$YEN</span>
      </div>
      <div className="flex gap-3.5">
        <div className="flex gap-2.5 items-center">
        {/* <img src class="border border-white shadow-[0_4px_0_0_#FFF]"></img> */}

          <TokenIcon src="/t2.png" />
          <TokenIcon src="/x2.png" />
        </div>
        <BuyButton />
      </div>
    </section>
  );
}

export default Navbar;