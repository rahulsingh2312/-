import { useState } from "react";

import SwapYen from "./components/swapYen";
import Footer from "./components/Footer";
import RainbowMountain from "./components/rainbowmountain";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen">
      <RainbowMountain />
      <SwapYen />
      <Footer />
    </div>
  );
}

export default App;
