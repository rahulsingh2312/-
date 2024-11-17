
import TokenIcon from './TokenIcon.jsx';
import BuyButton from './BuyButton';


const Navbar = () => {
  return (
    <section className="flex mx-auto justify-between overflow-hidden flex-wrap gap-10 px-5 py-3 border border-solid bg-zinc-600 bg-opacity-20 border-white border-opacity-10 max-w-[939px] rounded-[31px]">
      <div className="flex gap-1.5 items-center my-auto text-base text-white whitespace-nowrap">
        <span className="self-stretch my-auto" aria-hidden="true">💹</span>
        <span className="barrio-regular self-stretch my-auto">$YEN</span>
      </div>
      <div className="flex gap-3.5">
        <div className="flex gap-2.5 items-center">
          <TokenIcon src="/t2.png" />
          <TokenIcon src="/x2.png" />
        </div>
        <BuyButton />
      </div>
    </section>
  );
};

export default Navbar;