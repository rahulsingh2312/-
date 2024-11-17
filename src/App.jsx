import { useState } from "react";

import SwapYen from "./components/swapYen";
import Footer from "./components/Footer";
import RainbowMountain from "./components/rainbowmountain";
import Matrix from "./components/matrix";
import WallOfMeme from "./components/wallofmeme";
import ActualFooter from "./components/ActualFooter";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen">
      <RainbowMountain />
      <Matrix />
      <SwapYen />
      <WallOfMeme />
      <Footer />
      <ActualFooter />
    </div>
  );
}

export default App;
