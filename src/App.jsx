
import SwapYen from "./components/swapYen";
import Footer from "./components/Footer";
import RainbowMountain from "./components/rainbowmountain";
import Matrix from "./components/matrix";
import WallOfMeme from "./components/wallofmeme";
import ActualFooter from "./components/ActualFooter";
import Navbar from "./components/navbar";
import "./App.css";
import NFTMinter from "./components/pfpgenerator/page";

function App() {

  return (
    <div className="h-screen">
      <RainbowMountain />
      <Matrix />
      <SwapYen />
      <NFTMinter />
      <WallOfMeme />
     {/* Community Cult Badge */}
<div className="px-6 my-10 py-1 text-xl barrio-regular rounded-full border border-gray-500 mx-auto text-center z-10 bg-white/20 backdrop-blur-sm w-fit flex items-center gap-2">
  <span className="line-through">Community</span> Cult of
  <img
    className="md:w-5 w-4"
    src="/yenemoji.webp"
    alt="Yen emoji"
  />
</div>

      {/* Embed Dexscreener in a proper way */}
      <div

      className="flex justify-center items-center"
        id="dexscreener-embed"
        style={{
          position: "relative",
          width: "90%",
          margin: "auto",
         
          // paddingBottom: "125%",
        }}
      >
        <iframe
          src="https://dexscreener.com/solana/6jua8dYfLMhyfjnGYXd2YjJipQJLnriboXneCti7CHDX?embed=1&loadChartSettings=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
          style={{
            // position: "absolute",
            width: "100vw",
            height: "100vh",
           justifyContent: "center",
           alignItems: "center",
           display: "flex",
          }}
          title="Dexscreener Embed"
        />
      </div>

      <Footer />
      <ActualFooter />
    </div>
  );
}

export default App;
